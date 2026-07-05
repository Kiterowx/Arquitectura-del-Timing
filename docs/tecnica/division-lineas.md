# División de líneas

Antes de pegar tiempos finos conviene que cada línea contenga una sola unidad de
lectura. Una línea con dos frases independientes arrastra dos ataques vocales, un
final difícil de pegar y una velocidad de lectura inflada por texto que en realidad
pertenece a dos momentos distintos. Resolver eso es un trabajo de texto, y se hace
con las utilidades de Chrono Suite antes de que el cronometraje entre en juego.

El criterio de cuándo dividir y cuándo conservar unido es el de
[Segmentación de frases](../fundamentos/segmentacion.md). Lo que sigue es cómo se
ejecuta esa decisión con la herramienta, distinguiendo tres operaciones que se
confunden con facilidad: partir una línea en varios eventos, mover el salto de
renglón dentro de un evento, y volver a unir lo que quedó fragmentado.

## Proteger el formato primero

Una línea de diálogo puede llevar etiquetas de formato —cursivas, posiciones,
colores— entremezcladas con el texto. Cualquier división que parta el texto a
ciegas corre el riesgo de cortar una etiqueta por la mitad o de repartir mal el
formato entre los fragmentos.

La utilidad **Extract Tags** evita ese riesgo: traslada los bloques de override
desde el texto al campo `Effect`, dejando el diálogo en texto limpio sobre el que
dividir sin peligro. Terminada la división, **Reinsert Tags** devuelve cada
etiqueta a su sitio. El par funciona como un paréntesis alrededor de todo el
trabajo de segmentación: se abre antes de partir y se cierra al final, sobre toda
la selección.

## Partir en eventos

Dividir en eventos crea varias líneas temporizadas a partir de una. Es lo que se
hace cuando un solo subtítulo cubre dos frases que merecen bordes propios.

**Split by Sentence** parte por límite de oración: separa allí donde una frase
cierra y otra empieza. Es la división natural para dos enunciados completos dentro
del mismo evento. **Split by Comma** parte por coma, útil cuando una pausa
sintáctica clara divide la línea en dos tramos que sostienen sentido por separado;
conviene usarla con cuidado, porque no toda coma marca una frontera de lectura, y
encadenar fragmentos que empiezan como continuación produce el efecto de párrafo
incompleto que la segmentación busca evitar. **Divide by \N** parte por los saltos
de renglón ya presentes, convirtiendo en eventos separados lo que estaba escrito
como dos renglones de uno solo.

Tras partir, la revisión es de sentido: que cada línea resultante se entienda por
sí misma, que un fragmento interrumpido conserve intención clara y que ninguna
quede tan breve que no dé tiempo a leerla.

<figure class="tg-fig">
<span class="tg-eyebrow">La división sobre líneas reales</span>
<div class="tg-compare tg-video-stack">
<div class="col">
<h4>Dos frases separables</h4>
<video src="../../assets/ejemplos/segmentacion-dos-palabras.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">Una línea que encierra dos unidades habladas se reparte para que cada ataque y cada cierre caigan sobre un borde propio.</p>
</div>
<div class="col">
<h4>Split by Sentence</h4>
<video src="../../assets/ejemplos/segmentacion-dividido.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">Parte donde una oración cierra y otra empieza: dos enunciados completos dentro de un evento pasan a dos líneas propias.</p>
</div>
<div class="col">
<h4>Split by Comma</h4>
<video src="../../assets/ejemplos/segmentacion-por-coma.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">Parte por una pausa sintáctica clara. Se usa con cuidado, porque una coma de continuación deja fragmentos con sentido incompleto.</p>
</div>
</div>
<span class="cap">Cada operación deja unidades que se sostienen solas, la condición para pegar tiempos finos sin rehacer el borde después.</span>
</figure>

## Romper en renglones

Romper en renglones reparte el texto de una sola línea en dos renglones visuales,
conservando intactos el evento y sus tiempos. Es una decisión de composición.

**Smart Break** inserta un salto en la posición óptima, y solo cuando el texto
renderizado supera el ancho disponible: si la línea cabe en un renglón, la deja en
paz. **Pivot \N** desplaza un salto ya existente hacia un punto de corte mejor.
**Remove \N** elimina los saltos y compacta los espacios, para volver a empezar el
renglonado o para dejar la línea en un solo renglón.

La distinción importa porque cada problema tiene su operación: una línea demasiado
ancha para leerse se resuelve renglonando, y dos frases con ritmos distintos se
resuelven partiendo en eventos.

## Volver a unir

La segmentación también va en sentido contrario: a veces lo correcto es fundir lo
que estaba separado.

**Join Lines** une las líneas consecutivas seleccionadas en una sola.
**Complete Sentences** automatiza el caso más común de fragmentación: une una línea
incompleta con la siguiente cuando el texto que sigue empieza en minúscula —señal
de que era continuación de la misma frase—. Los casos en que la unión es dudosa,
porque hay solape o porque el texto siguiente no empieza en minúscula, quedan marcados
con `[POSSIBLE-JOIN]` para revisarlos a mano.

Para diálogo simultáneo hay uniones específicas. **Join Overlaps** funde grupos de
líneas cuyos tiempos se solapan, extiende la conservada a los límites del grupo y
mantiene cada texto en su propio renglón. **Join Overlap Sentences** hace lo mismo
tratando el grupo como una sola frase continua. **Join Same Text** une líneas
contiguas con texto idéntico, habitual tras ciertos procesos automáticos.

## Traducir antes de segmentar

Cuando el material de origen se va a traducir, suele rendir más traducir las frases
completas primero y segmentar después, con el cronometraje a la vista. La
traducción cambia la longitud, el orden y la puntuación, y con ellos el punto
natural de corte. Una segmentación decidida sobre texto que todavía busca su forma
final se rehace dos veces; decidida sobre la frase ya estable, se decide una.

## Comprobar la carga

**Count CPS** cierra el ciclo sin salir del editor: muestra la velocidad de lectura
promedio de la selección, útil para confirmar que una división bajó la carga que la
motivó.
