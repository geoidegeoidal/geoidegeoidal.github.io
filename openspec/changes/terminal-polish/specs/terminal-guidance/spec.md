## ADDED Requirements
### Requirement: Human-readable command guidance
The terminal SHALL show contextual next steps with a human-readable purpose and the exact command they execute, using the most recently read content or current directory.
#### Scenario: Read a project
- **WHEN** a visitor reads a project
- **THEN** the guide offers useful next steps instead of repeating the initial profile invitation
#### Scenario: Hide coaching
- **WHEN** an experienced visitor hides the guide
- **THEN** the prompt and all commands remain available and the guide can be restored
### Requirement: Predictable input and recovery
The terminal SHALL support unambiguous Tab completion, selectable ambiguous matches, existing history, cd - and Ctrl+A/E/U/K editing without trapping focus or overwriting an edit in the middle of the line.
#### Scenario: Multiple matches
- **WHEN** Tab has several matches
- **THEN** selectable completions are shown and selecting one fills the input without executing it
#### Scenario: Bad command or path
- **WHEN** a command fails
- **THEN** the error explains the failure and provides executable recovery actions
### Requirement: Accessible reading and focus
The terminal SHALL keep real evidence selectable, place the latest result at its reading start, and preserve visible focus, reduced motion, responsive layouts and no-JavaScript direct links.
#### Scenario: Touch exploration
- **WHEN** a visitor presses a guidance or file button
- **THEN** content is read without forcing focus into the input and opening the software keyboard
#### Scenario: Keyboard submission
- **WHEN** a visitor submits a typed command
- **THEN** focus remains at the prompt for the next command
