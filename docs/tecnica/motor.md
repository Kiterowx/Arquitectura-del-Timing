# Motor de timing

[Chrono Suite](https://github.com/Kitherow/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md)
es la suite de macros que vive dentro de Aegisub, el editor de subtítulos.
Una de sus macros, **Auto Timing**, es el motor de timing: lee las señales generadas y
mueve los bordes de las líneas hasta la voz; el texto y la segmentación quedan fuera de su
alcance. Propone un inicio y un final para cada línea seleccionada, los pule con márgenes, snaps y
cadenas, y deja marcado lo que no pudo resolver para que la persona lo confirme.

<div class="tg-steps">
<div class="st"><span class="k">01</span><span class="h">Candidatos</span><span class="d">A partir de las señales se generan varios bordes posibles para la línea.</span></div>
<div class="st"><span class="k">02</span><span class="h">Reglas duras</span><span class="d">Se descartan los que rompen una regla: duración negativa, solape, mínimos.</span></div>
<div class="st"><span class="k">03</span><span class="h">Puntuación</span><span class="d">Los que quedan se puntúan según cuánta evidencia los respalda.</span></div>
<div class="st"><span class="k">04</span><span class="h">Revisión</span><span class="d">Se aplica el mejor y se marca lo dudoso; la persona confirma o corrige.</span></div>
</div>

El procedimiento se repite línea por línea. A partir de las señales se generan varios
candidatos de borde; se descartan los que rompen una regla dura —duración negativa,
solape accidental, invasión de una vecina—; se puntúan los que quedan según cuánta
evidencia los respalda; y se aplica el mejor. El motor parte de un timing ya cercano a la
voz y lo afina. La calidad del resultado depende de que las señales sean buenas y de que
el material de partida ya esté pegado a la voz a grandes rasgos.

## Qué vive en Chrono y qué vive en el módulo

Chrono Suite contiene la ventana de Auto Timing, los modos de alcance, la selección de
estilos, la lectura de keyframes, las marcas de revisión, el post-timing y dos rutas
directas: Lazy y Legacy. Es la parte que modifica las líneas del subtítulo.

El módulo de cronometraje contiene Busy. Su trabajo es leer varias señales, compararlas y
devolver candidatos con puntuación. Chrono recibe esos candidatos y aplica el mismo cierre
visible que usa en el resto de rutas: márgenes, snap, cadena, límites y marcas.

Lazytimer Pocket-sized corresponde a la familia histórica de Legacy. En Chrono, Legacy queda como una
adaptación integrada de ese método por silencios, separada de Lazy y separada de Busy.

## Tres métodos y lo que lee cada uno

Auto Timing detecta la voz de tres maneras. La diferencia entre ellas está en qué
archivos lee cada una.

**Lazy** lee un solo archivo: la onda comprimida del episodio, el `.waveform.json`.
Recorre sus picos, encuentra dónde hay voz y trabaja con eso. Funciona sin ningún módulo
adicional, y es la opción directa para diálogo limpio. La onda se guarda en memoria
durante la sesión; al regenerarla, una opción de recarga obliga a releerla.

**Busy** lee varias señales desde su propia ventana: silencios a tres umbrales, detección
de voz, flux, envelope y, si se carga, la onda comprimida como apoyo. La decisión sale del
módulo complementario, que pondera coincidencias y contradicciones entre señales. Busy
conviene en escenas con música, capas o voz irregular, y queda separado de la familia
Lazytimer Pocket-sized.

**Legacy** lee solo los silencios. Es la adaptación integrada de la lógica Lazytimer Pocket-sized:
ajusta cada borde al grupo de silencio más cercano, sin mirar los keyframes del video, y
marca sus resultados con etiquetas `[LZ ...]`. Es una primera aproximación rápida cuando la
única señal disponible son las pausas.

## Hasta dónde llega cada pasada

Los tres métodos comparten tres modos, que fijan cuánto entrega el motor y cuánto conserva
de lo que ya había.

**Completo y ajuste** hace la pasada entera: detecta la voz, lleva los bordes hasta ella y
luego aplica los márgenes de lectura, el encadenado entre líneas y el ajuste a los
keyframes del video. Es el modo para líneas sin un timing fiable.

**Voz bruta** se detiene en el primer paso: lleva cada línea al inicio y al final de la voz
detectada, sin márgenes ni keyframes. Entrega el intervalo desnudo de voz, el punto de
partida que describe [Raw timing](../fundamentos/raw-timing.md), para aplicar el
post-timing a mano.

**Post actual** conserva los tiempos que ya tiene la línea y solo ejecuta la pasada final
de márgenes, encadenado y keyframes. Es el modo para un timing ya pegado a la voz que
requiere pulido final.

Los keyframes salen del video cargado en el editor. Completo y Post los usan para el snap;
Voz bruta trabaja sin ellos.

## Cómo aísla la voz

El método Lazy prepara la onda antes de decidir. La suaviza para que un pico aislado no cuente como
palabra, decide el corte entre voz y silencio, limpia el resultado y se queda con el tramo
de voz que rellenará la línea. Cada paso tiene un control:

- **Buscar ±** define cuánto puede mirar más allá del inicio y el final de la propia línea para hallar la voz. En cero, se queda dentro de la línea; al ampliarlo, rescata voz que cae justo fuera del intervalo actual.
- **Suavizado** fija el ancho de la ventana con que se alisa la onda. Más suavizado ignora el microdetalle; menos, lo conserva.
- **Umbral automático** elige el corte entre voz y silencio analizando la distribución de energía. Al apagarlo, el corte se fija por percentil, útil cuando el material engaña al cálculo automático.
- **Unir huecos** cierra los microsilencios dentro de una emisión, para que una palabra con una pausa interna mínima no se parta. **Quitar islas** descarta los microdestellos demasiado cortos para ser voz.
- **Recortar derrames de borde** elimina un destello tenue y separado pegado al extremo de la línea, para evitar que estire el timing hacia un sonido ajeno a la frase.

Busy llega desde el módulo con su acuerdo combinado. A partir de ahí, Chrono aplica el
mismo cierre visible que en las demás rutas: márgenes, snap, cadena, mínimos y marcas.

## De la voz al borde visible

Detectado el tramo de voz, la pasada de post-timing lo convierte en el intervalo visible.
Añade el aire de entrada y el de salida, los limita con sus topes, busca un keyframe en la
ventana de snap de cada borde, cierra los huecos cortos con la vecina dentro de la cadena
máxima, respeta una duración mínima y señala la lectura rápida.

<div class="tg-panel">
<div class="bar"><span class="dot"></span> Auto Timing — módulo de cronometraje</div>
<div class="field"><span class="lab">Aire de entrada</span><span class="val">Arranca en <code>120 ms</code> y crece hasta <code>400</code>: cuánto entra el texto antes del ataque vocal.</span></div>
<div class="field"><span class="lab">Aire de salida</span><span class="val">De <code>420</code> a <code>800 ms</code>, mayor porque la lectura termina después del habla.</span></div>
<div class="field"><span class="lab">Ventana de snap</span><span class="val">Busca keyframe hasta <code>400 ms</code> del inicio y <code>800</code> del final, con <code>100 ms</code> para entrar antes del corte.</span></div>
<div class="field"><span class="lab">Permanencia mínima</span><span class="val">Ninguna línea baja de <code>500 ms</code> en pantalla.</span></div>
<div class="field"><span class="lab">Límite de lectura</span><span class="val">Por encima de <code>28 CPS</code> la línea queda señalada para revisar.</span></div>
</div>

Esos valores de partida son más holgados que los rangos de revisión de los
[criterios cuantitativos](../fundamentos/criterios.md): el suelo de 500 ms queda por debajo
de la zona de destello, y la señal de 28 CPS por encima de la zona de comodidad. La holgura
es deliberada: el motor necesita espacio para explorar candidatos y encontrar un buen
keyframe, y la revisión final aprieta esos valores según la escena. Una ventana de snap amplia permite que el motor
considere un corte a esa distancia y lo descarte si no mejora el cierre.

## Lo que el motor deja marcado

Cuando una línea no admite una decisión limpia, el motor la marca en el campo `Effect` con
una etiqueta `[TM-...]` que nombra el problema —sin voz detectada, voz demasiado débil,
solape con otra línea, duración demasiado corta, lectura demasiado rápida— y sigue. Esas
marcas forman una lista de revisión, y se borran solas en la siguiente ejecución, de modo
que cada pasada refleja el estado actual sin arrastrar avisos viejos. Al terminar, un
resumen indica cuántas líneas se cronometraron, cuántos snaps se hicieron, cuántas uniones
y cuántas marcas quedan para revisión.

## Acotar el alcance

El filtro de estilo decide sobre qué líneas actúa la pasada: todas, las del estilo por
defecto, el par de estilos principal y alterno, o un estilo exacto, con una casilla para un
segundo estilo. Así se cronometra el diálogo sin tocar carteles, canciones o estilos
especiales, que se timean por otras reglas y quedan intactos aunque caigan dentro de la
selección.
