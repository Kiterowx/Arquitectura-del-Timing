# Post-timing: márgenes, snap y cadenas {#post-timing-padding-snapping-and-chaining}

Con la voz bien delimitada, se añade tiempo de lectura y se revisa cómo se relaciona cada evento con la imagen y sus vecinos. El lead-in y el lead-out aportan ese tiempo. El snap lleva un borde a un corte cercano. La cadena cierra un hueco que distrae.

<figure class="tg-fig tg-strip"><span class="tg-eyebrow">De la voz al tiempo en pantalla</span><div class="lane"><span class="seg aire" style="left:8%;width:6%"><i>in</i></span><span class="seg voz" style="left:14%;width:44%">voz</span><span class="seg aire" style="left:58%;width:14%"><i>out</i></span><span class="cont" style="left:78%;width:16%">siguiente</span></div><div class="tg-keys"><b class="k-aire">márgenes</b><b class="k-voz">intervalo hablado</b><b class="k-continuidad">evento vecino</b></div><figcaption>El texto aparece antes de la voz y permanece un poco después. El evento siguiente limita hasta dónde puede extenderse esa salida.</figcaption></figure>

## Valores de partida {#starting-values}

Estos son los valores iniciales de Auto Timing. Pruébalos en una escena breve y revisa entradas, permanencias y huecos antes de ampliar la pasada al episodio. Un margen útil para un diálogo pausado puede dejar poco espacio en un intercambio rápido.

| Parámetro | Valor | Qué controla |
| --- | ---: | --- |
| Lead-in / máximo | 120 / 400 ms | Margen base de entrada / margen usado al encadenar. |
| Lead-out / máximo | 420 / 800 ms | Margen base de salida / margen usado al encadenar. |
| Ventana de keyframes de inicio / final | 400 / 800 ms | Distancia de búsqueda de cortes para cada borde. |
| Corte de voz máx | 100 ms | Tolerancia para un snap posterior al inicio de voz o anterior a su final. |
| Duración mínima objetivo | 500 ms | Duración que las restricciones vecinas pueden impedir. |
| Marca de velocidad de lectura | Más de 28 CPS | Aviso para revisar el texto y su duración. |

Los [criterios de lectura](criterios.md) usan umbrales de revisión más ceñidos. Un evento puede pasar estos valores amplios y seguir resultando apresurado.

## Recorrer la escena desde el final {#work-backward-through-the-scene}

Para ajustar a mano, conviene empezar por el último evento. Su inicio, una vez fijado, limita hasta dónde puede extenderse el anterior sin invadirlo. Así se evita rehacer una salida cada vez que se mueve su vecino.

<figure class="tg-fig tg-strip"><span class="tg-eyebrow">El siguiente inicio limita el final actual</span><div class="lane"><span class="seg voz" style="left:4%;width:24%">evento n−1</span><span class="seg aire" style="left:28%;width:10%"><i>out</i></span><i class="ord" style="left:95%">3</i></div><div class="lane"><span class="seg voz" style="left:34%;width:24%">evento n</span><span class="seg aire" style="left:58%;width:10%"><i>out</i></span><i class="ord" style="left:95%">2</i></div><div class="lane"><span class="cont" style="left:64%;width:26%">evento n+1</span><i class="ord" style="left:95%">1</i></div><figcaption>El orden va de abajo hacia arriba. Cada final se revisa contra un inicio que ya está fijado.</figcaption></figure>

## Añadir aire donde ayuda a leer {#add-padding-where-it-helps-reading}

El lead-in permite encontrar el texto antes de la primera sílaba. El lead-out deja terminar la lectura después de la voz. La salida suele necesitar más margen que la entrada, aunque una reacción breve y una frase con nombres desconocidos piden permanencias distintas.

Los máximos orientan cuánto puede ampliar la cadena los márgenes base. Otros pasos pueden superarlos, entre ellos el tratamiento de huecos cortos y la duración mínima. Revisa la permanencia resultante: el texto puede quedar colgado sobre el silencio o sobre una toma a la que ya no pertenece.

![Lead-in y lead-out alrededor de la silueta de la voz](../assets/ejemplos/margenes-silueta.png){ loading=lazy }

## Llevar el borde a un corte útil {#snap-an-edge-to-a-useful-cut}

Comprueba la imagen antes de elegir un keyframe: uno de codificación puede aparecer sin que cambie el plano. Auto Timing busca dentro de sus ventanas y también puede recortar voz dentro de **Corte de voz máx**. Escucha cualquier borde desplazado hacia dentro; el control mide milisegundos y no distingue una cola que se apaga de una sílaba nueva.

Si la voz termina poco antes de un corte, el subtítulo puede cerrarse ahí aunque el margen resultante sea menor que el lead-out base. La lectura debe quedar cubierta. La voz que cruza el corte normalmente se conserva completa. Una cola que pierde energía puede admitir la excepción descrita en [casos avanzados](casos-avanzados.md#simultaneous-voices-and-fading-tails); una palabra nueva debe seguir cubierta.

<figure class="tg-fig"><span class="tg-eyebrow">Comparar la misma escena</span><div class="tg-compare tg-video-stack" data-tg-wipe><div class="col"><h4>Final en el corte</h4><video src="../../../assets/ejemplos/kf-end.mp4" controls loop playsinline preload="metadata"></video><p class="note">«¡Una sopa de soba!» sale cuando el plano general del local cambia al primer plano del hombre.</p></div><div class="col"><h4>Final pasado del corte</h4><video src="../../../assets/ejemplos/no-kf-end.mp4" controls loop playsinline preload="metadata"></video><p class="note">La misma frase permanece sobre el plano siguiente. Revisa si ese tiempo extra todavía cumple una función.</p></div></div><figcaption>Reproduce y mueve el divisor para comparar ambas salidas.</figcaption></figure>

## Encadenar si el hueco parpadea {#chain-cues-when-the-gap-flickers}

Un intervalo vacío muy corto puede verse como un destello entre subtítulos. Se cierra cuando los eventos se leen con continuidad, el movimiento cabe en los márgenes y el resultado evita solapes accidentales.

El hueco se conserva si expresa vacilación, separa ideas o hablantes o deja un descanso útil. Si encadenar mantiene el primer texto sobre un silencio largo, conviene reconsiderar esa extensión.

<figure class="tg-fig"><span class="tg-eyebrow">Observar el relevo entre eventos</span><div class="tg-compare tg-video-stack" data-tg-wipe><div class="col"><h4>Con huecos breves</h4><video src="../../../assets/ejemplos/con-gaps.mp4" controls loop playsinline preload="metadata"></video><p class="note">Sigue «Sí.» → «Lo sabía.» → «Nadie recuerda a mi hermano.». Revisa los intervalos vacíos dentro de esta misma reflexión.</p></div><div class="col"><h4>Encadenado</h4><video src="../../../assets/ejemplos/sin-gaps.mp4" controls loop playsinline preload="metadata"></video><p class="note">Cada evento sustituye directamente al anterior. Compara el ritmo con las pausas de la voz.</p></div></div><figcaption>Conviene cerrar el hueco cuando distrae más de lo que aporta a la pausa.</figcaption></figure>

## Revisar ajustes que compiten {#review-competing-adjustments}

Revisa lectura, cobertura de voz, imagen y continuidad con los vecinos, en ese orden. Después comprueba duración y solapes. Cuando mover bordes ya no alcanza para hacer legible el texto, hay que volver a la [segmentación](segmentacion.md) o a la redacción. Reproduce el intercambio completo después del cambio: ganar tiempo para un evento puede trasladar el problema al vecino.
