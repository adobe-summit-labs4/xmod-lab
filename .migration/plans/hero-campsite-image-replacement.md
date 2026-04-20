# Hero Content Update Plan

## Goal
Update the homepage hero with a Las Vegas theme — new headline and campsite image replacement (from prior plan).

## Current State
- **Headline (h1):** "Bold Stories. Real Life. Wild Places."
- **Hero image:** `media_137e525a8479336997a84917d2ad521f873e4df22.jpg` (alt: "Wild mountain landscape at dawn")

## Changes

### 1. Headline Update
- **Old:** `Bold Stories. Real Life. Wild Places.`
- **New:** `Viva Las Vegas. Your Adventure Awaits.`
- Location: `index.plain.html` line 17, inside the hero block's `<h1>` element
- The `id` attribute will also need updating to match the new text

### 2. Hero Image Replacement (from prior plan)
- Replace all 4 `<source>`/`<img>` references with a campsite-with-tents image
- Update `alt` text to describe the new image
- A new image file must be sourced or provided

## Checklist
- [ ] Update `<h1>` text to "Viva Las Vegas. Your Adventure Awaits." in `index.plain.html` (line 17)
- [ ] Update `id` attribute on `<h1>` to match new headline
- [ ] Obtain a campsite-with-tents image file
- [ ] Add the image to the content media directory
- [ ] Update `<source>` and `<img>` references in the hero `<picture>` element (lines 7–10)
- [ ] Update `alt` attribute to reflect the new image
- [ ] Verify hero rendering in the preview

---

*Ready for Execute mode to implement these changes. The headline can be updated immediately; the image replacement requires an image file to be provided or sourced.*
