# Post-timing: márgenes, snap y chain

El post-timing parte del intervalo desnudo de voz y le añade lo que la voz no contiene:
el aire de lectura, la alineación con la escena y la continuidad con las líneas vecinas.
Tres operaciones lo consiguen. Los márgenes convierten el intervalo de voz en intervalo
visible. El snap alinea un borde con un corte de escena cercano. La cadena cierra los
huecos que parpadean. Las tres trabajan sobre el mismo intervalo y se ordenan por la
jerarquía de revisión que cierra esta página.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">Del intervalo de voz al intervalo visible</span>
<div class="lane">
<span class="seg aire" style="left:8%;width:6%"><i>in</i></span>
<span class="seg voz" style="left:14%;width:44%">voz · «No lo sé todavía.»</span>
<span class="seg aire" style="left:58%;width:14%"><i>out</i></span>
<span class="cont" style="left:78%;width:16%">vecina</span>
</div>
<div class="tg-keys">
<b class="k-aire">lead-in: aire de entrada, antes de la voz</b>
<b class="k-voz">voz: el intervalo pegado al habla</b>
<b class="k-aire">lead-out: aire de salida, mayor que el de entrada</b>
<b class="k-continuidad">la cadena cierra el hueco que parpadea</b>
</div>
<span class="cap">Los márgenes convierten el intervalo de voz en intervalo visible; el <b>lead-out</b> base supera al <b>lead-in</b> porque la lectura termina después del habla. La cadena cierra el hueco con la vecina cuando es demasiado corto para leerse como pausa.</span>
</figure>

## Valores de partida

Una primera aplicación estable parte de unos valores conocidos, que la revisión luego
aprieta o afloja según la escena. El aire de entrada arranca en 120 milisegundos y puede
crecer hasta 400; el de salida, en 420 y hasta 800. El snap busca un keyframe hasta 400
milisegundos del inicio y hasta 800 del final, con 100 de margen para entrar antes del
corte. Ninguna línea baja de 500 milisegundos de permanencia, y la lectura por encima de
28 caracteres por segundo queda señalada para revisar. Son puntos de partida, y son
límites de trabajo holgados: el suelo de 500 milisegundos y la señal de 28 caracteres por
segundo cazan solo los casos claros, mientras que la comodidad de lectura se revisa con
los rangos más ceñidos de los [criterios cuantitativos](criterios.md). Cada borde se
confirma comprobando que conserva la lectura, la escena y la continuidad.

## Recorrer de la última línea a la primera

El post-timing a mano decide cada borde desde cero —cuánto aire, qué corte, qué hueco—, y
conviene aplicarlo en orden inverso: de la última línea de la escena hacia la primera. La
razón está en la dependencia entre vecinas. El margen de salida de una línea depende de dónde
empiece la siguiente: hasta fijar el inicio de la línea *n+1* no se sabe cuánto puede
extenderse el final de la *n* sin invadirla, ni cuánto hueco queda para encadenar. Resuelta
antes la línea posterior, cada final anterior se decide mirando un borde ya estable en lugar
de uno que todavía se moverá, y el margen de salida se fija una sola vez.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">El final de n depende del inicio de n+1</span>
<div class="lane">
<span class="seg voz" style="left:4%;width:24%">línea n−1</span>
<span class="seg aire" style="left:28%;width:10%"><i>out</i></span>
<i class="ord" style="left:95%">3</i>
</div>
<div class="lane">
<span class="seg voz" style="left:34%;width:24%">línea n</span>
<span class="seg aire" style="left:58%;width:10%"><i>out</i></span>
<i class="ord" style="left:95%">2</i>
</div>
<div class="lane">
<span class="cont" style="left:64%;width:26%">línea n+1</span>
<i class="ord" style="left:95%">1</i>
</div>
<span class="cap">El recorrido a mano va de abajo hacia arriba: fijado primero el inicio de la <b>línea n+1</b> (①), el margen de salida de la <b>línea n</b> (②) se extiende hasta tocarlo sin invadirlo, y así hasta la primera línea de la escena.</span>
</figure>

## Los márgenes dan el aire

El margen es lo que transforma el intervalo de voz en intervalo visible. El lead-in
coloca el inicio visible un poco antes de la voz, para que el ojo encuentre el texto a
tiempo; el lead-out conserva la línea un poco después del cierre vocal, para que la
lectura termine. El lead-out base supera al lead-in porque la lectura termina después del
habla, siempre por detrás de la voz. Los máximos marcan cuánto puede crecer ese aire
cuando un snap, un hueco corto o un ritmo visual lo justifican; más allá de ellos, el aire
deja de ayudar y empieza a sentirse como texto muerto.

![El aire de entrada y de salida alrededor de la silueta de la voz](../assets/ejemplos/margenes-silueta.png){ loading=lazy }

## El snap alinea con la escena

