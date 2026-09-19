# Flujo de trabajo {#an-episode-from-preparation-to-proofwatch}

Trabaja sobre una copia del ASS y conserva el video y la mezcla original. La pista vocal facilita la identificación de los bordes; la mezcla original sirve de referencia para comprobarlos.

## Preparar el material {#prepare-matching-media}

Reúne `01.mkv` y `01.ass` de la misma edición. Extrae la pista del idioma correcto y [separa las vocales](vocales.md) con UVR, Demucs o Audio Separator. Guarda la voz como `01.wav`, sin recortar silencios ni cambiar su velocidad. Comprueba la sincronía al principio, en medio y al final.

## Resolver la segmentación {#settle-the-segmentation}

Revisa las líneas con varias frases o cambios de hablante. Divide solo cuando mejore la lectura y el reparto del diálogo. Las herramientas están en [División de líneas](division-lineas.md). Después de dividir, comprueba las etiquetas ASS y sitúa cada fragmento aproximadamente sobre su voz.

## Generar las señales necesarias {#generate-the-files-you-need}

Para empezar con Lazy basta ejecutar **Waveform JSON.bat** sobre `01.wav`. Para Busy, prepara además los silencios, VAD, flux y envelope. El espectro es una consulta opcional. **Generate All.bat** recibe el video o su WAV emparejado y genera las nueve señales, siempre que estén instaladas todas sus dependencias.

Los [generadores](generadores.md) trabajan fuera de Aegisub. Comprueba que la ejecución haya terminado sin errores antes de usar sus salidas.

## Cargar Aegisub {#open-the-project-in-aegisub}

Abre el ASS, el video y la pista vocal. Para usar los cortes detectados por SCXvid, carga `01_keyframes.log` como keyframes externos. Revisa el framerate o los timecodes si el video es VFR. Un keyframe del archivo codificado no siempre coincide con un cambio de plano.

![Menú de audio de Aegisub](../assets/post-images/22_imagen_embebida_1.png){ loading=lazy }

## Pegar las líneas a la voz {#find-the-speech-boundaries}

El [raw timing](../fundamentos/raw-timing.md) cubre el habla que representa cada línea. Puedes hacerlo a oído y vista, o probar **Voz bruta** en [Auto Timing](motor.md) sobre líneas ya situadas cerca de su diálogo. Revisa un tramo corto antes de ampliar la selección. Si hay dos voces simultáneas, determina cuál corresponde al texto: las señales no las separan por personaje.

[SubWave](web.md) permite ajustar el pegado en el navegador con el JSON, el ASS y el audio. El JSON dibuja la onda; para escuchar hace falta cargar también el sonido.

## Aplicar post-timing {#add-reading-time-and-scene-adjustments}

Con la voz revisada, añade márgenes, snap y cadenas. Elige **Post actual** de Auto Timing, **Kite Timing** o el TPP de Aegisub según el ajuste necesario. Sus valores y resultados pueden diferir. Si ya usaste **Completo + ajuste**, revisa lo aplicado antes de añadir otra pasada de márgenes.

Para ajustar a mano, conviene recorrer la escena desde el final: el inicio de la línea siguiente limita cuánto puede extenderse la anterior. Los controles se explican en [Postprocesado](postprocesado.md).

## Auditar y revisar en reproducción {#audit-then-watch}

Ejecuta la [auditoría](auditoria.md), corrige los errores y justifica las marcas que correspondan a decisiones válidas. Comprueba el formato después de dividir o unir. Termina viendo el episodio con la mezcla original: las voces separadas ayudan a medir, pero la revisión final necesita música, efectos y escena.
