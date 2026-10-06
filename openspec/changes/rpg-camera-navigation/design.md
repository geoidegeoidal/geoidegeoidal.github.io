## Context
User rejects the close framing and labels of the deployed game. Refine the established bright pixel village; do not replace its art, owner or content.
## Decisions
Default world scale 0.95 desktop / 0.75 mobile, adjustable in bounded steps. Camera follows only outside a central dead zone, with exponential settling and immediate adjustment for reduced motion/scene changes. Landmark buttons are DOM labels with fixed readable screen sizes; NPC names appear only near the player. The overview is an illustrated map and compact destination list, not another mandatory onboarding stage. Selecting a destination computes a real route using existing collisions and walks into its door. Manual input or Cancel stops guidance.
## Risks
Small actors at lower zoom: keep current silhouettes and allow zoom. Overlay overlap: screen-space containment and reserved HUD areas, complete destinations always in overview. Camera interpolation must use the same rounded transform for drawing and hit-testing.
