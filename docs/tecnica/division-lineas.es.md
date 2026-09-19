# Dividir, renglonar y unir eventos {#split-rebreak-and-join-cues}

La redacción se resuelve antes del timing fino. Dos enunciados con ritmos distintos pueden necesitar eventos separados; una frase ancha puede resolverse con otro salto de renglón. Chrono Suite ofrece operaciones distintas para cada caso. El criterio se explica en [segmentación](../fundamentos/segmentacion.md).

## Comprobar el formato antes y después {#check-formatting-before-and-after}

Trabaja sobre una copia. **Extract Tags** mueve los bloques de override iniciales al campo **Effect**; **Reinsert Tags** vuelve a anteponerlos al texto. Las etiquetas intercaladas dentro del diálogo permanecen donde estaban.

Después de dividir o unir, comprueba cursivas, colores y etiquetas ligadas a palabras concretas. Los tiempos relativos de `\t`, `\move`, `\fad` o karaoke necesitan revisión propia si cambia el inicio del evento.

## Dividir en eventos temporizados {#split-into-timed-events}

| Herramienta | Dónde divide | Qué revisar después |
| --- | --- | --- |
| Split by Sentence | Signos de cierre de oración, incluidos los puntos suspensivos. | Cada unidad propuesta sigue su propia voz. |
| Split by Comma | Los mismos signos, además de comas, dos puntos y punto y coma. | La relación entre cláusulas sigue clara y ambas tienen tiempo de lectura. |
| Divide by `\N` | Saltos de renglón existentes. | Los nuevos eventos se entienden en contexto y duran lo suficiente. |

Estas herramientas reparten la duración original en proporción a los caracteres contados en cada fragmento; no localizan la pausa hablada. Las dos divisiones por puntuación también reconocen un guion rodeado de espacios. Revisa abreviaturas, pausas y separadores de diálogo antes de conservar todas las divisiones propuestas. Escucha y ajusta cada nuevo borde contra el audio.

<figure class="tg-fig">
<span class="tg-eyebrow">Revisar el resultado de cada operación</span>
<div class="tg-compare tg-video-stack">
<div class="col"><h4>Dos emisiones</h4><video src="../../../assets/ejemplos/segmentacion-dos-palabras.mp4" controls loop playsinline preload="metadata"></video><p class="note">«Por supuesto. Yo también mejoro día a día.» presenta juntas la respuesta y su explicación.</p></div>
<div class="col"><h4>Split by Sentence</h4><video src="../../../assets/ejemplos/segmentacion-dividido.mp4" controls loop playsinline preload="metadata"></video><p class="note">«Por supuesto.» aparece primero; «Yo también mejoro día a día.» sigue en otro evento.</p></div>
<div class="col"><h4>Split by Comma</h4><video src="../../../assets/ejemplos/segmentacion-por-coma.mp4" controls loop playsinline preload="metadata"></video><p class="note">«Por ahora, ya vimos las flores de las cuatro estaciones,» continúa con «así que ahora te enseñaré las leyendas relacionadas con ellas». La segunda cláusula conserva su vínculo con la primera.</p></div>
</div>
<figcaption>La primera comparación separa una respuesta de su explicación. La división por coma da tiempo propio a cada cláusula y conserva la relación entre ambas.</figcaption>
</figure>

## Cambiar el salto de renglón {#change-the-displayed-line-break}

**Smart Break** propone un salto cuando el texto renderizado supera el ancho disponible. Si cabe en un renglón, lo deja como está. **Pivot `\N`** mueve un salto existente; **Remove `\N`** elimina los saltos y compacta espacios.

Estas operaciones cambian la composición dentro de un evento y conservan sus tiempos. «Dejé las llaves / en la mesa de la cocina.» puede repartirse en dos renglones sin convertirse en dos subtítulos sucesivos. Aquí `/` representa el salto; ASS usa `\N`.

## Unir eventos fragmentados {#join-fragmented-cues}

**Join Lines** combina los eventos seleccionados desde el inicio más temprano hasta el final más tardío. Selecciona solo lo que deba quedar unido: los eventos intermedios sin seleccionar pueden permanecer dentro de ese intervalo. **Complete Sentences** une un evento incompleto con una continuación que empieza en minúscula. Los casos dudosos, como un solape o una continuación con mayúscula, reciben `[POSSIBLE-JOIN]` para revisarlos.

**Join Overlaps** une grupos superpuestos, conserva cada texto en su renglón y extiende el evento retenido a los extremos del grupo. **Join Overlap Sentences** trata el grupo como una frase continua. **Join Same Text** combina eventos contiguos con texto idéntico.

Revisa hablantes y formato después de unir. Conserva las divisiones deliberadas entre cláusulas, como la explicación de las flores: su continuación en minúscula es una división útil aunque **Complete Sentences** proponga unirla.

## Traducir antes de la segmentación definitiva {#translate-before-final-segmentation}

Traduce primero ideas completas y después divide el texto definitivo según la voz. La traducción cambia extensión, orden y puntuación; con ellos puede cambiar el punto natural de división.

**Count CPS** divide los caracteres contados de la selección entre su duración acumulada y muestra además el CPS individual más alto y su evento. La duración de cada evento pesa en ese cálculo; promediar sus CPS por igual daría otro resultado. El conteo excluye espacios y los signos que reconoce como puntuación. Usa el mismo método al compararlo con otra herramienta; los [criterios de lectura](../fundamentos/criterios.md) explican las diferencias.