El snap mueve un borde visible hacia un keyframe cercano, partiendo del intervalo ya
ampliado por los márgenes. Se rige por reglas claras. El keyframe debe caer dentro de la
ventana de snap del borde. El movimiento debe caber dentro del margen máximo permitido.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">La ventana de snap de cada borde</span>
<div class="lane">
<span class="win" style="left:4%;width:15%"></span>
<span class="win" style="left:56%;width:32%"></span>
<span class="seg aire" style="left:8%;width:6%"><i>in</i></span>
<span class="seg voz" style="left:14%;width:44%">voz</span>
<span class="seg aire" style="left:58%;width:10%"><i>out</i></span>
<i class="kf" style="left:76%"></i>
<i class="kf" style="left:95%"></i>
</div>
<div class="scale"><span class="e" style="left:76%">salta</span><span class="v" style="left:95%">queda lejos</span></div>
<div class="tg-keys">
<b class="k-escena">ventana de snap: 400 ms en el inicio, 800 en el final</b>
<b class="k-aire">el aire base del que parte el borde</b>
</div>
<span class="cap">Solo el keyframe que cae <b>dentro de la ventana</b> atrae el borde; el corte fuera de alcance deja el final donde los márgenes lo dejaron. La ventana del final dobla a la del inicio porque la escena pesa más en los cierres.</span>
</figure>
La ventana del final es mayor que la del inicio, porque la escena y la continuidad pesan
más en los cierres que en las entradas. El snap puede incluso reducir un lead-out si el
corte cierra mejor que el aire base. Y la cobertura del habla subtitulada conserva la
prioridad: una excepción perceptiva mínima queda para los casos avanzados y se decide línea a línea.

El caso más frecuente es un final cerca de un corte. Cuando la voz termina poco antes de
un keyframe, el final visible puede cerrarse en ese keyframe aunque quede por debajo del
lead-out base, porque un cierre sobre el corte suele ser más estable que dejar texto
muerto en la toma siguiente. Cuando la voz termina justo sobre el keyframe, el final
puede coincidir con el corte si la última sílaba queda cubierta. Y cuando la voz termina
apenas después del keyframe —en un margen del orden de 150 ms—, el final todavía puede
cerrar en el corte si el tramo posterior es perceptivamente mínimo, la lectura ya alcanza
y el resultado controla el desbordamiento hacia la toma siguiente. Esa concesión tiene un
límite: si el tramo que queda tras el corte contiene una palabra completa o información
nueva, el final conserva la voz y renuncia al corte.

<figure class="tg-fig">
<span class="tg-eyebrow">Final en keyframe frente a final pasado</span>
<div class="tg-compare tg-video-stack" data-tg-wipe>
<div class="col">
<h4>Correcto: final en keyframe</h4>
<video src="../../assets/ejemplos/kf-end.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">El subtítulo termina en el corte de escena; la salida queda limpia y el texto permanece en la toma que lo contiene.</p>
</div>
<div class="col">
<h4>Incorrecto: final pasado del keyframe</h4>
<video src="../../assets/ejemplos/no-kf-end.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">El final cruza el corte; el texto permanece sobre la toma siguiente y el cambio de escena se siente arrastrado.</p>
</div>
</div>
<span class="cap">La misma escena compara el cierre correcto en el keyframe con el final pasado del corte.</span>
</figure>

## La cadena cierra los huecos

La cadena elimina los huecos visibles entre líneas consecutivas, y existe sobre todo para
corregir parpadeos y huecos de lectura. Se aplica cuando el hueco es demasiado corto para
percibirse como pausa útil, cuando la salida de una línea y la entrada de la siguiente
caben dentro de los márgenes máximos, cuando el resultado conserva una permanencia
razonable y cuando no introduce un solape accidental.

Y se conserva el hueco —no se encadena— cuando la pausa tiene función expresiva, cuando
el hueco es lo bastante largo para leerse como descanso, cuando encadenar alargaría de
más la línea anterior, o cuando la escena cambia de un modo que pide separación. La
decisión, en el fondo, es siempre la misma: se cierra el hueco que distrae y se preserva
el que comunica.

<figure class="tg-fig">
<span class="tg-eyebrow">El hueco que parpadea</span>
<div class="tg-compare tg-video-stack" data-tg-wipe>
<div class="col">
<h4>Con hueco</h4>
<video src="../../assets/ejemplos/con-gaps.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">Un hueco demasiado corto entre dos líneas se percibe como un parpadeo que distrae.</p>
</div>
<div class="col">
<h4>Encadenado</h4>
<video src="../../assets/ejemplos/sin-gaps.mp4" controls loop playsinline preload="metadata"></video>
<p class="note">La cadena lleva el hueco a cero y el paso entre líneas deja de distraer.</p>
</div>
</div>
<span class="cap">Se cierra el hueco que distrae; el que comunica una pausa real se conserva.</span>
</figure>

## El orden de la revisión

Cuando las tres operaciones compiten sobre una misma línea, se aplican en este orden:

1. Lectura suficiente.
2. Habla subtitulada cubierta, o excepción perceptiva mínima.
3. Cierre visual en un keyframe cercano.
4. Continuidad con las líneas consecutivas.
5. Duración mínima, permanencia excesiva y solape.
6. Segmentación, cuando el tiempo resulte insuficiente por más que se ajuste.

Este orden hereda la jerarquía general: primero que se lea, después que la voz esté
completa, luego la escena, la continuidad y los límites técnicos, y al final —cuando
ningún ajuste de borde basta— la decisión de volver atrás y resegmentar.
