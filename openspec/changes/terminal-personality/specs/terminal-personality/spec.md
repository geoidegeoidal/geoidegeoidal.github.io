## ADDED Requirements
### Requirement: Immediate personal greeting
The terminal SHALL show a personal greeting and a brief decorative signature while keeping all reading content and controls available immediately.
#### Scenario: Submit during the greeting
- **WHEN** a visitor submits a command while the signature animates
- **THEN** the full result is added synchronously without waiting for the greeting or a typing simulation
### Requirement: Meaningful operation feedback
The terminal SHALL describe successful operations with actual paths or content counts and preserve recoverable errors without changing factual portfolio content.
#### Scenario: Browse a directory
- **WHEN** a visitor lists or enters a directory
- **THEN** the result identifies that directory and its real number of entries with a next-step hint
#### Scenario: Read a file
- **WHEN** a visitor reads a file
- **THEN** the status identifies the file read and the transcript retains its exit code
### Requirement: Bounded accessible motion
The terminal SHALL animate only its initial decorative signature and latest command feedback, and retain complete readable output when motion is paused or reduced.
#### Scenario: Repeated commands
- **WHEN** commands arrive before prior feedback finishes
- **THEN** previous feedback stops and all commands remain in the transcript
#### Scenario: Reduced motion or pause
- **WHEN** reduced motion is requested or animation is paused
- **THEN** the same greeting, result and exit status are available without animation
