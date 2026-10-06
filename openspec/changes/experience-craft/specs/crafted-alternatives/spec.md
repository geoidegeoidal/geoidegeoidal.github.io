## ADDED Requirements
### Requirement: Classic homepage
The home route SHALL display the classic portfolio and offer the alternatives through a personal invitation without redirecting visitors.
#### Scenario: First visit
- **WHEN** a visitor opens the home route
- **THEN** the classic portfolio hero SHALL remain first and the RPG and terminal links SHALL be optional

### Requirement: Readable RPG evidence
The RPG SHALL present real content with themed illustrated reading views and distinct pixel-art interiors while retaining all original facts and limitations.
#### Scenario: Inspect project
- **WHEN** a visitor inspects a room exhibit or project
- **THEN** its purpose, implementation, limits and evidence links SHALL be readable with keyboard and touch controls

### Requirement: Controllable music
The RPG SHALL offer original music that starts only after explicit activation, with mute and volume controls.
#### Scenario: Pause or hide
- **WHEN** the visitor pauses the game, disables music or hides the tab
- **THEN** music SHALL suspend and SHALL NOT resume on hidden-tab return without the required play state

### Requirement: Familiar terminal navigation
The console SHALL expose a bounded local file tree and support pwd, ls, cd, cat, tree, help and the existing Spanish content aliases.
#### Scenario: Browse a project file
- **WHEN** a visitor changes to the project directory and reads a valid project file
- **THEN** the prompt SHALL show the current directory and output SHALL contain the real project details and limits
#### Scenario: Invalid input
- **WHEN** an unknown command, path or HTML-like input is entered
- **THEN** the terminal SHALL display safe text and actionable recovery without executing code or making shell/network calls

### Requirement: Command discovery and editing
The console SHALL offer contextual clickable command suggestions, completion, history, Ctrl+L and Ctrl+C without trapping ordinary Tab navigation.
#### Scenario: New visitor
- **WHEN** a visitor has not used a terminal before
- **THEN** an explicit first command and contextual next actions SHALL make navigation discoverable

### Requirement: Motion and access
Both alternatives SHALL preserve reduced-motion behavior, visible motion controls, responsive reading and no-JavaScript links to the classic portfolio.
#### Scenario: Reduced motion
- **WHEN** reduced motion is requested
- **THEN** ambient animation and staged text reveals SHALL be removed without withholding content
