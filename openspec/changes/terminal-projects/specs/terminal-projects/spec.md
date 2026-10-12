## ADDED Requirements
### Requirement: Recognizable project listings
Project listings SHALL present each project's human-readable name, purpose and executable file path with the same presentation for directory and project commands.
#### Scenario: Choose from a directory
- **WHEN** a visitor lists the project directory or runs proyectos
- **THEN** each result explains the project and opens the corresponding brief without requiring typed commands
### Requirement: Evidence-based project brief
Each project SHALL show the problem, the owner's contribution, available access, technology and unchanged limitations, using factual portfolio content.
#### Scenario: Web project
- **WHEN** a project has a demo URL
- **THEN** its brief offers a clearly labelled live project link and repository link
#### Scenario: Repository-only project
- **WHEN** a project has no demo URL
- **THEN** its brief explains repository access without presenting a fictitious demo
### Requirement: Session continuity and accessibility
Project exploration SHALL preserve command aliases, filters, direct URLs, input drafts, focus behavior, responsive reading and safe labelled external links.
#### Scenario: Explore using touch
- **WHEN** a visitor selects a project row with a draft in the input
- **THEN** the brief opens without losing the draft or forcing the software keyboard
