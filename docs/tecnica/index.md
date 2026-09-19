# Tools and workflow

These tools prepare audio, generate measurements, and adjust subtitles. You can start with manual timing in Aegisub and add automation where it saves repetitive work.

| Task | Tool | Where it runs |
| --- | --- | --- |
| Separate voices from music and effects. | UVR, Demucs, or Audio Separator | Outside Aegisub. |
| Generate waveform and analysis files. | Chrono Generators | Windows batch files and Python. |
| Adjust selected subtitle events. | Chrono Suite | Aegisub Automation. |
| Edit timing against a waveform. | SubWave | In the browser. |

Start with [the episode workflow](flujo.md), or go directly to the step you need:

1. [Prepare the vocals](vocales.md): choose the right audio track, separate it, and check synchronization.
2. [Generate analysis files](generadores.md): install the requirements for the files you will use.
3. [Run Auto Timing](motor.md): choose Lazy, Busy, or Legacy and load the matching files.
4. [Apply post-timing](postprocesado.md): add padding, chain cues, and adjust edges to cuts.
5. [Audit the result](auditoria.md): resolve warnings and watch the episode.

Lazy needs a waveform JSON and does not require VAD models. Busy and Legacy need the `kite.Timing` module. See the [requirements table](generadores.md#requirements) before installing dependencies you may not need.

For text changes, see [splitting and joining cues](division-lineas.md). For the calculations behind detection, see [algorithm notes](../algoritmos/index.md).
