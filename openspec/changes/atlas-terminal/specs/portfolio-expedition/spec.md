## Purpose

Permitir descubrir la trayectoria, cartografías, proyectos y formación de Jorge Ulloa mediante un mapa de fantasía o una consola, con acceso igualmente directo a la evidencia profesional.

## ADDED Requirements

### Requirement: Two connected experiences
The portfolio SHALL expose map and terminal routes and retain the classic route. Switching experiences SHALL preserve valid place and project selection.

#### Scenario: Shared project
- **WHEN** a visitor selects Azimut and switches between map and terminal
- **THEN** Azimut and its workshop destination remain selected and can be opened from the destination URL.

#### Scenario: Invalid URL
- **WHEN** unknown or malformed selection parameters are supplied
- **THEN** the interface recovers to a valid destination without executing input or failing.

### Requirement: Accessible world exploration
The map SHALL provide five destinations, an avatar that can travel between them, and direct controls usable by keyboard and touch without mandatory gameplay.

#### Scenario: Direct access
- **WHEN** a visitor chooses a destination from the map or destination list
- **THEN** the corresponding verified content and working links appear without completing a quest.

#### Scenario: Reduced movement
- **WHEN** reduced motion or the site's pause control is enabled
- **THEN** travel is immediate and decorative movement stops.

### Requirement: Safe discoverable console
The console SHALL provide visible command examples, project discovery, profile, trajectory, skills, contact, history, completion and clear recovery from unknown commands. Commands SHALL operate only on local curated content.

#### Scenario: Project command
- **WHEN** the visitor enters `abrir azimut` or activates the matching suggestion
- **THEN** the console shows Azimut's real summary, technology, links and limitations.

#### Scenario: Unknown or unsafe input
- **WHEN** an unknown command or HTML-like input is submitted
- **THEN** the input remains plain text and a helpful error offers supported commands.

### Requirement: Truthful content and resilient delivery
Project evidence SHALL come from the existing catalog, preserve status and limitations, and distinguish fictional landscape from real professional work. Classic content SHALL remain available without JavaScript.

#### Scenario: Experimental project
- **WHEN** AutoAtlas Pro is opened
- **THEN** its experimental status and repository link remain visible.

#### Scenario: Scripts unavailable
- **WHEN** JavaScript is disabled or the map image fails
- **THEN** the visitor can still access a readable destination index and the classic portfolio.

### Requirement: Responsive accessible interface
The experiences SHALL support 320px mobile widths, desktop, 200 percent zoom, visible keyboard focus, named controls, adequate contrast and feedback announced without stealing focus.

#### Scenario: Mobile navigation
- **WHEN** a visitor uses either experience at 320px width
- **THEN** content and actions remain readable without page-level horizontal overflow.
