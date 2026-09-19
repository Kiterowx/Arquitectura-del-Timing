# Algoritmos y automatización {#how-the-automation-works}

Este apartado describe [Chrono Suite 1.5.3](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Macros/kite.ChronoSuite.lua) y [kite.Timing 1.4.3](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Modules/kite/Timing.lua). La detección estima dónde hay voz; el post-timing modifica cuánto permanece el subtítulo en pantalla. Sus resultados se revisan por separado.

## El intervalo de partida {#start-with-an-approximately-placed-cue}

El inicio `s` y el final `e` existentes delimitan dónde puede buscar el detector. Primero hay que situar cada evento sobre su propio diálogo. Una ventana que contiene a otro hablante puede producir bordes convincentes para la frase equivocada.

| Método | Zona de búsqueda | Consecuencia |
| --- | --- | --- |
| Lazy | El intervalo actual, ampliado con **Buscar ±**; por defecto, la ampliación es cero. | Ampliarlo puede recuperar un ataque perdido, pero también incluir otra intervención. |
| Busy | El intervalo actual; los bordes detectados quedan limitados a él. | Aumentar la búsqueda de Lazy no amplía la ventana de Busy. |
| Legacy | Depende del método elegido en su ventana. | Comprueba si puede ampliar el intervalo o solo recortarlo. |

Por ejemplo, si un evento empieza en 1200 ms y su primera consonante comienza en 1150 ms, Busy no puede recuperar esos 50 ms. Hay que adelantar el inicio original antes de repetir la detección. Lazy con 100 ms de búsqueda adicional podría incluir esa consonante, siempre que supere el umbral de amplitud y la limpieza posterior.

```text
evento situado sobre su diálogo + señales
    → intervalo estimado de voz
    → márgenes, snap y cadenas, si están activados
    → tiempos visibles y marcas de revisión
```

## Lazy: amplitud y umbral {#lazy-amplitude-and-a-threshold}

Lazy lee el primer nivel de picos del JSON y toma el mayor valor absoluto de cada pareja mínimo/máximo. Una media móvil suaviza esa envolvente de amplitud durante 10 ms por defecto. El generador RMS mide otra magnitud.

Con Otsu activado, Lazy transforma los valores suavizados mediante `log(1 + amplitud)`, acota el histograma con los percentiles 1 y 99 y usa 96 divisiones. El umbral elegido maximiza la separación entre dos clases:

```text
θ* = argmaxθ ω0(θ) · ω1(θ) · (μ0(θ) − μ1(θ))²
```

`ω` es la proporción de muestras de cada clase y `μ`, su media. Son clases de amplitud: un efecto fuerte puede caer en la clase activa igual que una voz. Si se desactiva Otsu, el código actual usa una interpolación fija entre los percentiles 5 y 95 de la amplitud suavizada:

```text
θ = P5 + 0,12 · (P95 − P5)
actividad[n] = amplitud_suavizada[n] ≥ θ
```

La máscara resultante se procesa en este orden:

1. Unir huecos internos de hasta 60 ms por defecto.
2. Quitar las islas activas que aún duren menos de 60 ms por defecto.
3. Si está activado el recorte de bordes, descartar los componentes pequeños y aislados que cumplan sus condiciones cerca de los extremos originales. Se valoran su posición, su masa y su separación de la actividad principal.
4. Tomar el primer inicio y el último final de los componentes restantes. Las pausas internas quedan dentro del intervalo.

Una búsqueda más amplia puede, por tanto, reunir dos intervenciones en un resultado. Una limpieza más agresiva puede borrar una consonante débil o una reacción breve. Contrasta esos sonidos con la mezcla original si la pista vocal o el umbral los hacen desaparecer.

## Busy: voto ponderado por intervalos {#busy-a-weighted-interval-vote}

Busy convierte cada log de silencios en sus intervalos complementarios de actividad y los combina con las regiones VAD y, cuando puede utilizarla, una envolvente. Cada fuente aporta un peso:

| Fuente | Peso |
| --- | ---: |
| VAD | 1,00 |
| Silencio −30 dB | 0,90 |
| Silencio −40 dB | 0,85 |
| Silencio −50 dB | 0,60 |
| Envolvente | 1,00 |

El umbral inicial es la mitad de la suma de los pesos participantes:

```text
voto(t) = Σ_i peso_i · indicador_de_actividad_i(t)
activo(t) = voto(t) ≥ 0,50 · Σ_i peso_i
```

Si participan las cinco fuentes, el total es 4,35 y el umbral, 2,175. Los tres silencios suman 2,35 cuando todos indican actividad, de modo que pueden superar el umbral aunque el VAD esté inactivo. Las mediciones proceden del mismo audio y pueden compartir restos de música o ruido. El voto no expresa una probabilidad de habla.

La envolvente participa cuando hay suficientes muestras y variación. Su umbral se sitúa al 35 % del recorrido entre referencias próximas a los percentiles 10 y 90. Si hay un JSON de onda cargado, su amplitud suavizada sustituye al TSV de RMS. Las unidades son distintas y el código usa sus valores directamente; cambiar de entrada puede cambiar el resultado.

### De las regiones activas a los bordes de voz {#busy-boundaries}

Busy filtra primero los tramos inferiores a 50 ms; si eso elimina todos los candidatos, conserva los tramos originales. Une huecos de hasta 320 ms y elige un tramo de anclaje mediante:

```text
puntuación = duración del solape + 0,2 · duración del tramo
```

