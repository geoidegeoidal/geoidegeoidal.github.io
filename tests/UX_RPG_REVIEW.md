# Playable portfolio UX review · 2026-10-06

Supersedes the map portion of UX_EXPEDITION_REVIEW.md. The original five-pin implementation was rejected by the owner. Terminal behavior remains covered by expedition_check.cjs.

Evidence: real browser movement and dialogue; all five building entrances and exits; collision/path simulation; 320/390/768/1440 layout and axe; coarse mobile held controls; reduced motion; no JavaScript and failed image loading. Impeccable independent review requested atlas isolation, exhibit label placement and sprite grounding corrections.

`Applied` indicates a design constraint, not a measured behavioral outcome.

| Law | Status and evidence |
| --- | --- |
| Selective Attention | Applied: game occupies primary viewport; dialogue pauses movement. |
| Cognitive Load | Applied: one contextual interaction button, five thematic destinations. |
| Aesthetic-Usability Effect | Applied: original coastal pixel art; DOM contrast checked by axe. |
| Serial Position Effect | Applied: arrival guide establishes identity, notebook gives access to contact. |
| Goal-Gradient Effect | Applied: visited places shown without compulsory completion. |
| Von Restorff Effect | Applied: player's green jacket, contextual ground ring, distinct location silhouettes. |
| Zeigarnik Effect | Applied: current place/project carried in URL; no pressure to finish. |
| Flow | Applied: continuous walking, collision and click routing; dialogue deliberately pauses play. |
| Chunking | Applied: maps, environment, code, education and trajectory have buildings. |
| Working Memory | Applied: persistent controls/help and accessible notebook. |
| Occam's Razor | Applied: Canvas and native dialogs, no new production dependency. |
| Uniform Connectedness | Applied: walkable paths and river bridges connect buildings. |
| Fitts's Law | Applied: 44px DOM controls and 48px touch pad. |
| Hick's Law | Applied: three conversational choices; one nearby interaction at a time. |
| Jakob's Law | Applied: arrows/WASD, E, native links, Escape and modal focus behavior. |
| Law of Similarity | Applied: same drawing style, controls and room grammar. |
| Miller's Law | Applied: five groups and contextual project lists. |
| Parkinson's Law | Applied: notebook bypasses travel; no timers or mandatory quests. |
| Postel's Law | Applied: invalid URL IDs ignored, missing images retain readable content. |
| Law of Proximity | Applied: evidence links and limitations remain with each project. |
| Law of Prägnanz | Applied: minimal toolbar and full game surface; no permanent side panel. |
| Law of Common Region | Applied: focused conversations, room boundaries, reading index. |
| Tesler's Law | Applied: click routes use the same collision model as manual movement. |
| Mental Model | Applied: walls/water block, bridges cross, doors enter, bottom exit returns. |
| Active User Paradox | Applied: visible contextual controls; help available without prerequisites. |
| Pareto Principle | Applied: notebook exposes key work immediately; no analytics claim. |
| Peak-End Rule | Applied: recognizable owner avatar and direct contact; memorability not user-tested. |
| Cognitive Bias | Applied: fictional guides labeled; real project limits and attribution preserved. |
| Choice Overload | Applied: each room narrows the relevant portfolio material. |
| Doherty Threshold | Applied: local render and content updates; no remote dialogue latency. |

Limits: no physical-device/Safari or screen-reader listening session, no Core Web Vitals benchmark. The game uses a finite village and curated dialogue, not generative NPC conversation. Art loading is about 6MB before caching. Original personal photographs are not copied into the new game assets.

Final review: independent Impeccable reviewer disposition `ship`, scoped to scored fixes (sprite isolation, exhibit label, actor grounding, exit indicator). All four resolved. New token documentation kept separate from terminal/classic. Root/baseurl checker, terminal, browser, motion, art direction and responsive reading passed.

Production: Pages run 37539630455 success; merge 866ec1e. Corrected Jorge PNG hash matches local, live school interior and Bootcamp content/terminal checked without JavaScript errors.
