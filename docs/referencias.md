---
hide:
  - toc
---

# References

Documentation for the tools and analysis methods used throughout the guide. The proposed working ranges are identified separately in [reading speed and timing limits](fundamentos/criterios.md).

## Timing tools

- [Aegisub audio timing](https://aegisub.org/docs/latest/timing/): marking and listening to intervals.
- [Aegisub video documentation](https://aegisub.org/docs/latest/video/): video, external keyframes, and timecodes.
- [Chrono Suite documentation](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md) and [kite.Timing source](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Modules/kite/Timing.lua): controls and implementation.
- [Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts): installation, code, and analysis formats.
- [SCXvid standalone releases](https://github.com/soyokaze/SCXvid-standalone/releases): the console executable used by the keyframe generator.
- [Lazytimer Pocket-sized](https://github.com/Kiterowx/lazytimer-pocket-sized): the method behind Legacy.
- [SubWave](https://github.com/Kiterowx/SubWave-Editor): waveform-based subtitle editing.
- Unanimated's [timing basics](https://unanimated.github.io/timing-basics.htm), [timing without TPP](https://unanimated.github.io/timing-without-tpp.htm), and [additional timing notes](https://unanimated.github.io/timing-notes.htm).

## Audio extraction and vocal separation

- [FFmpeg stream selection](https://ffmpeg.org/ffmpeg.html#Stream-selection): choosing an audio track with `-map`.
- [Ultimate Vocal Remover](https://github.com/Anjok07/ultimatevocalremovergui): desktop application and installer requirements.
- [Demucs](https://github.com/facebookresearch/demucs): command-line separation, vocals output, and the limits of two-stem mode. The archived original repository points to its author's fork.
- [Audio Separator](https://github.com/nomadkaraoke/python-audio-separator): installation, model catalog, and selection.

## Measurements

- [Silero VAD](https://github.com/snakers4/silero-vad): voice activity detection.
- FFmpeg's [silencedetect](https://ffmpeg.org/ffmpeg-filters.html#silencedetect) and [astats](https://ffmpeg.org/ffmpeg-filters.html#astats): silence intervals and RMS measurements.
- librosa's [onset_strength](https://librosa.org/doc/latest/generated/librosa.onset.onset_strength.html) and [onset_detect](https://librosa.org/doc/latest/generated/librosa.onset.onset_detect.html): onset envelopes and detected peaks.

## Subtitle formats {#delivery-specifications}

The [WebVTT specification](https://www.w3.org/TR/webvtt1/) describes how that format represents timed cues. Use it when inspecting a VTT file or a conversion. ASS has its own styling and event structure; check which features survive when moving between formats.

## Related research

- [SubER: A Metric for Automatic Evaluation of Subtitle Quality](https://arxiv.org/abs/2205.05805): evaluating text, segmentation, and timing together.
- [Is 42 the Answer to Everything in Subtitling-oriented Speech Translation?](https://arxiv.org/abs/2006.01080): subtitle constraints in speech translation.
- [Window Size Versus Accuracy Experiments in Voice Activity Detectors](https://arxiv.org/abs/2601.17270): the effect of analysis windows on VAD performance.

These papers provide evaluation context. They do not validate Busy's weights or the particular thresholds in Chrono Suite.
