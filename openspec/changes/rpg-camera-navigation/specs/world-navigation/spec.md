## ADDED Requirements
### Requirement: Wider controlled camera
The game SHALL start with a wider camera than the former 1.7 desktop/1.45 mobile scales and provide bounded accessible zoom controls.
#### Scenario: Change zoom
- **WHEN** a visitor changes exterior zoom
- **THEN** the player position SHALL remain unchanged, click coordinates SHALL match the rendered world and labels SHALL remain screen-sized
### Requirement: Stable camera follow
The camera SHALL allow small player movements without recentering and SHALL respect reduced motion and pause.
#### Scenario: Follow player
- **WHEN** the player leaves the camera dead zone
- **THEN** the camera SHALL follow within world bounds and keep the player visible
### Requirement: Legible landmarks
Landmark labels SHALL be short, keyboard-operable and kept within the usable viewport; NPC names SHALL be contextual.
#### Scenario: Mobile navigation
- **WHEN** a landmark label cannot fit without collision with controls or another label
- **THEN** it SHALL be omitted from the world overlay and remain available in the village overview
### Requirement: Guided walking
The overview SHALL show all five real destinations and allow a visitor to select one for walking using the existing collision model.
#### Scenario: Choose destination
- **WHEN** the visitor selects a destination
- **THEN** Jorge SHALL walk its route and enter the selected building without teleportation
#### Scenario: Cancel travel
- **WHEN** the visitor cancels or uses manual movement
- **THEN** automated travel SHALL stop and manual play SHALL remain available
