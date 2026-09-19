# Criterios cuantitativos {#reading-speed-and-timing-limits}

Un evento rápido puede necesitar más tiempo, menos texto o una mejor división. Uno lento puede estar acompañando una pausa deliberada. Las cifras ayudan a localizar esos casos y a comparar el ajuste con el original; el texto y su lugar en la escena explican qué cambio conviene.

## Medir la velocidad de lectura {#count-characters-consistently}

El CPS es el número de caracteres contados dividido entre la duración en segundos. Usa el mismo conteo al comparar dos ajustes. La auditoría y **Count CPS** de Chrono excluyen espacios y los signos que reconocen como puntuación; incluirlos da una cifra mayor para el mismo subtítulo.

Por ejemplo, «¡Corre, que nos vamos!» tiene 16 letras y 22 caracteres con espacios y signos. Si permanece 0,5 s, produce 32 CPS con el primer conteo y 44 con el segundo. Si permanece 1,1 s, el segundo conteo baja a 20 CPS. La duración cambia, pero todavía hay que comprobar que el texto encaje con la voz y las líneas vecinas.

## Probar el conteo {#try-the-count-yourself}

Cambia el texto o la duración para comparar ambos conteos. Usa texto plano, sin etiquetas ASS. El ejemplo cuenta puntos de código Unicode; los acentos combinados y algunas secuencias de emoji pueden diferir del número de caracteres visibles en el editor.

<form class="tg-calculator" data-tg-cps>
<label for="cps-text">Texto del subtítulo</label>
<textarea id="cps-text" rows="2">¡Corre, que nos vamos!</textarea>
<div class="tg-calculator-fields">
<div><label for="cps-duration">Duración (segundos)</label><input id="cps-duration" type="number" min="0.01" step="any" value="0.5" inputmode="decimal" aria-describedby="cps-error"></div>
<div><label for="cps-count">Conteo</label><select id="cps-count"><option value="all">Incluir espacios y puntuación</option><option value="letters">Solo letras y números</option></select></div>
</div>
<output for="cps-text cps-duration cps-count" aria-live="polite"><strong data-cps-result>44,0 CPS</strong><span data-cps-detail>22 caracteres ÷ 0,50 segundos</span></output>
<p id="cps-error" class="tg-field-error" hidden>Introduce una duración mayor que cero.</p>
<p class="tg-calculator-note">Usa el mismo conteo al comparar duraciones y lee el evento en reproducción.</p>
<noscript><p>El ejemplo inicial es 22 ÷ 0,5 = 44 CPS. Activa JavaScript para recalcular al editar.</p></noscript>
</form>

## Umbrales propuestos para la revisión {#suggested-review-thresholds}

| Medida | Punto de revisión | Qué comprobar |
| --- | --- | --- |
| CPS | Por encima de 20 o por debajo de 7, manteniendo el mismo conteo. | Carga de lectura o permanencia excesiva. |
| Duración breve | Aproximadamente 700–833 ms. | Si la aparición se percibe como destello o deja leer. |
| Duración larga | A partir de unos 5500 ms. | Si la frase necesita toda esa permanencia. |
| Longitud | Más de 42 caracteres por renglón. | Ancho real, sintaxis y posible división. |
| Composición | Más de dos renglones. | Si puede simplificarse o segmentarse. |
| Gap corto | Alrededor de 80 ms. | Parpadeo, pausa expresiva y posibilidad de cadena. |
| Gap largo | Alrededor de 1200 ms o más. | Pausa real o tiempo mal situado. |

Estos valores orientan la revisión propuesta en esta guía y admiten excepciones justificadas. No son una norma universal ni todos coinciden con los predeterminados de Chrono. Por ejemplo, el preset completo de auditoría usa 500 ms como mínimo, 7000 ms como máximo y 300 ms para su comprobación de huecos cortos; Auto Timing marca su propio límite de 28 CPS. Revisa la configuración que esté activa en tu versión.

## Comparar el efecto del ajuste {#apply-the-delivery-specification}

Alargar un evento reduce su CPS, pero también lo mantiene sobre una parte mayor de la escena. Comprueba qué ocupa ese tiempo extra: la misma idea, una pausa útil, otro hablante o una acción nueva. Si la permanencia dificulta seguir el intercambio, conviene revisar la redacción o dividir la oración en un punto con sentido.

Repetir muchas veces el pasaje puede ocultar un problema de lectura porque la frase ya resulta familiar. Reproduce desde unos eventos antes, con la imagen y la mezcla original, y comprueba si queda tiempo para seguir la acción. Una respuesta breve y un nombre desconocido pueden pedir distinta atención con el mismo CPS.

La marca de CPS de Auto Timing usa un filtro de puntuación más limitado que **Count CPS** y la auditoría. Por ejemplo, las comillas curvas pueden seguir contando en Auto Timing. La calculadora anterior ofrece dos conteos sencillos para comparar; su opción «Solo letras y números» no reproduce todos los detalles de las macros.

## Márgenes y escena {#padding-and-scene-changes}

Para el trabajo manual, esta guía propone entradas de unos 80–150 ms y salidas de 350–420 ms como punto de partida. Esos márgenes se reducen o amplían según el texto, la escena y la vecindad. Auto Timing parte de 120 ms de entrada y 420 de salida, con máximos de 400 y 800 ms. Esos máximos orientan los ajustes de cadena. El snap, los huecos cortos y la duración mínima tienen reglas adicionales, descritas en [Algoritmos](../algoritmos/index.md#chronos-final-pass). Comprueba los bordes resultantes después de la pasada.

La opción `edge_snap_protect_ms`, de 250 ms por defecto, es el alcance de los snaps direccionales. La valoración perceptiva del borde se hace al revisar voz, lectura e imagen.

## Fotogramas y milisegundos {#frames-and-milliseconds}

En video de frecuencia constante, un fotograma dura `1000 / fps` ms:

| Framerate | Un cuadro | Dos cuadros |
| --- | --- | --- |
| 24000/1001 fps (≈23,976) | ≈41,71 ms | ≈83,42 ms |
| 24 fps | ≈41,67 ms | ≈83,33 ms |
| 25 fps | 40 ms | 80 ms |
| 30 fps | ≈33,33 ms | ≈66,67 ms |

Para video de frecuencia variable se usan sus timecodes. El número de cuadro identifica la imagen; dividir por un framerate promedio no garantiza el tiempo de ese cuadro.

## Ajustar una tolerancia {#change-a-tolerance-deliberately}

Prueba el cambio en una escena representativa y compara los casos marcados antes y después. En **SHORT-GAP**, subir el límite marca más huecos; bajarlo marca menos. En **FAST-CPS**, subir el máximo marca menos líneas rápidas. Comprueba la dirección del efecto antes de intentar reducir avisos.

La [auditoría](../tecnica/auditoria.md) reúne esas marcas. Una vez corregidas o justificadas, revisa el resultado en reproducción.
