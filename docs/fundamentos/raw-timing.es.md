# Timing bruto {#raw-timing}

El timing bruto localiza el primer y el último sonido del habla representada por un evento. El intervalo empieza en el ataque audible y termina con la última palabra. Los márgenes de lectura, los ajustes a keyframes y las cadenas se trabajan después.

<figure class="tg-fig tg-strip"><span class="tg-eyebrow">Localizar la voz antes de añadir aire</span><div class="lane"><span class="seg voz" style="left:18%;width:52%">Espera, ¿oíste eso?</span><i class="pin" style="left:18%"></i><i class="pin" style="left:70%"></i></div><div class="scale"><span class="v" style="left:18%">primer sonido</span><span class="v" style="left:70%">último sonido</span></div><figcaption>Primero se delimitan las palabras. El tiempo de lectura y los ajustes a la escena llegan en el post-timing.</figcaption></figure>

Escucha el pasaje, consulta la onda y vuelve a escuchar después de mover un borde. La voz tenue suele pedir varias pasadas. Una subida de amplitud puede indicar el ataque, pero también puede pertenecer a la música, a una respiración o a otro hablante.

## Qué sonidos pertenecen al evento {#decide-which-sounds-belong-to-the-cue}

El timing del diálogo cubre las palabras representadas por el texto. Una risa o una respiración que el subtítulo omite no alarga automáticamente ese intervalo. Si el texto describe un sonido, como una risa o un jadeo, su intervalo se ajusta a ese sonido. Una reacción que cambia el sentido de la respuesta merece atención aunque no contenga palabras.

Las consonantes suaves, los susurros, los gritos y las palabras dichas entre lágrimas siguen siendo habla. La cola se conserva mientras forme parte de la última palabra. Si hay una interrupción, el evento termina con lo que llegó a pronunciarse, aunque la palabra quede incompleta. Cuando se superponen voces, se sigue al hablante que corresponde al evento.

## Localizar el ataque {#find-the-onset}

La vocal más fuerte puede llegar después del inicio de la palabra. Escucha si hay una consonante suave antes de fijar el borde. Una respiración o un ruido de boca pueden precederla sin pertenecer a ella.

| Síntoma | Ajuste |
| --- | --- |
| La primera sílaba suena antes de que aparezca el texto | Adelantar el inicio hasta cubrir el ataque. |
| El evento empieza antes de la voz | Llevarlo al primer sonido pertinente. |
| El inicio sigue un ruido ajeno a la frase | Localizar el verdadero ataque del habla. |
| Falta una consonante inicial tenue | Incluir ese sonido en el inicio. |

## Localizar el cierre {#find-the-ending}

Hay que distinguir el final de la palabra de la respiración o el fondo que siguen. Una sílaba recortada o una cola vocal audible piden extender el final. Si el intervalo abarca ruido ajeno, se cierra antes.

La separación puede debilitar consonantes o eliminar voz. Comprueba los bordes inciertos contra la mezcla original.

## Revisar eventos con dos emisiones {#check-cues-with-two-utterances}

Un evento con dos enunciados contiene también su pausa interna. Los extremos pueden ser correctos, aunque no permitan mostrar cada enunciado por separado. Conviene revisar la [segmentación](segmentacion.md) si ambas partes ganarían con tiempos propios. La pausa interna por sí sola no vuelve incorrectos los bordes exteriores.

## Terminar la pasada bruta {#finish-the-raw-pass}

Comprueba que el primer y el último sonido estén cubiertos, que los extremos excluyan sonidos ajenos y que el evento siga una unidad comprensible en contexto. Guarda esta versión antes del [post-timing](post-timing.md) para poder cambiar los márgenes sin tener que localizar otra vez la voz.
