# Post-timing tools

Once the speech boundaries have been checked, add padding and adjust the cues to the picture and their neighbors. A batch pass handles repeated changes; individual tools handle the exceptions. The reasons for those decisions are covered in [post-timing fundamentals](../fundamentos/post-timing.md).

## Apply a batch pass

**Kite Timing** in Chrono Suite adds lead-in, lead-out, and chaining to the selection. Its defaults differ from Auto Timing's detection-and-polish pass:

| Kite Timing setting | Default |
| --- | ---: |
| Lead-in / maximum | 150 / 300 ms |
| Lead-out / maximum | 350 / 600 ms |
| Lead-out when chaining | 500 ms |
| Maximum chaining gap | 800 ms |

Apply it to cues already placed against the voice. Padding cannot repair a missed first syllable or a cue attached to the wrong speaker.

**Post current** in [Auto Timing](motor.md) applies Chrono's final pass to the current times. Aegisub's **Timing Post-Processor (TPP)** is another option. These tools have different policies and defaults. Choose the one that fits the episode and check existing padding before running another pass.

## Adjust one edge

Chrono's lead adjustments move the selected start or end by a fixed step, initially 100 ms. They also account for zero-gap chains: moving a start carries the previous chained end with it, and moving an end carries the next chained start. Across a positive gap, the moving edge stops when it reaches its neighbor.

Review both cues after a move. Preserving the chain does not guarantee that either cue still has the right reading time.

## Snap toward a cut

Directional snapping moves one edge to the previous or next keyframe within the configured distance. Use it after inspecting a warning such as `MISSED-START-KF` or `MISSED-END-KF`: the audit identifies a candidate, and the modifier makes the chosen adjustment.

`edge_snap_protect_ms` defaults to 250 ms and limits the directional search. It does not judge whether an edge is already correct. Check speech and reading before accepting the move.

**Bidirectional Snapping** finds the nearest keyframe for each selected start and end within its configured range, two frames by default. It suits small deviations around cuts that the cues should already meet.

A constant offset requires a timing shift. Growing drift calls for checking speed, edition, or timecodes. Local snapping does not calculate a 24-to-25 fps conversion or repair synchronization throughout an episode. See the [frame-duration table](../fundamentos/criterios.md#frames-and-milliseconds).

## Close a gap deliberately

**Chain Left** extends a cue's start to the previous cue's end. **Chain Right** extends its end to the following cue's start. Both leave a zero gap when the move falls within the configured maximum distance.

`SHORT-GAP` points to possible flicker; `LARGE-GAP` asks for a closer look at the separation. Neither means “chain automatically.” Keep an expressive pause even when a tool would allow closing it.

## Finish with the exceptions

After a batch pass, look for starts that need more reading time, exits that missed a useful cut, and gaps just outside the automatic chaining limit. Review the adjusted cue with its neighbors at normal speed, then run the [audit](auditoria.md) for anything left unresolved.
