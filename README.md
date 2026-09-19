# Subtitle Timing Guide

A guide to subtitle timing: locate the speech, adjust reading time, align with scene cuts, and manage transitions between cues. It includes worked examples and a workflow with Aegisub, Chrono Suite, and Chrono Generators.

**[Read the guide](https://kiterowx.github.io/Arquitectura-del-Timing/)**

## Find your starting point

- [Timing fundamentals](docs/fundamentos/index.md): segmentation, speech, reading, and scene changes.
- [Prepare a vocal track](docs/tecnica/vocales.md): extract audio and separate vocals with UVR, Demucs, or Audio Separator.
- [Signal generators](docs/tecnica/generadores.md): requirements, inputs, outputs, and file formats.
- [Auto Timing](docs/tecnica/motor.md): load the right files for Lazy, Busy, or Legacy.
- [An episode from start to finish](docs/tecnica/flujo.md): preparation through final playback.
- [How the algorithms work](docs/algoritmos/index.md): calculations and limits.

This repository contains the guide. The tools are maintained separately in [Kite Aegisub Scripts](https://github.com/Kiterowx/Kite-Aegisub-Scripts) and [Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts).

## Build the site

To edit and preview the guide, use Python 3.11 and the packages in [requirements.txt](requirements.txt). From this folder in PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m mkdocs serve
```

Open the local address printed by MkDocs. To build the site with strict checks:

```powershell
.\.venv\Scripts\python.exe -m mkdocs build --strict
```

Pages live in `docs/`, navigation in `mkdocs.yml`, and example media in `docs/assets/`. The generated `site/` directory is not versioned. GitHub Actions publishes pushes to `main` or `master` only after the strict build succeeds.

Reading or building the guide requires no audio tools or voice models. To generate signals and time an episode, use the [requirements by task](docs/tecnica/generadores.md#requirements).

The guide is available in **English** and **Español**. Use the language selector in the header to keep the current page and section when switching. English stays at the existing URLs; Spanish lives under `/es/`.

Each page has an English `.md` source and a Spanish `.es.md` counterpart. Both editions use the same section identifiers and example media. Update the pair when changing an explanation; write each example naturally in its language and recalculate any character counts. Original screenshots and videos retain their recorded interface, Japanese audio, and Spanish subtitles. The English captions provide equivalent dialogue and explain what to inspect.
