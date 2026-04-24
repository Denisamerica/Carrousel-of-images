# Testing Strategy for the Carousel Upload Panel

## 1) Fast local smoke test (first pass)
1. Open `html/index.html` in a browser.
2. Upload one valid image (WebP, GIF, PNG, or JPEG).
3. Confirm:
   - Status text updates to `1 image(s) ready for the carousel.`
   - Slide preview appears in 9:16.
   - Previous/Next buttons are disabled for single-image state.
4. Upload 2+ more valid images.
5. Confirm:
   - List entries render with remove buttons.
   - Next button advances slides.
   - Dot indicators track active slide.
6. Remove an image from middle/end.
7. Confirm:
   - List and carousel update correctly.
   - Current index clamps safely without errors.

## 2) Negative input tests (file validation)
- Upload unsupported file types (`.svg`, `.pdf`, `.txt`).
- Confirm unsupported files are skipped and a warning appears in status text.
- Mixed batch test: upload valid and invalid files together; ensure valid files still appear.

## 3) JavaScript syntax and baseline checks
- Run `node --check html/script.js` as a minimum syntax gate.
- Optionally add ESLint for consistent style and common bug detection.

## 4) Visual and responsive checks
- Test device widths: 320px, 360px, 390px, 428px, and tablet width.
- Verify `aspect-ratio: 9 / 16` remains stable and images use `object-fit: cover`.
- Ensure controls remain tappable and not clipped.

## 5) Cross-browser matrix (important)
- Chrome (desktop + Android emulation)
- Safari (iOS device or simulator)
- Firefox

Focus areas:
- `<input type="file" multiple>` behavior
- `crypto.randomUUID()` support
- `URL.createObjectURL` / `URL.revokeObjectURL` behavior

## 6) Accessibility checks
- Keyboard navigation for buttons and dots.
- Screen-reader announcement of status updates via `aria-live="polite"`.
- Verify accessible names for navigation controls.
- Color contrast of text/buttons against background.

## 7) Suggested next step: lightweight automated tests
As the project grows, add Playwright E2E tests:
- Upload valid files and assert slide count.
- Upload invalid files and assert skipped message.
- Click next/previous and assert transform/index behavior.
- Remove slide and assert list + dot count updates.

This gives the best ROI: quick manual confidence now, then repeatable browser automation.
