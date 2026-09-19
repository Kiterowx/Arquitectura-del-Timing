# Glosario {#glossary}

Un **evento** es un subtítulo temporizado; un **renglón** es una fila de texto visible. Aegisub también llama «líneas» a las filas de eventos.

## Línea y borde {#cues-and-boundaries}

Línea
: Evento de subtítulo con inicio y final; puede contener uno o más renglones visuales. También se le llama *cue*.

Inicio
: Borde donde la línea aparece.

Final
: Borde donde la línea desaparece.

Duración
: Tiempo visible entre el inicio y el final.

Gap
: Espacio entre el final de una línea y el inicio de la siguiente.

Overlap
: Dos líneas visibles al mismo tiempo; legítimo en diálogo simultáneo.

Vecindad
: Las líneas anterior y siguiente, cuya relación con la actual condiciona su permanencia.

## Proceso {#workflow}

Raw timing
: Pegado de los dos bordes a la actividad de voz como intervalo desnudo previo a márgenes y ajustes. También *timing primario* o *pegado*.

Post-timing
: Adición de márgenes, snap y cadena sobre el intervalo de voz.

Proofwatch
: Revisión final del episodio como espectador, de principio a fin.

Retiming
: Reajuste de tiempos ya existentes, propios o heredados.

Segmentación
: División del texto en unidades de línea con sentido, voz y carga propios.

## Ajustes de borde {#boundary-adjustments}

Lead-in
: Aire de entrada, antes de la voz, para que el ojo encuentre el texto.

Lead-out
: Aire de salida, después de la voz, para que la lectura termine. También *hold*.

Snap
: Alineación de un borde con un keyframe de escena cercano.

Chain
: Cierre de un gap entre dos líneas para corregir un parpadeo.

Protección de borde
: Nombre de un ajuste de alcance. En los snaps direccionales de Chrono, `edge_snap_protect_ms` limita la distancia de búsqueda; no determina si un borde es correcto.

## Síntomas {#symptoms}

Bleed
: Final que invade una toma ajena a la línea.

Overstay
: Permanencia excesiva tras cerrar la voz y la lectura.

Flicker
: Parpadeo producido por un gap demasiado corto.

Overtime
: Duración de una línea por encima del umbral de permanencia elegido.

## Señales {#audio-and-analysis-files}

Vocales / Vocals
: Pista de voz separada de la mezcla. Puede conservar varios hablantes, canto o ruido residual. Debe mantener la sincronía con el video.


VAD
: Detección de actividad de voz; marca regiones de habla probable.

Flux
: Medida del cambio espectral que ayuda a localizar ataques. VADFlux exporta inicios de actividad, sin eventos de final de voz.

Envelope
: Contorno de amplitud o energía. El TSV de los generadores usa RMS; la onda JSON aporta picos mínimo/máximo.

Mapa espectral
: Medidas de energía y textura por bandas de frecuencia. Sirve para consultar tramos ambiguos, sin identificar por sí solo la voz.

Onda comprimida
: Forma de onda en niveles de resolución, para ver y para detectar.

Keyframe
: Fotograma clave del video codificado o marca externa de un candidato a corte. No todos los keyframes son cambios de escena; comprueba la imagen antes del snap.

## Lectura y escena {#reading-and-picture}

CPS
: Caracteres por segundo. Antes de comparar valores se especifica qué caracteres cuenta la herramienta.

Rebreak
: Cambio del punto donde el texto salta de renglón.

Frame timing
: Ajuste por fotogramas, propio de los elementos visuales.

Pausa dramática
: Silencio que sostiene una intención narrativa y conviene preservar.
