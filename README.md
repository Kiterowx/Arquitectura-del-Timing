# Guía de Timing de Subtítulos

Sitio MkDocs Material sobre timing de subtítulos: criterio de decisión de bordes y
fase técnica con la suite Chrono Suite y los generadores de señales.

Este repositorio contiene solo la documentación. Las herramientas que describe
—[Chrono Suite](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md),
el módulo de cronometraje y [Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts)—
se distribuyen aparte e instalan en el editor y junto al material de trabajo.

## Estructura

```text
repo/
├── mkdocs.yml
├── requirements.txt
├── docs/
│   ├── index.md
│   ├── fundamentos/
│   ├── tecnica/
│   ├── referencias.md
│   ├── stylesheets/extra.css
│   └── assets/
│       ├── ejemplos/
│       └── post-images/
```

## Herramientas que documenta

- **Aegisub** con la suite **Chrono Suite** para editar, cronometrar y auditar.
- **[FFmpeg y FFprobe](https://ffmpeg.org/download.html)** en el PATH, para audio, silencios y energía RMS.
- **SCXvid** para los keyframes de escena.
- **vadflux.exe** para la detección de voz y el flux. Se construye con `Build VADFlux.bat` dentro de la carpeta de generadores.
- **Python** con NumPy para `Features Espectrales.bat`, `Waveform JSON.bat` y `Procesar Todo.bat`; para compilar `vadflux.exe` también hacen falta PyInstaller, torch, torchaudio, librosa, soundfile y numba.
- **[UVR](https://github.com/Anjok07/ultimatevocalremovergui)** (Ultimate Vocal Remover) para separar la voz en una pista propia antes de generar señales de diálogo.
