## Purpose
Permitir explorar físicamente el portafolio de Jorge Ulloa en un mundo RPG luminoso, conversando con personajes y entrando a edificios con evidencia profesional.

## ADDED Requirements

### Requirement: Continuous movement and collision
The player SHALL walk freely with directional keys, held touch controls and reachable click destinations. Walls, trees and water SHALL block movement; bridges SHALL connect both banks. The camera SHALL follow the player rather than jump between predefined stops.
#### Scenario: Real movement
- **WHEN** a direction is held
- **THEN** position changes continuously, walking frames advance and the camera follows until the input is released or an obstacle is reached.
#### Scenario: Reachable world
- **WHEN** a visitor walks from the port to any of the five buildings
- **THEN** a traversable route exists without crossing blocked water or walls.

### Requirement: NPC conversations and real portfolio content
The world SHALL contain distinct NPCs who respond to proximity interaction, offer conversation choices and lead to truthful project, career or teaching content.
#### Scenario: Conversation
- **WHEN** the player approaches an NPC and presses E or the action control
- **THEN** a named dialogue opens with choices and returning to the world restores focus.
#### Scenario: Project evidence
- **WHEN** an NPC or exhibit opens Azimut or AutoAtlas
- **THEN** the original project summary, links and limitations are readable without leaving the world.

### Requirement: Enterable buildings
All five destinations SHALL have actual interiors with a visible exit and inspectable material.
#### Scenario: Interior trip
- **WHEN** the player interacts with a building entrance
- **THEN** the game enters its interior; returning through the exit places the player outside that same building.

### Requirement: Distinct art and accessible controls
The experience SHALL present a bright pixel-art game world with minimal controls rather than a dark editorial sidebar. The complete portfolio SHALL also be readable through a keyboard-accessible journal/index without required gameplay.
#### Scenario: Mobile
- **WHEN** the experience is used on a narrow screen
- **THEN** the world, held directional controls and interaction button fit without page overflow.
#### Scenario: Interruption
- **WHEN** the page loses focus, becomes hidden, opens a dialogue or the user pauses
- **THEN** held movement stops and does not resume unexpectedly.
#### Scenario: Assets unavailable
- **WHEN** a game asset fails or scripting is unavailable
- **THEN** a readable fallback provides the portfolio links and a retry when applicable.
