# Audit the timing

Chrono's audit writes markers into **Effect** to identify cues worth inspecting. A marker reports a condition measured against a setting. Review it to determine whether it calls for a correction or reflects a deliberate timing choice.

## Choose the scope

Limit the pass to the selection or filter by style, actor, **Effect**, or layer. For example, check reading speed on dialogue while excluding signs. Empty review dropdowns skip their sections; single-marker mode runs its chosen check instead of the selected preset.

Start with a scene whose timing has been checked, confirm the active thresholds, and then expand the scope. The [reading criteria](../fundamentos/criterios.md) explain how the guide's suggested ranges differ from the macro defaults.

## Timing and reading markers

| Marker | Condition to inspect | Possible response |
| --- | --- | --- |
| `TOO-SHORT` | Duration below the configured minimum. | Add time if possible; check for a flash. |
| `TOO-LONG`, `TOO-LONG-TIME` | Duration above a configured limit. | Trim an unnecessary hold or split naturally. |
| `ZERO-LENGTH` | Start and end coincide. | Restore a visible interval. |
| `FAST-CPS` | Reading speed above the selected maximum. | Extend, split, or condense while preserving meaning. |
| `SLOW-CPS` | Reading speed below the selected threshold. | Check for a hold that outlasts its purpose. |
| `SHORT-GAP`, `LARGE-GAP` | Separation outside the chosen gap range. | Listen for a real pause before chaining or moving. |
| `OVERLAP` | Events visible at the same time. | Preserve simultaneous dialogue; fix accidental overlap. |

The duration and overtime checks have separate thresholds. When checking both gap directions, the measured separation is recorded on both adjacent cues.

## Keyframe markers

**On-keyframe** checks can stamp `START-ON-KF` or `END-ON-KF`. **Twin** checks find neighboring edges associated with the same keyframe within their tolerance. **Miss** checks find an available nearby keyframe that an edge did not use, marked `MISSED-START-KF` or `MISSED-END-KF`. `NEAR-START-KF` and `NEAR-END-KF` identify edges near a cut for inspection.

Start-only or end-only passes focus the review on one side at a time. Search direction controls whether previous, following, or both sets of keyframes are considered. Other options can ignore gaps already explained by a cut, include zero-length gaps, or clear previous markers before writing new ones.

Inspect the picture before snapping. An available keyframe may be the wrong choice for the speech or the reading time.

## Text and segmentation markers

`NO-END-PUNCT` and `FINAL-COMMA` flag possible unfinished units. Read the cue with its neighbors before changing punctuation or joining anything. A continuing sentence can be a deliberate segmentation choice.

## Resolve the findings

Suppose an audit marks three overlaps. Listening shows that two are simultaneous speakers, while the third comes from an overextended lead-out. The third needs correction; the other two preserve the simultaneous dialogue. Their remaining warnings record overlaps that have been reviewed and deliberately retained.

Before the proofwatch, check that:

- The video, audio, and subtitle use the same timeline and edition.
- First and last syllables are covered; long holds have a reason.
- Nearby cuts have been used or rejected deliberately.
- Short gaps, overlaps, and fast cues have been inspected with their neighbors.
- Splits and joins preserve meaning, speaker changes, and ASS formatting.

Finish with the original mix at normal playback speed. A vocal stem and a clean marker list cannot show everything the viewer will experience.
