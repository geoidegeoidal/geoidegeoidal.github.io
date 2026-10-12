## ADDED Requirements
### Requirement: Classic home and one alternative
The site SHALL keep the classic portfolio at the root and advertise only the terminal as an alternative.
#### Scenario: Visitor chooses another way to read
- **WHEN** the visitor reaches the invitation after the hero
- **THEN** one terminal link is available and no RPG image, link or command is advertised
### Requirement: Legacy route continuity
The retired route SHALL lead to the terminal without loading game assets.
#### Scenario: Shared project link
- **WHEN** a visitor opens explorar.html with a selected project
- **THEN** the terminal opens with the query preserved and validates it using its existing logic
#### Scenario: JavaScript unavailable
- **WHEN** JavaScript is disabled
- **THEN** accessible links to the terminal and classic portfolio remain available
### Requirement: Retired game assets
The build SHALL omit exclusive RPG runtime, styles, sprites and font while preserving terminal evidence and commands.
#### Scenario: Site is built
- **WHEN** Jekyll generates the site
- **THEN** no RPG runtime or sprites are published and explorar.html is excluded from the sitemap