Los candidatos ya están recortados al evento original. Su solape equivale a su duración: este paso elige el tramo unido más largo. Después puede incorporar tramos contiguos si la separación no supera 900 ms y cada tramo añadido dura al menos 120 ms. Una ventana original larga puede acabar reuniendo frases distintas.

Los extremos se refinan con los silencios, los cruces de umbral de la envolvente y los eventos de flux cercanos. VADFlux genera **solo ataques**: no aporta finales de flux. El espectro TSV no es una entrada de Busy. En una pasada completa, un final que alcance el límite original también puede pasar a un keyframe situado en los últimos 150 ms de esa ventana.

Si el primer intento no produce un intervalo utilizable, Chrono repite con una fracción de voto de 0,38, huecos de hasta 480 ms y límites más flexibles de duración y pausa. Una coincidencia débil, por sí sola, no activa ese segundo intento. Alcanzar el extremo de la búsqueda o encontrar discrepancias entre las fuentes puede generar una marca débil; escucha ahí si falta voz o si se ha seguido a otro hablante.

## Legacy y el cierre de Chrono {#legacy-and-chronos-final-pass}

Legacy adapta Lazytimer Pocket-sized en una ventana propia:

| Método Legacy | Cómo elige los bordes |
| --- | --- |
| Cluster | Puntúa y agrupa bordes de silencio cercanos dentro de la distancia de búsqueda. Valora proximidad, duración del silencio y confianza asignada a cada fuente; puede sumar VAD y flux cargados. |
| Table | Usa el primer log disponible en el orden −40, −30, −50 dB, forma grupos de actividad y recorta dentro del intervalo original. |
| LazyFusion | Combina los silencios para elegir bordes dentro del intervalo original; el flux cargado puede afinarlos. |

**Solo silencios** fuerza LazyFusion y desactiva los auxiliares VAD y flux, aunque se haya elegido otro método. Si está desmarcado, Legacy puede reutilizar los auxiliares cargados en **Archivos Busy…**. Esta ruta no usa keyframes de video ni los modos siguientes y deja marcas `[LZ …]` cuando el marcado está activado.

### La pasada final de Chrono {#chronos-final-pass}

Lazy y Busy comparten estos modos:

| Modo | Operación |
| --- | --- |
| Voz bruta | Escribe los bordes detectados sin añadir márgenes. |
| Completo + ajuste | Detecta voz y aplica márgenes, snap y cadenas. |
| Post actual | Toma los extremos existentes como bordes de voz y aplica la misma pasada final. |

Completo y Post requieren keyframes cargados en Aegisub. Sus márgenes base son 120 ms antes de la voz y 420 ms después. El snap de inicio busca primero hasta 400 ms antes del ataque; el de salida, hasta 800 ms después del final. **Corte de voz máx**, con 100 ms por defecto, también permite situar una entrada después del ataque detectado o una salida antes del final detectado. Escucha esos recortes: el algoritmo no decide si el sonido eliminado es prescindible.

Después se ajustan los eventos vecinos, dando preferencia a cortes compartidos utilizables y resolviendo los solapes de márgenes cuando es posible. Los máximos de lead-in y lead-out, 400 y 800 ms, orientan el margen disponible al encadenar. Conservar un corte original, tratar un hueco corto o intentar alcanzar la duración mínima puede producir márgenes que superen esos valores.

La duración objetivo de 500 ms se intenta alcanzar después, ampliando primero la salida cuando hay espacio. Si el evento sigue corto, se marca. La comprobación de 28 CPS también añade un aviso; no alarga el evento hasta conseguir una velocidad de lectura determinada.

La relación con los vecinos se calcula entre los eventos de diálogo incluidos por el alcance y los filtros. Los eventos exteriores a ese conjunto no limitan la pasada. Revisa el primero y el último modificados contra sus vecinos intactos, además de los solapes que permanezcan cuando los intervalos de voz se cruzan.

**Post actual** puede volver a sumar márgenes si se ejecuta sobre tiempos ya ampliados. También conserva sin ajustar un evento que tenga una marca previa `[TM-NOVOICE]`. Después de corregir el intervalo de partida, repite la detección para comprobarlo; el post-timing no recupera por sí solo esa voz.

## Estimar los márgenes de un timing heredado {#estimating-padding-in-an-existing-timing-pass}

Esta comparación se hace a mano para elegir parámetros; Auto Timing no calcula los márgenes heredados mediante la mediana o la MAD. Compara varios bordes claros `(a, b)` con su voz medida `(α, β)`:

```text
δ_in  = α − a
δ_out = b − β
MAD = mediana(|δ − mediana(δ)|)
```

En eventos sin snap, solapes ni otras excepciones, la mediana de las diferencias orienta sobre los márgenes habituales. La MAD describe su dispersión. Adelantos de 110, 120, 120, 130 y 400 ms tienen una mediana de 120 ms y una MAD de 10 ms. Revisa el caso de 400 ms: puede responder a un corte o a una entrada mal situada. Una dispersión pequeña en una escena no demuestra una pauta para todo el episodio, y una MAD de cero no convierte cada diferencia en un error.

Compara los parámetros propuestos con una selección revisada a mano. Observa qué consonantes iniciales desaparecen, qué sonidos ajenos se incluyen y qué pausas pasan a formar parte de un evento. Esas diferencias permiten decidir si conviene cambiar el detector, mover la ventana inicial o revisar la segmentación.
