# Auditar el timing {#audit-the-timing}

La auditoría de Chrono escribe marcas en **Effect** para localizar eventos que conviene revisar. Cada marca registra una condición frente a un parámetro. La revisión determina si corresponde a un error o a una decisión deliberada de timing.

## Elegir el alcance {#choose-the-scope}

Limita la pasada a la selección o filtra por estilo, actor, **Effect** o capa. Esto permite revisar la lectura del diálogo sin incluir los carteles. Un desplegable vacío omite su sección; el modo de marcador único ejecuta la comprobación elegida en lugar del preset.

Empieza con una escena cuyo timing ya esté revisado, comprueba los umbrales y amplía el alcance. Los [criterios de lectura](../fundamentos/criterios.md) distinguen las referencias propuestas en esta guía de los valores predeterminados de la macro.

## Marcas de timing y lectura {#timing-and-reading-markers}

| Marca | Condición que revisar | Posible respuesta |
| --- | --- | --- |
| `TOO-SHORT` | Duración inferior al mínimo configurado. | Añadir tiempo si cabe; comprobar si el evento pasa como un destello. |
| `TOO-LONG`, `TOO-LONG-TIME` | Duración superior al límite configurado. | Recortar una permanencia innecesaria o dividir con sentido. |
| `ZERO-LENGTH` | Inicio y final coinciden. | Restituir un intervalo visible. |
| `FAST-CPS` | Velocidad superior al máximo elegido. | Extender, dividir o condensar conservando el sentido. |
| `SLOW-CPS` | Velocidad inferior al umbral elegido. | Comprobar si el texto permanece después de cumplir su función. |
| `SHORT-GAP`, `LARGE-GAP` | Separación fuera del rango de huecos elegido. | Escuchar si hay una pausa real antes de encadenar o mover. |
| `OVERLAP` | Eventos visibles a la vez. | Conservar el diálogo simultáneo y corregir los solapes accidentales. |

Las revisiones de duración y sobretiempo tienen umbrales propios. Al revisar ambas direcciones del hueco, la separación medida queda registrada en los dos eventos vecinos.

## Marcas de keyframes {#keyframe-markers}

Las comprobaciones **On-keyframe** pueden escribir `START-ON-KF` o `END-ON-KF`. **Twin** localiza bordes vecinos asociados al mismo keyframe dentro de su tolerancia. **Miss** encuentra un keyframe cercano disponible que el borde no utilizó y escribe `MISSED-START-KF` o `MISSED-END-KF`. `NEAR-START-KF` y `NEAR-END-KF` localizan bordes próximos a un corte.

Las pasadas de solo inicios o solo finales permiten revisar un extremo. La dirección de búsqueda elige keyframes anteriores, posteriores o ambos. Otras opciones omiten huecos ya explicados por un corte, incluyen huecos de cero o limpian marcas anteriores antes de escribir las nuevas.

Comprueba la imagen antes del snap. Un keyframe disponible puede ser una mala salida para la voz o para la lectura.

## Marcas de texto y segmentación {#text-and-segmentation-markers}

`NO-END-PUNCT` y `FINAL-COMMA` señalan posibles unidades incompletas. Lee el evento con sus vecinos antes de cambiar la puntuación o unirlo. Una oración que continúa en el siguiente evento puede ser una decisión narrativa deliberada, como «En caso contrario,» en el salón.

## Resolver lo encontrado {#resolve-the-findings}

Por ejemplo, la auditoría puede marcar tres solapes. Al escuchar, dos corresponden a hablantes simultáneos y el tercero a un lead-out excesivo. El tercero necesita corrección; los otros dos conservan el diálogo simultáneo. Sus marcas registran solapes revisados y mantenidos deliberadamente.

Antes de ver el episodio completo, comprueba que:

- Video, audio y subtítulos pertenecen a la misma edición y línea de tiempo.
- Las primeras y últimas sílabas están cubiertas; las permanencias largas tienen motivo.
- Los cortes cercanos se aprovecharon o se descartaron deliberadamente.
- Los huecos breves, los solapes y los eventos rápidos se revisaron con sus vecinos.
- Las divisiones y uniones conservan sentido, hablantes y formato ASS.

Termina con la mezcla original a velocidad normal. Esa pasada incluye la música, los efectos y la imagen que acompañarán la lectura.
