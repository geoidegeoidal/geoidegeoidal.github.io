## Context
The two published alternatives work but fail the owner's expected level of craft. This is an authorized redesign/refinement of those surfaces; classic portfolio remains the home route.

## Decisions
- Terminal is a read-only virtual filesystem built from existing portfolio templates, not a remote OS or executable shell. Plain DOM output and native input preserve selection, mobile keyboards and accessibility. Use JetBrains Mono, graphite background, warm light text, directory blue, prompt mint and restrained amber warnings.
- RPG keeps its physical model and fuller Jorge avatar. New room art, foreground objects and content illustrations share the world. NPC conversations use a compact bottom dialogue; notebook/project reading uses a pixel-framed field book with illustrations, thematic tabs and evidence sections.
- Music is an original short looping composition rendered via Web Audio after an explicit sound gesture. Master volume, mute, pause, page visibility and failed AudioContext states are handled; no external audio request or tracking.
- Ambient motion (ocean ripples) and finite dialogue/output reveals respect reduced motion and a visible motion control. Input is never blocked for a fake boot timer.

## Risks / Trade-offs
- Virtual shell familiarity may imply real OS access: label it local and read-only, make supported commands clear and recover from unknown syntax without execution.
- Dense RPG visuals can obscure interaction: preserve readable labels, ground cues, high contrast reading and always-available notebook/index.
- Sound can surprise: initial music off; explicit enable and persistent in-session controls. Suspend playback on pause/hidden.

## Migration Plan
Work branch, behavior specification, implementation commits, functional and visual review of both views, root/subpath checks, PR/push/deploy and production smoke test. Roll back by revert, not force push.
