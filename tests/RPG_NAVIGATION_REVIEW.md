# Laws of UX review

Scope: explorar.html, outside world, zoom, labels, atlas, active routes, interiors, keyboard/touch, widths 320/390/844/1440 and landscape 844×390. Primary goal: find and explore Jorge's work in the village. Sources: actual local build, browser interactions and final screenshots; no user study claimed.

## Findings

No unresolved findings in this refinement. Independent Impeccable review required two fixes: mobile route remained obscured by buildings (Working Memory/Flow), and landscape lost the port label (Proximity/Mental Model). Added minimap route/destination and alternative non-overlapping label placements. Reviewer verified both and returned **ship**, limited to those scored fixes, with no material regressions observed.

## Matrix

| Law | Status | Evidence or reason |
| --- | --- | --- |
| Selective Attention | applied | Nearby NPC names; landmark labels avoid controls and actors. |
| Cognitive Load | applied | Short destination names and one role, with all choices in a single atlas. |
| Aesthetic-Usability Effect | compliant | Existing pixel illustrations and lettering preserved; visual review fixes addressed real navigation issues. |
| Serial Position Effect | compliant | Enter is the welcome action; return/close remains explicit in atlas. |
| Goal-Gradient Effect | compliant | Existing visited count reflects real entries; no mandatory completion added. |
| Von Restorff Effect | applied | Active minimap destination is distinct from the player and other buildings. |
| Zeigarnik Effect | not applicable | This scope has no authored drafts or work to persist; reload starts a new walk. |
| Flow | applied | Quiet camera zone, continuous walking, manual takeover and pause. |
| Chunking | applied | Place and portfolio role grouped in each destination. |
| Working Memory | applied | Route banner, minimap path, current point and destination remain visible. |
| Occam's Razor | applied | Native buttons/dialog/Canvas and existing BFS; no new dependency or game engine. |
| Uniform Connectedness | applied | Numbered overview points correspond to destination buttons; route connects actual traversal. |
| Fitts's Law | compliant | Landmark and zoom controls ≥44 CSS px; touch controls preserved. |
| Hick's Law | applied | Only visible landmarks in play; all five choices on explicit overview. |
| Jakob's Law | compliant | WASD/arrows, E, M, plus/minus; native dialog Escape/Tab behavior. |
| Law of Similarity | compliant | Consistent landmark buttons, numeric atlas markers and paired zoom controls. |
| Miller's Law | compliant | Five meaningful destinations; no arbitrary new categories. |
| Parkinson's Law | applied | Direct notebook still avoids walking when the visitor wants immediate reading. |
| Postel's Law | compliant | Keyboard, ground click, building click and destination selection reuse validated world geometry. |
| Law of Proximity | applied | Labels follow buildings at stable text size; alternative placement retains landscape context. |
| Law of Prägnanz | applied | Brief rectangular labels, uncluttered scene and explicit route. |
| Law of Common Region | compliant | Camera controls and atlas choices form bounded, coherent groups. |
| Tesler's Law | applied | Pathfinding handles obstacles; cancellation/manual control remains available. |
| Mental Model | applied | Atlas selection walks to the real door then enters, with zoom changing only framing. |
| Active User Paradox | applied | Welcome invites action; footer and M shortcut support learning while walking. |
| Pareto Principle | applied | Focus on orientation, movement and content access requested by owner; no analytics-based frequency claim. |
| Peak-End Rule | compliant | Arrival enters the requested room; route clears and contextual interaction remains available. |
| Cognitive Bias | compliant | No urgency, fabricated achievement, tracking or forced exploration added. |
| Choice Overload | applied | Overview is optional; notebook and classic entry remain direct. |
| Doherty Threshold | applied | Route feedback synchronous, rendering via RAF, overview cached once, label dimensions measured on resize/font load. No measured latency SLA claimed. |

## Verification

- `node tests/rpg_logic.cjs`: passed movement/collision and all destinations.
- `node tests/rpg_check.cjs`: passed keyboard, touch, five interiors, dialogs, content, handoff, reduced motion, missing sprite/noJS, responsive and axe.
- `node tests/rpg_audio_check.cjs`: passed gesture/volume/mute/pause/hidden/error behavior.
- `node tests/rpg_navigation_check.cjs`: passed camera bounds/dead zone, zoom limits and click mapping, route arrivals across bridge and interiors, cancel/manual takeover, labels and atlas axe.
- `tests/check_site.py`: passed 10 pages and references.
- 200% rendering smoke: terminal input and RPG notebook reachable without horizontal page overflow.
- Final captures: desktop/mobile, landscape, atlas and active routes; independent scored corrections resolved 2/2.

Residual gaps: no physical mobile-device testing, screen-reader session or human usability study. Browser automation verifies focus/semantics and emulates touch; it does not establish subjective ease or guarantee smoothness on every GPU.

## Living-village refinement · 2026-10-06

Same 30-law matrix reviewed for the additional sound/motion scope. Resolved finding: hidden sound required multiple undisclosed actions (Cognitive Load, Active User Paradox, Working Memory). Welcome now offers explicit sound/silence and a persistent state/toggle. Native volume control and silent default page preserve user choice (Jakob, Cognitive Bias). Two visitors, contextual greetings, quiet coastal motion and audio interaction feedback strengthen Flow/Mental Model; pause, hidden and reduced-motion paths remain intentional. No new dependencies (Occam), no fabricated progress or achievements. Header fitted at 320/390 and horizontal; the optional motion carries the established RPG world.

Evidence: rpg_audio_check now measures actual waveform RMS>0.001, peak below clipping and zero-volume silence; checks both entry choices, pause/hidden, failure, real resident movement, visitor dialogue and reduced-motion freeze. rpg_logic checks dynamic blockers; rpg_navigation_check and rpg_check pass routes/interiors/input/axe. 200% and 10-page checker pass. Acoustic output is verified by graph signal, not a subjective listening study or a promise about the visitor's device speakers. Physical-device, screen-reader and user-study gaps remain as above.

Review closure: Impeccable ship limited to scored greeting/landmark collision and resulting mobile-label regression, both resolved. Code review accepted both fixes: Bruno spawn on walkable ground and silence winning after delayed resume. tests/rpg_audio_race.cjs passes mute/pause/hidden races; independent 180-second simulation kept both visitors moving on walkable ground. Screenshot evidence alone is not acoustic evidence.
