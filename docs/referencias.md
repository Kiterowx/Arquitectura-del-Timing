---
hide:
  - toc
---

# Referencias

El método se apoya en documentación de herramientas, normas de la industria y trabajo
académico. Las fuentes se agrupan por lo que aportan.

## Herramientas y formato

La documentación de [Aegisub sobre timing contra audio](https://aegisub.org/docs/latest/timing/)
explica los marcadores de audio, el espectro y los atajos sobre los que se apoya el pegado
manual, y la de [trabajo con video](https://aegisub.org/docs/latest/video/) cubre la carga y
el uso de keyframes. Las guías de timing de Unanimated —[Basics of Timing in
Aegisub](https://unanimated.github.io/timing-basics.htm), [Timing in Aegisub Without Using
TPP](https://unanimated.github.io/timing-without-tpp.htm) y [Timing: Additional
Notes](https://unanimated.github.io/timing-notes.htm)— desarrollan rough timing,
post-timing, line linking, keyframe snapping y revisión fina. La especificación [WebVTT del
W3C](https://www.w3.org/TR/webvtt1/) define la idea de *cue* como texto asociado a un
intervalo temporal, base del modelo de línea. La familia histórica usada por Legacy se
puede consultar en [Lazytimer Pocket-sized](https://github.com/Kitherow/lazytimer-pocket-sized), y el
editor web de pegado sobre la onda comprimida, en
[SubWave](https://github.com/Kitherow/SubWave-Editor).

## Normas de lectura

Las guías de estilo de Netflix fijan referencias de la industria que esta metodología toma
como punto de partida: los [requisitos generales](https://partnerhelp.netflixstudios.com/hc/en-us/articles/215758617-Timed-Text-Style-Guide-General-Requirements)
establecen duración mínima y máxima y el límite de dos líneas, y la
[guía de inglés (EE. UU.)](https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977-English-USA-Timed-Text-Style-Guide)
concreta el límite de 42 caracteres por línea y la velocidad de lectura.

## Medición de señales

El filtro [silencedetect de FFmpeg](https://ffmpeg.org/ffmpeg-filters.html#silencedetect)
documenta el umbral y la duración mínima con que se detectan los silencios. Las funciones de
librosa para [fuerza de onset](https://librosa.org/doc/latest/generated/librosa.onset.onset_strength.html)
y [detección de onset](https://librosa.org/doc/latest/generated/librosa.onset.onset_detect.html)
describen el flux espectral y la detección de picos sobre la envolvente de ataques.

## Investigación

Tres trabajos sostienen las decisiones de fondo. [SubER (arXiv:2205.05805)](https://arxiv.org/abs/2205.05805)
evalúa texto, segmentación y timing de subtítulos de forma conjunta.
[«¿Es 42 la respuesta?» (arXiv:2006.01080)](https://arxiv.org/abs/2006.01080) estudia el
audio, la duración y las pausas como restricciones del *spotting*. Y
[«Window Size Versus Accuracy Experiments in Voice Activity Detectors» (arXiv:2601.17270)](https://arxiv.org/abs/2601.17270)
trata la detección de voz como un algoritmo que depende de la ventana y del modelo, lo que
justifica revisar sus candidatos con las demás señales.

## Sobre los valores

Las cifras de velocidad de lectura, duración, gaps y snap son puntos de revisión. La norma
de cada proyecto prevalece cuando define rangos más estrictos.
