# Glossary

A **cue** is one timed subtitle event; a **line** is one displayed row of text. Aegisub also calls its event rows “lines,” so the tool descriptions sometimes use that label.

## Cues and boundaries

Start / end
: The moments when a cue appears and disappears.

Duration
: The time between its start and end.

Gap
: Empty time between one cue's end and the next cue's start.

Overlap
: Two cues visible at once. This can be intentional for simultaneous dialogue.

Neighboring cues
: The preceding and following cues whose timing limits an adjustment.

## Workflow

Raw timing
: Placing both edges against the speech before adding padding or scene adjustments.

Post-timing
: Adding padding, snapping to cuts, and chaining neighboring cues.

Proofwatch
: Watching the completed episode from start to finish as a viewer would.

Retiming
: Adjusting timing that already exists.

Segmentation
: Dividing dialogue into cues with coherent meaning, speech, and reading load.

## Boundary adjustments

Lead-in
: Padding before the voice starts, giving the eye time to find the text.

Lead-out / hold
: Time after the voice ends, allowing the reader to finish.

Snap
: Moving a boundary to a nearby scene keyframe.

Chain
: Closing the gap between consecutive cues.

Edge protection
: A setting name to read carefully. In Chrono's directional tools, `edge_snap_protect_ms` limits search distance; it does not judge whether an edge is correct.

## Symptoms

Bleed
: Text lingering over a shot it no longer belongs to.

Overstay
: A cue remaining after both the speech and the reading have finished.

Flicker
: A distracting flash of empty screen between cues.

Overtime
: A duration above the chosen review threshold.

## Audio and analysis files

Vocals / vocal stem
: Voice separated from a full mix. It may contain several speakers, singing, and residual noise. It must remain synchronized with the video.

VAD
: Voice activity detection: regions likely to contain speech.

Flux
: A measure of spectral change, useful for finding attacks. VADFlux exports onset times rather than speech-end events.

Envelope
: An amplitude or energy contour. The generators' envelope TSV uses RMS; the waveform JSON supplies min/max peaks.

Spectral features
: Measurements of energy and texture across frequency bands. They help inspect ambiguous passages but do not identify a speaker.

Waveform JSON
: A min/max waveform stored at several resolutions for display and detection.

Keyframe
: A key frame in encoded video, or an external marker used as a candidate scene cut. Verify it against the picture before snapping.

## Reading and picture

CPS
: Characters per second. The counting convention must be stated before comparing values.

Rebreak
: Moving a displayed line break without necessarily changing cue timing.

Frame timing
: Placing boundaries by video frames, particularly for signs and other visual elements.

Dramatic pause
: A silence with a narrative purpose that may need to remain visible as a gap.
