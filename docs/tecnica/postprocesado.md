# Postprocesado

El postprocesado toma el intervalo pegado a la voz y lo convierte en el intervalo
visible: añade el aire de entrada, el aire de salida, alinea los bordes con la
escena y cierra los huecos que parpadean. El cronometraje automático ya hace esto
en su pasada, pero rara vez deja todo perfecto. El trabajo fino vive aquí, y se
reparte entre una pasada en bloque y un puñado de ajustes a mano.

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
<span class="cap">El postprocesado añade los márgenes y cierra los huecos; el <b>lead-out</b> supera al <b>lead-in</b> porque la lectura continúa después del habla.</span>
</figure>

## La pasada en bloque

La utilidad de timing aplica de una vez, sobre toda la selección, un lead-in y un
lead-out adaptativos, el encadenado entre líneas consecutivas y una protección de
borde que impide que un ajuste mueva un límite ya correcto. Sus valores son más
ceñidos que los del motor de detección, porque ya no explora candidatos: pule un
timing que se supone bueno. El aire de entrada va de 150 a 300 milisegundos, y el de
salida de 350 a 600; cuando la línea encadena con la siguiente, su lead-out se ajusta
hacia 500, y un hueco se cierra mientras quede dentro de los 800 milisegundos de cadena.

Conviene reservar esta pasada para material ya pegado a la voz y de escena
tranquila, donde un mismo criterio sirve a muchas líneas. Cuando el timing de
partida es irregular, antes de aplicarla hay que corregir el pegado; un postprocesado
uniforme sobre bordes torcidos propaga el error en lugar de arreglarlo. La
alternativa, cuando tiempos bien pegados requieren pulido, es el modo
**Post actual** del [motor de timing](motor.md), que hace la misma pasada final como
parte del cronometraje automático. Fuera de la suite, el post-procesador nativo de Aegisub
(**TPP**) y **Kite Timing** aplican esa misma clase de pasada en bloque; cada uno impone su
propia política de márgenes y de cadena, y la elección depende de cuál se acerque más al
criterio del episodio.

## Mover el aire a mano

Cuando una línea concreta necesita más o menos aire que el que dejó la pasada en
bloque, cuatro ajustes mueven cada borde por un paso fijo —de partida, 100 ms— y,
sobre todo, respetan las cadenas.

Adelantar o retrasar el **inicio** arrastra consigo el final de una vecina que esté
encadenada con hueco cero, para que la cadena no se rompa; si el hueco con la vecina
es positivo, el inicio se detiene al tocarla. Mover el **final**
funciona igual hacia el otro lado: empuja el inicio de la siguiente línea cuando
están encadenadas. Esta conciencia de cadena es la diferencia entre estirar un borde
y desordenar dos líneas: el ajuste mantiene la continuidad que ya estaba decidida.

## Alinear con la escena

Un borde se alinea con un cambio de escena mediante un snap a keyframe. Los snaps
**direccionales** son la herramienta fina: mueven un solo borde al keyframe anterior o
siguiente —inicio atrás, inicio adelante, final atrás, final adelante— dentro de un alcance
direccional medido en milisegundos, de modo que un corte lejano no atrae el borde.

Estos snaps son **modificadores** que responden a una marca. Cuando la revisión de keyframes
deja un `MISSED-START-KF` o un `MISSED-END-KF` —un corte a tiro que el borde no aprovechó—,
el snap direccional de ese lado lleva el borde al corte: el aviso de `Miss-KF` nombra la
línea, el modificador la resuelve. Las utilidades de lead trabajan igual sobre un lado
concreto, añadiendo o quitando aire cuando una entrada o una salida lo pide.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">Tres reparaciones de la pasada en bloque</span>
<div class="lane">
<span class="seg voz" style="left:6%;width:30%">línea A</span>
<span class="cont" style="left:36%;width:5%">·</span>
<span class="seg voz" style="left:41%;width:30%">línea B</span>
<span class="seg aire" style="left:71%;width:10%"><i>out</i></span>
<i class="kf" style="left:88%"></i>
</div>
<div class="tg-keys">
<b class="k-aire">lead-in / lead-out: el aire base de cada lado</b>
<b class="k-continuidad">cadena: cierra el hueco que parpadea entre vecinas</b>
<b class="k-escena">snap: el borde salta al keyframe cercano</b>
</div>
<span class="cap">La pasada aplica de golpe lo mecánico —márgenes, cadena y snap— sobre todo el episodio; después vienen los ajustes a mano.</span>
</figure>

