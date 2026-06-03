---
name: GSAP ScrollTrigger pin in React
description: Why GSAP pin:true breaks React component trees and what to use instead.
---

# GSAP ScrollTrigger `pin: true` breaks React

**Rule:** Never use `ScrollTrigger { pin: true }` on a DOM node that React owns. It causes "Failed to execute 'removeChild'" errors which corrupt the React component tree, causing "Invalid hook call" errors and app crashes.

**Why:** GSAP's pin feature physically reparents the target DOM node into a GSAP-created wrapper div. React's virtual DOM still thinks the node is in its original location. When React tries to reconcile (update/unmount), it can't find the node and throws `removeChild` errors, crashing the entire component tree.

**How to apply:** For horizontal scroll sections, use CSS `overflow-x: auto/scroll` with `scroll-snap-type: x mandatory` instead of GSAP pin. For other pinned scroll effects, use a dedicated non-React div (e.g. created outside of React's root) as the target.

**Safe GSAP in React:**
- `gsap.fromTo()` with ScrollTrigger `trigger` (no pin) — safe
- `gsap.to()` with CSS properties — safe  
- `ScrollTrigger { scrub, trigger }` without `pin` — safe
- `gsap.context()` with proper cleanup in useEffect return — required
