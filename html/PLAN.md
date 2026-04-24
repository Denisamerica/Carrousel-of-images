# Development Plan: Mobile Image Carousel (9:16)

## 1) Goals and Constraints
- Build a touch-friendly image carousel optimized for cell phones.
- Display images in **9:16 aspect ratio** consistently.
- Keep implementation in plain HTML/CSS/JavaScript (no framework required).
- Provide smooth swipe interactions, accessible controls, and lazy-loading for performance.

## 2) Project Structure
- `html/index.html`: carousel markup and semantic controls.
- `html/styles.css`: responsive layout, 9:16 container, transitions.
- `html/script.js`: navigation logic, swipe gestures, autoplay (optional).
- `html/assets/`: image files (prefer WebP/AVIF + fallbacks).

## 3) UI/UX Requirements
- One active slide visible at a time.
- Previous/next controls and pagination dots.
- Touch swipe left/right navigation.
- Optional autoplay with pause on user interaction.
- Keep controls large enough for thumb interaction.

## 4) Technical Implementation Steps

### Step 1 — HTML Skeleton
- Create `<section class="carousel" aria-label="Image carousel">`.
- Add a viewport wrapper with an inner track containing slides.
- Each slide uses `<img loading="lazy" alt="...">`.
- Add buttons (`aria-label="Previous image"`, `aria-label="Next image"`) and dots.

### Step 2 — CSS for Mobile + 9:16
- Use a centered container constrained by `width: min(100vw, 420px);`.
- Enforce 9:16 with either:
  - `aspect-ratio: 9 / 16;` (preferred), or
  - padding-top fallback for older browsers.
- Apply `object-fit: cover;` to images.
- Animate slides using `transform` + `transition` for smooth movement.

### Step 3 — JavaScript Behavior
- Keep `currentIndex` state.
- Implement `goToSlide(index)`, `nextSlide()`, `prevSlide()`.
- Update track transform: `translateX(-index * 100%)`.
- Sync active dot and ARIA attributes.
- Add touch handlers (`touchstart`, `touchmove`, `touchend`) with swipe threshold.

### Step 4 — Accessibility and Robustness
- Keyboard support: left/right arrows when focused.
- `aria-live="polite"` region for slide change announcements (optional).
- Respect reduced motion: disable autoplay/animation if `prefers-reduced-motion`.
- Ensure all images have meaningful `alt` text.

### Step 5 — Performance
- Use compressed images (target <= 200 KB where possible).
- Use `srcset` + `sizes` for mobile densities.
- Lazy-load non-initial slides.
- Preload first image to improve LCP.

### Step 6 — Testing Checklist
- Test on narrow widths (320px, 360px, 390px, 428px).
- Verify swipe in Chrome/Firefox/Safari mobile emulation.
- Confirm no layout shifts and stable 9:16 rendering.
- Validate Lighthouse performance and accessibility basics.

## 5) Milestones (Suggested)
1. **M1**: Static HTML/CSS with fixed 9:16 container and manual controls.
2. **M2**: JavaScript navigation + pagination.
3. **M3**: Touch gestures + keyboard accessibility.
4. **M4**: Performance tuning + cross-browser QA.

## 6) Deliverable Definition
- A runnable `html/index.html` showing a functional mobile-first carousel.
- Works with 9:16 images, touch navigation, and accessible controls.
- Includes brief usage notes and easy image replacement workflow.
