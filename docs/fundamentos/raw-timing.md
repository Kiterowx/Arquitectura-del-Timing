# Raw timing (pegado)

El raw timing fija solo dos cosas: el inicio en el primer sonido hablado de la frase y
el final en el último. El resultado es el intervalo desnudo de voz: el tramo que va del
primer ataque audible a la última cola verbal, libre de interpretación. El aire de
lectura, los keyframes y las cadenas pertenecen al post-timing, y por eso conviene que
este intervalo sea exacto antes de tocar cualquier margen.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">El intervalo desnudo de voz</span>
<div class="lane">
<span class="seg voz" style="left:18%;width:52%">voz · «Espera, ¿oíste eso?»</span>
<i class="pin" style="left:18%"></i>
<i class="pin" style="left:70%"></i>
</div>
<div class="scale"><span class="v" style="left:18%">primer sonido</span><span class="v" style="left:70%">último sonido</span></div>
<span class="cap">El raw timing fija solo dos límites: el inicio en el <b>primer sonido hablado</b> y el final en el <b>último</b>. El aire de lectura, los keyframes y las cadenas pertenecen al post-timing.</span>
</figure>

Aunque el resultado sea solo dos límites, llegar a ellos es un ciclo: se escucha el
tramo, se mira la onda, se ajusta un borde, se vuelve a escuchar. La precisión
se gana iterando sobre la misma línea hasta que el intervalo contiene la voz y nada más.

## Qué cuenta como habla

El pegado cubre las palabras subtituladas, y solo esas. Una risa, una onomatopeya o una
vocalización decorativa quedan fuera, porque no son texto que el espectador esté leyendo;
incluirlas estiraría el intervalo hacia un sonido que la línea no representa. La frontera
entre habla y decoración no siempre es obvia, y se resuelve preguntando si ese sonido
pertenece a una palabra de la frase.

Bajo ese criterio, varios sonidos sí cuentan aunque cueste oírlos. Una consonante suave
se cubre cuando inicia una palabra de la frase, porque la palabra empieza ahí aunque su
energía sea baja. Una palabra susurrada se cubre si aparece en el texto. Una palabra
gritada se cubre desde su ataque hasta su salida, por saturada que esté. Una palabra
dicha entre llanto se sigue aunque la voz vaya irregular. Y una cola vocal se conserva
mientras todavía forme parte de la palabra. En una frase interrumpida, el cierre cae en
el último sonido realmente emitido, aunque la palabra quede a medias. Cuando dos voces se
solapan, el pegado sigue a la del subtítulo y deja la otra fuera.

## El inicio se pega al ataque

El inicio cae en el ataque audible de la frase. La duda habitual aparece cuando antes de
la vocal fuerte hay una respiración, un ruido de boca o una consonante suave: hay que
decidir si eso ya es la emisión verbal o todavía no. La línea entra donde empieza la
palabra, lo que a veces es ese primer roce consonántico y a veces es la vocal que sigue.

Cuatro síntomas delatan un inicio mal pegado, y cada uno tiene su corrección. Si la
primera sílaba queda descubierta, el borde adelanta hasta el ataque real. Si la línea
entra antes de que exista habla, retrocede hasta donde la voz empieza de verdad. Si
arranca sobre un ruido ajeno al habla, se mueve al primer sonido que sí es palabra. Y si
ignora una consonante inicial suave, se adelanta hasta cubrirla.

## El final se pega a la salida

El final cae en la salida audible de la frase, conservando la última sílaba, la cola
vocal o el cierre verbal que pertenezca a la emisión. La duda aquí es la inversa del
inicio: distinguir la cola de la palabra de la respiración o el ruido que viene después.

También sus fallos son cuatro. Si el borde corta la última sílaba, se extiende hasta el
cierre real. Si conserva una respiración posterior a la frase, se recorta al final
verbal. Si arrastra ruido de fondo, se separa el ruido del habla. Y si termina antes de
una cola vocal todavía audible, se extiende hasta donde la voz de verdad se apaga.

## Frases dobles

Una línea que todavía contiene dos frases separables complica el pegado, porque encierra
dos ataques y dos cierres y ninguno de los dos bordes de la línea cae sobre un punto
natural. El raw timing solo puede cubrir el conjunto, con la imprecisión que eso arrastra.
La precisión real llega cuando la [segmentación](segmentacion.md) ya dejó cada unidad
hablada en su propia línea; por eso la división se resuelve antes que el pegado.

## Cuándo está terminada

Una línea queda pegada cuando se cumplen cuatro condiciones a la vez: el primer sonido
hablado está cubierto, el último también, el intervalo contiene únicamente material
hablado de la frase y la línea representa una unidad hablada completa. Con eso, el
intervalo desnudo de voz está listo para recibir los márgenes, los snaps y las cadenas
que describe [Post-timing](post-timing.md).
