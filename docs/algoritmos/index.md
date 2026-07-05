# Algoritmos y automatización

La fase técnica muestra qué hace cada herramienta. El razonamiento que hay debajo —cómo
decide— es lo que interesa a quien quiera reproducirlo, calibrarlo o llevarlo más lejos.
Conviene separar dos capas: **[Chrono Suite](https://github.com/Kitherow/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md)** coordina la pasada dentro de Aegisub, lee las
líneas seleccionadas, aplica el post-timing y marca los casos dudosos; el **módulo de
cronometraje** aporta la lógica multiseñal de Busy. Lazy y Legacy viven como rutas directas
de Chrono: Lazy usa la onda comprimida, y Legacy conserva la familia histórica de
Lazytimer Pocket-sized basada en silencios. La jerarquía de Fundamentos sigue siendo el techo: el
modelo propone un borde con evidencia, y el criterio final confirma que respeta lectura,
voz, escena y continuidad.

## El problema, formalizado

Una línea ocupa un intervalo `[s, e]` en el tiempo. Cronometrarla es elegir `s` y `e`. El
raw timing los fija sobre la voz: `s` en el primer sonido hablado, `e` en el último. Los
motores automáticos estiman ese intervalo de voz a partir de las señales del episodio, y el
post-timing lo convierte en el intervalo visible añadiendo márgenes, snap y cadena.

El flujo es una cadena de transformaciones sobre el tiempo:

```text
señales ──▶ intervalo de voz [s, e] ──▶ intervalo visible [s', e']
 (Lazy en Chrono | Busy en módulo | Legacy en Chrono)   (post-timing de Chrono)
```

Cada etapa admite un tratamiento matemático propio. La detección de voz es un problema de
clasificación por muestra —voz o silencio— seguido de la extracción de un intervalo. El
post-timing es una optimización con restricciones. Y la ingeniería inversa es un problema de
estimación: recuperar los parámetros de un método a partir de su salida.

## Dónde vive cada pieza

**Chrono Suite** contiene la interfaz de Auto Timing, el filtro de estilos, la selección de
líneas, la lectura de keyframes del video, las marcas en `Effect`, el modo Lazy, el modo
Legacy y la aplicación final de márgenes, snap y cadena. Es la capa que toca el subtítulo.

El **módulo de cronometraje** contiene Busy: la lectura conjunta de señales, la generación
de candidatos y la puntuación multiseñal. Busy pertenece al módulo actual y entrega
propuestas que Chrono convierte en bordes visibles.

**Lazytimer Pocket-sized** nombra la familia histórica del método Legacy. En Chrono, Legacy funciona
como una adaptación integrada de esa lógica por silencios. Según la versión concreta, la
copia local puede estar más nueva o más vieja que el repositorio público, pero su papel en
la guía es claro: método de compatibilidad por silencios, separado de Lazy y de Busy.

## Lazy: umbral sobre una sola señal

Lazy trabaja con la onda comprimida y nada más. De ella obtiene una envolvente de energía
`e[n]` —un valor por muestra— y decide, muestra a muestra, dónde hay voz. El método es una
tubería de cinco pasos, cada uno con un parámetro que lo gobierna.

<div class="tg-steps">
<div class="st"><span class="k">01</span><span class="h">Suavizar</span><span class="d">Media móvil sobre la envolvente, para que un pico aislado no cuente como palabra.</span></div>
<div class="st"><span class="k">02</span><span class="h">Umbral</span><span class="d">Corte automático entre voz y silencio a partir de la distribución de energía.</span></div>
<div class="st"><span class="k">03</span><span class="h">Histéresis</span><span class="d">Dos umbrales, uno para entrar y otro para salir, contra el parpadeo del corte.</span></div>
<div class="st"><span class="k">04</span><span class="h">Limpiar</span><span class="d">Unir microhuecos, descartar microislas: cierre y apertura morfológicos.</span></div>
<div class="st"><span class="k">05</span><span class="h">Recortar</span><span class="d">Quitar el derrame tenue pegado al borde, ajeno a la frase.</span></div>
</div>

El **suavizado** es una media móvil de medio ancho `w`:

```text
ê[n] = (1 / (2w+1)) · Σ_{k=−w..w} e[n+k]
```

Un `w` grande ignora el microdetalle; uno pequeño lo conserva. Sobre `ê` se elige el
**umbral** `θ`. El modo automático supone que la energía se reparte en dos modos —silencio
cerca de cero, voz por encima— y sitúa `θ` en el valle que mejor los separa, el criterio de
Otsu: el `θ` que maximiza la varianza entre las dos clases que induce.

```text
θ* = argmax_θ  ω0(θ)·ω1(θ)·( μ0(θ) − μ1(θ) )²
```

donde `ω0, ω1` son las proporciones de muestras a cada lado de `θ` y `μ0, μ1` sus medias.
Cuando el material engaña a ese cálculo —música sostenida, voz muy baja—, el umbral se fija
por percentil, `θ = P_q(ê)`, más predecible.

La **histéresis** evita que el borde parpadee alrededor de `θ`. En vez de un corte, usa dos,
`θ_hi > θ_lo`: la muestra entra en voz cuando `ê[n] ≥ θ_hi` y solo vuelve a silencio cuando
`ê[n] < θ_lo`. El estado se mantiene entre ambos, de modo que una oscilación pequeña no
genera una ristra de bordes falsos.

La **limpieza** es morfológica. Cerrar une los silencios más cortos que `g_min` —une los
microhuecos internos de una emisión—; abrir descarta los tramos de voz más cortos que
`i_min` —las islas demasiado breves para ser palabra—. El **recorte de derrame** elimina un
tramo de voz corto, tenue y separado, pegado al extremo, para evitar que estire el intervalo
hacia un sonido ajeno.

```text
entrada:  e[0..N]        envolvente de la onda
          w              medio ancho del suavizado
          g_min, i_min   hueco e isla mínimos, en muestras
salida:   [s, e]         intervalo de voz

ê      ← media_móvil(e, w)
θ_hi   ← umbral_otsu(ê);   θ_lo ← θ_hi − margen
v[n]   ← histéresis(ê, θ_hi, θ_lo)      # 1 voz, 0 silencio
v      ← cerrar(v, g_min)               # une huecos < g_min
v      ← abrir(v, i_min)                # quita islas < i_min
v      ← recortar_derrame(v)
s, e   ← primer y último n con v[n] = 1
```

El resultado es el tramo de voz que rellena la línea. Esa salida pasa después por el
post-timing común de Chrono. Busy llega desde el módulo con una decisión multiseñal, y
Chrono normaliza el borde visible.

## Busy: fusión de evidencia

Busy combina varias señales —silencios a tres umbrales, detección de voz,
flux, envelope y, si se carga, la onda comprimida como apoyo— y decide por acuerdo
ponderado. Ese acuerdo es,
formalmente, una combinación bayesiana de evidencia. La pregunta en cada muestra `n` es la
probabilidad de que haya voz dada la evidencia `x[n] = (x_1, …, x_m)` de las `m` señales.

El teorema de Bayes escribe esa probabilidad como la evidencia por la creencia previa:

```text
P(voz | x) = P(x | voz) · P(voz) / P(x)
```

Lo que decide es la razón entre voz y silencio, donde `P(x)` se cancela. Suponiendo que las
señales aportan evidencia de forma condicionalmente independiente —la hipótesis *naive
Bayes*—, la razón se vuelve una suma en escala logarítmica:

```text
ℓ(n) = log  P(voz | x[n]) / P(silencio | x[n])
     = ℓ0 + Σ_i  w_i · φ_i( x_i[n] )
```

`ℓ0` es la ventaja previa (el log de la proporción voz/silencio esperada), `φ_i` es la
evidencia local que aporta la señal `i` —positiva si apunta a voz, negativa si a silencio— y
`w_i ≥ 0` es su peso. La muestra se clasifica como voz cuando `ℓ(n) > τ`. Cada señal entra
como un sumando: añadir una señal nueva es añadir un término `w · φ`, y de ahí que el modelo
se extienda sin rehacerse.

El reparto de pesos es el criterio del método hecho número:

<div class="tg-panel">
<div class="bar"><span class="dot"></span> Fusión de evidencia — aporte por señal</div>
<div class="field"><span class="lab">Detección de voz</span><span class="val">Peso mayor: es la única que contesta «¿hay habla?» de forma directa.</span></div>
<div class="field"><span class="lab">Silencios sensibles</span><span class="val">Pesan más que los estrictos: un silencio sensible es un hueco de verdad.</span></div>
<div class="field"><span class="lab">Silencios estrictos</span><span class="val">Confirman el silencio profundo; aportan menos en la zona de duda.</span></div>
<div class="field"><span class="lab">Flux</span><span class="val">Sube la confianza en el ataque: marca el filo exacto donde entra la voz.</span></div>
<div class="field"><span class="lab">Envelope</span><span class="val">Ajusta la confianza en la cola: separa la palabra de la respiración posterior.</span></div>
</div>

Donde varias señales coinciden, `ℓ(n)` se aleja de cero y el borde es firme; donde se
contradicen, los términos se restan y el candidato pierde confianza. El flux y el envelope
pesan sobre todo en los extremos —el ataque y la cola—, que es donde el borde se juega la
precisión. La decisión de la muestra se convierte en intervalo con la misma limpieza que
Lazy, y el flux afina el instante del inicio, que la detección de voz redondea.

```text
para cada muestra n:
    ℓ ← ℓ0
    para cada señal i:  ℓ ← ℓ + w_i · φ_i(x_i[n])
    v[n] ← (ℓ > τ)
[s, e] ← extraer_intervalo(v)      # histéresis + limpieza de Lazy
s      ← afinar_con_flux(s)        # ataque exacto
```

## Del voto al borde: candidatos, restricciones y puntuación

Detectar voz muestra a muestra es solo la mitad del trabajo: el motor propone un borde
por línea y elige el mejor. Genera varios **candidatos** `c = (s, e)` alrededor del timing de partida, descarta
los que rompen una regla dura y puntúa el resto.

Las **restricciones duras** definen el conjunto factible `F`: sin ellas, ningún candidato
compite.

```text
F = { c = (s, e) :  e − s ≥ dur_min,          duración mínima
                    c no solapa a una vecina,  sin invasión
                    s, e dentro de la ventana de búsqueda }
```

Sobre `F`, una **función de puntuación** mide cuánta evidencia respalda cada candidato,
menos lo que lo contradice:

```text
S(c) = Σ_i  w_i · acuerdo_i(c)  −  λ · contradicciones(c)
c*   = argmax_{c ∈ F}  S(c)
```

`acuerdo_i(c)` mide cuánto sostiene la señal `i` los bordes de `c` —una región de voz que
empieza donde empieza `c`, un flux sobre su inicio, un silencio tras su final—; el término de
contradicción castiga la evidencia en contra, con `λ` graduando su severidad. El candidato
ganador `c*` se aplica, y si su puntuación no alcanza un mínimo, la línea queda marcada en
`Effect` para revisión en vez de forzar un borde sin respaldo. Este es el esqueleto de
Busy. Lazy y Legacy producen candidatos con menos evidencia, y comparten con Busy la
normalización final que Chrono aplica sobre el intervalo visible.

## Corregir por ingeniería inversa

Un episodio heredado a veces trae un timing coherente pero desconocido: alguien aplicó un
método —unos márgenes fijos, una política de snap— y no dejó dicho cuál. Recuperarlo permite
corregir todo el episodio con un solo criterio en vez de línea por línea. Es un problema de
estimación de parámetros a partir de la salida observada.

El modelo supone que el tiempo visible heredado nace del tiempo de voz más un margen y un
posible ajuste a la escena:

```text
a[j] = α[j] − L_in  + s_in[j]      inicio visible = inicio de voz − lead-in (± snap)
b[j] = β[j] + L_out + s_out[j]     final visible  = final de voz  + lead-out (± snap)
```

donde `(a, b)` es el intervalo heredado, `(α, β)` la voz cruda medida de nuevo, `L_in, L_out`
los márgenes del método y `s` el ajuste de snap, casi siempre cero salvo cuando el borde cayó
sobre un keyframe. La diferencia a cada lado revela el margen:

```text
δ_in[j]  = α[j] − a[j]           ≈ L_in   cuando no hubo snap
δ_out[j] = b[j] − β[j]           ≈ L_out
```

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">Recuperar el margen heredado</span>
<div class="lane">
<span class="seg aire" style="left:12%;width:14%"><i>δin</i></span>
<span class="seg voz" style="left:26%;width:40%">voz cruda</span>
<span class="seg aire" style="left:66%;width:18%"><i>δout</i></span>
</div>
<div class="scale"><span class="v" style="left:12%">inicio heredado</span><span class="v" style="left:84%">final heredado</span></div>
<span class="cap">El aire entre el <b>visible heredado</b> y la <b>voz cruda</b> a cada lado —δ<sub>in</sub>, δ<sub>out</sub>— es el margen que aplicó el método. Su valor típico, resistente a los casos de escena, lo reconstruye.</span>
</figure>

El margen del método es el valor central de esas diferencias. La **mediana** lo estima mejor
que el promedio, porque un puñado de líneas con snap, gag o canción desplazaría la media pero
no la mediana:

```text
L_in  ← mediana_j δ_in[j]
L_out ← mediana_j δ_out[j]
disp  ← 1.4826 · MAD_j δ_in[j]        dispersión robusta (≈ σ en un reparto normal)
```

<figure class="tg-fig">
<span class="tg-eyebrow">El reparto de δ<sub>out</sub> en un episodio heredado</span>
<div class="tg-hist" style="--x:50%">
<span class="mad" style="--x0:32%;--w:36%"></span>
<span class="med"></span>
<i class="out" style="--h:22%"></i>
<i style="--h:8%"></i>
<i style="--h:14%"></i>
<i style="--h:30%"></i>
<i style="--h:52%"></i>
<i style="--h:78%"></i>
<i style="--h:96%"></i>
<i style="--h:84%"></i>
<i style="--h:60%"></i>
<i style="--h:34%"></i>
<i style="--h:16%"></i>
<i style="--h:9%"></i>
<i class="out" style="--h:12%"></i>
<i class="out" style="--h:18%"></i>
</div>
<div class="tg-hist-ticks"><span class="o" style="left:4%">casos propios</span><span class="m" style="left:50%">L_out = mediana</span><span class="o" style="left:93%">snap · canción</span></div>
<span class="cap">La campana central es el método: la <b>mediana</b> lo estima y la banda <b>±k·disp</b> lo delimita. Las barras que caen fuera —un snap a un corte, una cola vocal sostenida, una canción— se revisan aparte en lugar de arrastrar la corrección general.</span>
</figure>

La estimación se confirma con al menos tres muestras independientes coherentes —una `disp`
baja indica que el patrón es real y no ruido—. Las líneas que se apartan del margen más de
`k · disp` no obedecen al método: son casos propios —un snap a un corte, una cola vocal sostenida,
una canción— y se revisan aparte en lugar de arrastrarlos a la corrección general.

```text
si |δ_in[j] − L_in| > k · disp:   marcar j como caso propio
```

La **política de snap** se detecta aparte: la fracción de bordes heredados que caen a menos
de `ε` de un keyframe. Si es alta, el método snapeaba, y la reaplicación debe reproducirlo.
Con los parámetros recuperados, cada línea se rehace desde su voz cruda —`s = α − L_in`,
`e = β + L_out`, y luego snap donde la política lo pida—, y el episodio recobra una forma
consistente.

## Extender la lógica

El modelo deja varios puntos abiertos para quien quiera empujar la automatización:

- **Pesos aprendidos.** Los `w_i` de Busy se fijan a mano por criterio. Un corpus de líneas
  ya cronometradas permite ajustarlos por regresión logística, que es exactamente el modelo
  log-lineal de la fusión: cada `w_i` se estima maximizando el acuerdo con el timing revisado.
- **Previa informada.** `ℓ0` puede dejar de ser constante y depender del contexto —densidad de
  diálogo de la escena, estilo de la línea—, aportando una previa por tramo en vez de una
  global.
- **Calibración por proyecto.** Los umbrales de Lazy y las tolerancias de la auditoría son la
  misma cifra vista dos veces. Medir su curva de aciertos y falsos positivos sobre un episodio
  representativo fija el punto de operación de cada uno.
- **Señales nuevas.** Añadir una medida —separación de locutores, un detector de risa— es
  añadir un término `w · φ` a `ℓ(n)`, sin tocar el resto de la maquinaria.
- **Modelos de borde más ricos.** La puntuación `S(c)` admite términos de escena, de lectura y
  de continuidad, acercando la decisión automática a la jerarquía completa de Fundamentos.

La familia Legacy puede consultarse en
[Lazytimer Pocket-sized](https://github.com/Kitherow/lazytimer-pocket-sized). La integración actual separa esa
ruta de compatibilidad de Lazy y del módulo Busy. Cualquier extensión mantiene el mismo
techo: el modelo amplía la evidencia y mejora la propuesta, y la decisión final —que el
borde respete la voz, la lectura, la escena y la continuidad— sigue dependiendo del
criterio final.
