# Generate the analysis files

[Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts) prepares measurements for Auto Timing. Video supplies the scene cuts; a vocal WAV supplies the audio measurements. The batch files call the Python scripts in `scripts/`, so keep that folder when copying the tools.

The generators do not separate voices. If you still have the full mix, start with [vocal preparation](vocales.md).

## Requirements

| Task | Requirements |
| --- | --- |
| Run any batch file | Windows and 64-bit Python 3.10 or later, compatible with the selected packages. |
| Waveform JSON or RMS envelope | Python and FFmpeg; no additional Python packages. |
| Spectral features | Python, FFmpeg, and `requirements.txt` (NumPy). |
| Silence, VAD, and flux | FFmpeg and `requirements-vad.txt`, or `vadflux.exe` beside the batch files. |
| Keyframes | FFmpeg and the standalone SCXvid console executable. |
| Generate All | All the generation requirements above. |
| Package VADFlux | Optional `requirements-build.txt`, including PyInstaller. |
| Inspect streams and duration | FFprobe, supplied by common FFmpeg distributions. |

Get [FFmpeg](https://ffmpeg.org/download.html) and [SCXvid standalone](https://github.com/soyokaze/SCXvid-standalone/releases) from their project pages. Put `ffmpeg.exe` and `SCXvid.exe` beside the batch files or on PATH. SCXvid must accept YUV4MPEG input and write an XviD log; a VapourSynth plugin is not a substitute for that console program.

From the Chrono Generators folder in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements-vad.txt
```

For spectral features alone, install `requirements.txt` instead. Waveform and RMS generation need no extra packages. The batch files prefer `.venv` when it exists.

The VAD requirements include NumPy, PyTorch, torchaudio, librosa, SoundFile, and Numba. VADFlux runs on CPU and downloads Silero VAD through PyTorch Hub on first use, then reuses the cache. Installation and the first model download need internet access.

After installing `requirements-build.txt`, **Build VADFlux.bat** can package `scripts/vadflux.py`. The generators prefer that EXE when present and otherwise run the Python script. The EXE does not bundle the Silero model.

## Inputs and outputs

| Batch file | Input | Output | Used by |
| --- | --- | --- | --- |
| SCXvid Keyframes | `01.mkv` | `01_keyframes.log` | External keyframes in Aegisub. |
| Waveform JSON | `01.wav` | `01.waveform.json` | Lazy, optional Busy waveform, ChronoSplit, SubWave. |
| Silence Retimes | `01.wav` | `01_Retimes_30.txt`, `_40.txt`, `_50.txt`, `_vad.tsv`, `_flux.tsv` | Busy; Legacy uses the silence logs. |
| RMS Envelope | `01.wav` | `01_envelope.tsv` | Busy's envelope input. |
| Spectral Features | `01.wav` | `01_Retimes_spectrum.tsv` | Reference data for manual inspection. |
| Generate All | `01.mkv` or `01.wav`, with its partner available | All nine files above. | Combined preparation. |

Drag files onto a batch file or call it from the console. With no arguments it asks for **Start** and **End** and searches the console's current folder. It accepts unpadded and two-digit episode numbers, as well as three-digit episodes. Names are preserved: `1.wav` produces `1.waveform.json`; `01.wav` produces `01.waveform.json`. Avoid keeping both variants of one episode number in the same folder.

The exact aliases `01_vocals.wav` and `vocals_01.wav` produce outputs with base name `01`. Generate All requires the video and WAV to share that base; partial filename matches are not used.

Outputs go beside the media and replace same-named files after processing succeeds. When a processing tool fails, older outputs remain. Read the final status so you do not mistake an old file for a newly generated one.

## What the files measure

### Keyframes

SCXvid analyzes frames and writes an XviD log of candidate shot changes. Load it as external keyframes in Aegisub, then check the picture: the detector can miss cuts or flag flashes. Use the video's timecodes when mapping frames to times in variable frame rate material.

### Silence logs

FFmpeg prepares temporary mono 16 kHz audio, with an 80 Hz high-pass filter, an 8 kHz low-pass filter, and dynamic normalization. `silencedetect` then measures pauses of at least 30 ms at −30, −40, and −50 dB.

A quiet sound may count as silence at −30 dB while remaining above the −50 dB threshold. Compare the logs around whispers. They contain `silence_start` and `silence_end` times in seconds. Because the audio has been normalized, the thresholds do not describe the level of the original mix.

### VAD and flux

Silero estimates speech regions, exported as `start_ms` and `end_ms`. VADFlux uses a 0.4 threshold, an 80 ms minimum speech duration, and 30 ms pauses. It identifies neither words nor speakers.

librosa detects peaks in an onset envelope. The flux TSV contains `time_ms`, `type`, and `score`; this generator writes **onset** events. Speech endings require other evidence. Musical attacks can also create peaks. The analysis hop is 10 ms, and a detected peak is an estimate rather than an exact consonant boundary.

### Spectral features

This uses the same prepared audio, 32 ms windows, and 10 ms hops. It measures band energy, RMS, peak level, zero crossings, centroid, flatness, and flux. `speech_p` combines these features in a heuristic score whose values have no calibration as speech probabilities. It is useful for inspecting uncertain passages; Auto Timing has no field for this TSV.

### RMS envelope

FFmpeg measures RMS per decoded audio block from the vocal WAV, without the normalization above. Block duration depends on decoding and is unrelated to the video's frames. Despite the `.tsv` extension, this legacy format has two **comma-separated** columns with no header: seconds and RMS dB. Digital silence can appear as `-inf`.

### Waveform JSON

The WAV is decoded to mono, 48 kHz, 16-bit audio. Each base point stores the minimum and maximum of 48 samples, or 1 ms. Higher levels combine points for different zoom scales. The JSON contains no playable audio or recognized words. See the [format and editor notes](web.md).

## Compare evidence against the audio

A VAD region near a flux onset and an RMS rise is a useful place to inspect. Agreement does not prove that the sound belongs to the cue's speaker: all these measurements come from the same recording and may share errors.

If RMS continues past VAD, listen for a remaining syllable, reverberation, or a breath. The dialogue represented by the subtitle decides the boundary. Continue with [Auto Timing](motor.md) to load the files.
