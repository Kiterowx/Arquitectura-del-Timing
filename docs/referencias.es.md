---
hide:
  - toc
---

# Referencias {#references}

Documentación de las herramientas y los métodos de análisis usados a lo largo de la guía. Los márgenes de trabajo propuestos se explican por separado en [Criterios cuantitativos](fundamentos/criterios.md).

## Herramientas de timing {#timing-tools}

- [Aegisub: timing contra audio](https://aegisub.org/docs/latest/timing/), para marcar y escuchar intervalos.
- [Aegisub: video, keyframes y timecodes](https://aegisub.org/docs/latest/video/), para distinguir fotogramas clave, datos externos y video de frecuencia variable.
- [Chrono Suite](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/docs/es/ChronoSuite.md) y [código de kite.Timing](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Modules/kite/Timing.lua), referencia de los controles y la implementación descritos en esta guía.
- [Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts), para instalación, código y formatos de señales.
- [SCXvid standalone](https://github.com/soyokaze/SCXvid-standalone/releases), ejecutable de consola para generar los logs de cambios de plano.
- [Lazytimer Pocket-sized](https://github.com/Kiterowx/lazytimer-pocket-sized), antecedente de la ruta Legacy.
- [SubWave](https://github.com/Kiterowx/SubWave-Editor), editor sobre la onda JSON.
- Las guías de Unanimated: [Timing básico](https://unanimated.github.io/timing-basics.htm), [Timing sin TPP](https://unanimated.github.io/timing-without-tpp.htm) y [Notas adicionales](https://unanimated.github.io/timing-notes.htm).

## Extracción y separación de voces {#audio-extraction-and-vocal-separation}

- [FFmpeg: selección de streams](https://ffmpeg.org/ffmpeg.html#Stream-selection), para elegir la pista de audio con `-map`.
- [Ultimate Vocal Remover](https://github.com/Anjok07/ultimatevocalremovergui), aplicación de escritorio y requisitos de sus instaladores.
- [Demucs](https://github.com/facebookresearch/demucs), separación por consola, salida `vocals` y límites de la opción `--two-stems`. El repositorio original está archivado y remite al fork de su autor.
- [Audio Separator](https://github.com/nomadkaraoke/python-audio-separator), instalación, catálogo y selección de modelos.

## Medición {#measurements}

- [Silero VAD](https://github.com/snakers4/silero-vad), modelo de actividad de voz.
- [FFmpeg: silencedetect](https://ffmpeg.org/ffmpeg-filters.html#silencedetect) y [astats](https://ffmpeg.org/ffmpeg-filters.html#astats), para silencios y RMS.
- librosa: [onset_strength](https://librosa.org/doc/latest/generated/librosa.onset.onset_strength.html) y [onset_detect](https://librosa.org/doc/latest/generated/librosa.onset.onset_detect.html), para la envolvente de ataques y sus picos.

## Formatos de subtítulos {#delivery-specifications}

La [especificación WebVTT](https://www.w3.org/TR/webvtt1/) describe cómo representa ese formato los eventos temporizados. Sirve para inspeccionar un VTT o una conversión. ASS tiene sus propios estilos y estructura de eventos; al cambiar de formato, comprueba qué elementos se conservan.

## Investigación relacionada {#related-research}

- [SubER: A Metric for Automatic Evaluation of Subtitle Quality](https://arxiv.org/abs/2205.05805) estudia una evaluación conjunta de texto, segmentación y timing.
- [Is 42 the Answer to Everything in Subtitling-oriented Speech Translation?](https://arxiv.org/abs/2006.01080) examina restricciones de subtitulado en traducción del habla.
- [Window Size Versus Accuracy Experiments in Voice Activity Detectors](https://arxiv.org/abs/2601.17270) compara el efecto de las ventanas sobre detectores VAD.

Estos trabajos aportan contexto de evaluación. No validan los pesos de Busy ni los umbrales particulares de Chrono Suite.
