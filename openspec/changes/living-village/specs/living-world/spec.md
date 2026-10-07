## ADDED Requirements
### Requirement: Discoverable intentional sound
The RPG SHALL offer explicit entry with music and entry without sound, and a visible mute control. Audio SHALL begin only after an audio-authorizing gesture and remain silent if that choice is declined. The original score SHALL include a coastal ambience layer outdoors, a quieter interior mix and short interaction cues. One audio context SHALL be reused; volume zero, mute, pause and hidden state SHALL stop audible output, and failures SHALL leave the game usable with honest status.
#### Scenario: Choose musical entry
- **WHEN** the visitor presses Entrar con música
- **THEN** the game starts and nonzero audio output is produced with a visible mute option
#### Scenario: Choose silence
- **WHEN** the visitor presses Entrar sin sonido
- **THEN** no audio context is created until they explicitly enable sound
#### Scenario: Pause or leave the tab
- **WHEN** the game pauses or document is hidden
- **THEN** audio scheduling and ambient motion stop and resume only through appropriate controls
### Requirement: Inhabited village
The village SHALL include animated fictional visitors moving through reachable routes, brief contextual greetings from guides, and bounded coastal environmental motion. Pedestrians SHALL respect collision geometry and yield by stopping near Jorge; they SHALL remain interactable. Automatic portfolio routes SHALL recover from a moving obstruction. Reduced-motion mode SHALL preserve all content and interactions with ambient movement stopped.
#### Scenario: Observe the village
- **WHEN** the visitor starts and stands still with ordinary motion preferences
- **THEN** nearby environment and at least one resident visibly change over time
#### Scenario: Talk to a visitor
- **WHEN** Jorge approaches a roaming visitor
- **THEN** the visitor stops and offers a short clearly fictional conversation
#### Scenario: Prefer reduced motion
- **WHEN** reduced motion is enabled
- **THEN** ambient animation and roaming cease while manual movement, atlas and evidence remain usable
