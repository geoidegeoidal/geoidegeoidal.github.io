# Laws of UX review

Scope: explorar.html, terminal.html, shared notebook, homepage entry; 320/390/768/1440px, keyboard, mouse, touch-size controls, 200% CSS zoom, reduced motion and no-JS.

## Findings

| Severity | Law | Evidence and impact | Location | Smallest correction |
| --- | --- | --- | --- | --- |
| high, resolved | Aesthetic-Usability Effect | Inherited nav colors were dark on dark desktop header | expedition.css | Scope nav foreground to expedition palette |
| medium, resolved | Fitts's Law / Mental Model | Notebook project replacement could lose keyboard focus in terminal | expedition.js | Restore focus only for notebook-origin actions; regression assertion |
| medium, resolved | Chunking | Categories and poetic headings competed with destination identification | expedition.html | Destination is h2; narrative/category follows heading |
| medium, resolved | Law of Prägnanz | Shared nav overflowed under 200% CSS zoom | expedition.css | Permit header and nav wrapping |

## Matrix

Status `applied` means a design constraint was used, not an empirical claim about visitor behavior.

| Law | Status | Evidence or reason not applicable |
| --- | --- | --- |
| Selective Attention | applied | Illustrated world / console leads; notebook secondary |
| Cognitive Load | applied | Five destinations; explicit commands and suggestions |
| Aesthetic-Usability Effect | applied | Original coherent pixel world; contrast checked with axe |
| Serial Position Effect | applied | Immediate profile and destination discovery; persistent contact |
| Goal-Gradient Effect | not applicable | No mandatory staged task or completion goal |
| Von Restorff Effect | applied | Copper selected mode and place |
| Zeigarnik Effect | applied | Current destination/project survives URL transitions; no nudges |
| Flow | applied | Direct travel and finite commands; no blocking quests |
| Chunking | applied | Destinations partition evidence; headings name actual locations |
| Working Memory | applied | Suggestions, place index and terminal history |
| Occam's Razor | applied | Existing Jekyll/catalog; no game engine or network shell |
| Uniform Connectedness | applied | Paths connect world locations; shared notebook context |
| Fitts's Law | compliant | New buttons/mode links tested >=44px at four widths |
| Hick's Law | applied | Three views; only five initial destinations |
| Jakob's Law | applied | Native links, buttons, details and conventional terminal keys |
| Law of Similarity | applied | Consistent copper selection, same destination controls |
| Miller's Law | applied | Five thematic groups rather than unstructured CV wall |
| Parkinson's Law | applied | No fake loading, timer or forced travel wait |
| Postel's Law | compliant | Case, accents and whitespace normalized; unknown input recovered |
| Law of Proximity | applied | Project links and limitations stay with their evidence |
| Law of Prägnanz | applied | One world plus one notebook; wrapping at zoom verified |
| Law of Common Region | applied | Console boundary and notebook surface separate tasks |
| Tesler's Law | applied | View links carry selection without user re-entry |
| Mental Model | compliant | Keyboard focus restoration checked; commands do not execute programs |
| Active User Paradox | applied | Immediate clickable examples, no manual prerequisite |
| Pareto Principle | applied | Projects, trajectory and formation available directly; not analytics-derived |
| Peak-End Rule | applied | World encounter and visible contact; memorability not user-tested |
| Cognitive Bias | compliant | Fictional world labelled, project limits retained, no invented claims |
| Choice Overload | applied | Destination context narrows project choices |
| Doherty Threshold | applied | Local synchronous content updates; no benchmark claimed |

## Verification

- `node tests/expedition_check.cjs`: passed, including axe on both routes at 390/1440, state, commands, unsafe text, history, keyboard, focus, pause, reduced-motion, 200% zoom and fallback checks.
- Jekyll root and `/portfolio` builds plus `tests/check_site.py`: passed, 10 pages, assets and internal links.
- Impeccable detector on new routes/CSS/JS: no findings. Run once.
- Visual: all four desktop/mobile captures inspected. Independent Impeccable reviewer requested two fixes and then scored both resolved (`ship`, verdict limited to those fixes).

Residual gaps: no screen-reader listening session, physical touch-device or Safari verification; no measured Core Web Vitals or user-study claims. Generated map PNG is 3.37 MB and only loaded on new views or lazily in homepage entry. Keyboard exploration follows five destinations, not unrestricted movement. Console supports curated commands, not a general shell or AI chat.