Entre medias actúa una protección de borde: un límite ya colocado resiste los
microajustes dentro de un margen de unos 250 ms, de modo que un keyframe que está
prácticamente encima no arrastra un borde que ya estaba bien. La regla detrás de
todo snap es que la escena debe explicar el movimiento; un corte cercano no obliga a
saltar si el borde actual ya resuelve la voz y la lectura.

## Reajustar las líneas desfasadas

El **snap bidireccional** resuelve un problema distinto del de un borde suelto: una selección
entera que quedó **desfasada**. Ocurre cuando el subtítulo se cronometró contra un video a un
framerate y termina sobre otro —un máster de 24 fps llevado a 26, un pull-down mal resuelto—,
y todas las líneas arrastran el mismo desplazamiento creciente respecto a la escena. La
operación ajusta inicio y final a la vez, cada uno al keyframe más próximo, dentro de un rango
medido en cuadros —de partida, dos—, y devuelve a los cortes una tanda de bordes que se
movieron en bloque.

El rango se mide en cuadros porque el desfase es un fenómeno de cuadros.
Un mismo valor en milisegundos pesa distinto según el framerate: «dos cuadros» se mantiene
estable mientras «80 ms» cambia de significado con el material. La conversión es directa.

<div class="tg-fig" style="padding-bottom:0.4rem">
<span class="tg-eyebrow">Un cuadro en milisegundos</span>
<table>
<thead>
<tr>
<th>Framerate</th>
<th>Un cuadro</th>
<th>Dos cuadros</th>
</tr>
</thead>
<tbody>
<tr>
<td>24 fps</td>
<td>≈42 ms</td>
<td>≈83 ms</td>
</tr>
<tr>
<td>25 fps</td>
<td>40 ms</td>
<td>80 ms</td>
</tr>
<tr>
<td>30 fps</td>
<td>≈33 ms</td>
<td>≈67 ms</td>
</tr>
</tbody>
</table>
</div>

## Cerrar y encadenar

Cuando dos líneas dejan un hueco demasiado corto para leerse como pausa, encadenarlas
elimina el parpadeo. **Chain Left** extiende el inicio de una línea hasta el final de la
anterior; **Chain Right**, el final de una línea hasta el inicio de la siguiente, dejando
hueco cero, siempre dentro de la distancia máxima configurada. Son también modificadores
ligados a la auditoría: un `SHORT-GAP` señala el parpadeo que pide cadena, y un `LARGE-GAP`,
la separación que conviene mirar antes de tocarla. Más allá de la distancia máxima el hueco
se considera una pausa real y se conserva. La decisión de encadenar o respetar el silencio es
la de [Post-timing](../fundamentos/post-timing.md): se cierra el hueco que distrae, se
preserva el que comunica.

## Elegir la herramienta

La pasada en bloque resuelve el grueso de un episodio limpio. Los ajustes a mano
resuelven la línea que se resiste: un final que debe ceder a un corte que la pasada
no eligió, una entrada que pide más aire por texto denso, un parpadeo que la cadena
automática no cerró porque caía justo en el límite. La regla práctica es empezar por
lo general y bajar a lo particular: aplicar el criterio común, y reservar la atención
a mano para las líneas donde ese criterio común no acierta.
