# The Good Craft Co. — Design System

**The Good Craft Co. (TGCC)** is Diageo India's premium craft umbrella. It holds the company's Indian-made spirits and celebrates the craft of Indian spirit-making. TGCC is a house brand: it sits above product brands, and it presents itself to consumers directly only some of the time (events, pop-up stores, The Bar website, distillery signage, merchandise). In other places it acts as a secondary endorsement on product brands.

> Mission: *Becoming the Standard of Good in the Industry — setting the benchmark for Indian Craft Beverages.*
> Brand world: *Salt of the Earth, Glint of the Sun — natural, earthy goodness with just the right polish and minimalist refinement.*

## Sources
- `uploads/The Good Craft Co_Brand Guildelines (2) (1).pdf`: Brand Guidelines v1.0, Sept 2022, Quick Brown Fox Design, 61 pp. Covers strategy, logo, colours, typography, photography, illustration, forms, materials, voice, future execution and the cased logo.
- `uploads/121223 TGCC _ Visual Language R3 (Addressed Feedback) (2) (1).pdf`: Visual Language R3, Please See, 24 pp. Covers the photography moodboards per content pillar, the VL palette, illustration levels, textures, grids, the communication system, IP extension, ticker highlighting, the process posters and signage.
- `TGCC Ponda Experience Narrative.pdf` was listed in the brief, but **it was not in the project** and has not been read.
- The **original logo files** (`.ai`/`.svg`/`.png` in "The Good Craft Co_Brand Assets", listed on guidelines p60) were not provided. `assets/logo/*.png` are high-resolution rasters cropped from the guidelines PDF.

There are no codebase, Figma file or live product in the sources. Every component is authored from the guidelines.

## Index
- `styles.css`: entry point (imports only) → `tokens/fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `base.css`
- `fonts/`: Uniform (regular, Condensed, Extra Condensed; Light–Ultra) and Mirador Book/Bold (demo cuts) as .otf, plus Newsreader woff2 as serif fallback
- `assets/logo/`: `tgcc-logo-olive.png`, `tgcc-logo-creme.png` (transparent)
- `assets/illustrations/`: `leaf-level1`, `figure-wreath-level2`, `barrels-level3`, `figure-wreath-terracotta`, `leaf-branch` (transparent PNG)
- `assets/textures/`: `rock`, `clouds`, `leaf`
- `assets/imagery/`: `pouring-spirit`, `barley-field`, `arch-interior`, `terracotta-wall-signage`, `process-posters-wall`, `brand-world-moodboard` (moodboard crops; low-res, for reference/prototyping only)
- `assets/icons/ticker-arrow.png`: the brand's ticker/arrow mark
- `guidelines/`: foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/`: React primitives (below)
- `ui_kits/social-comms/`: communication system post library
- `ui_kits/signage/`: distillery process posters, directional and washroom signage
- `slides/`: 9 slide layouts in the style of the guidelines deck
- `SKILL.md`: Agent-Skill entry point

## Components
Namespace: `window.TheGoodCraftCoDesignSystem_6c692a`
- **brand/**: `Logo`, `MixedHeadline`, `CircularText`, `Ticker`, `TickerArrow`
- **core/**: `Button`, `IconButton`, `Tag`, `Badge`
- **forms/**: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **content/**: `StoryTile` (comms Image + text, options 1 & 2), `PillarCard`, `ProcessStep`
- **feedback/**: `Dialog`, `Toast`, `Tooltip`
- **navigation/**: `Tabs`, `DirectionSign`

The sources define no UI component inventory, so the set above is authored. Brand-specific parts (Logo, MixedHeadline, CircularText, Ticker, StoryTile, ProcessStep, DirectionSign, PillarCard) come straight from patterns in the guidelines and VL deck. The general UI primitives (Button, forms, Dialog, Toast, Tooltip, Tabs, Badge, Tag, IconButton) are **intentional additions** for web and digital prototypes such as The Bar website and age gates. They are styled from the brand's rules and have no counterpart in the sources.

---

## CONTENT FUNDAMENTALS
The voice has four principles: **Pursuit · Good · Clarity · Humility**.
- **Pursuit**: bold and enthusiastic without being brash; curious and questioning; it carries a sense of continuity. *"We are rediscovering the beauty of India's forgotten ingredients." "We are determined to craft better."*
- **Good**: honest, open, positive and hopeful. *"A small step, everyday, is all it takes." "'Our farmers, Our friends' — an Instagram Live session today."*
- **Clarity**: transparent and straightforward, warm and human, never superfluous or exaggerated. *"Less Waste… Same Spirit."*
- **Humility**: humble but not under-confident; confident but not assertive. *"We know this step is but a drop in the ocean. At The Good Craft Co. we consider every drop precious."*

Mechanics:
- **Person**: first-person plural, **"we / our"**, speaking to "you" or "all of you". The brand never uses "I".
- **Casing**: headlines in Title Case ("Making the World Believe in Good", "Helping Consumers Drink Good"). Comms titles can be sentence case ("The why of Whiskey-making", "Stories of Indian spirits"). Eyebrows and page headers are UPPERCASE with tracking ("THE GOOD CRAFT CO. BRAND MANIFESTO"). Circular headlines are ALL CAPS.
- **Punctuation**: spaced em-dash lists ("— The beauty of little things"), ellipses for a pause ("Less Waste… Same Spirit."), footnote asterisks for nuance.
- **Spelling**: British/Indian English ("colour", "labour", "scrutinising"). "Whisky" and "Whiskey" both appear in the sources. Prefer **whisky**.
- **Vocabulary**: good, craft, conscious, little things, land, people, ingenuity, small batches, tread lightly. Avoid hype, superlatives, awards talk and cocktail/occasion framing. The focus is the spirit, the source and the people.
- **Topics**: sustainable practices, farmers and raw materials, local and craft collaborations, our spirits, teams, discoveries, goals, events.
- **Emoji**: none. Unicode is limited to the em-dash, ellipsis and the "·" separator.

## VISUAL FOUNDATIONS
- **Colour**: muted, earthen and warm. The core is four neutrals: **Tan #DBBC88, Creme #FBF3E1, Taupe #979281, Olive #4D4D3C**. The secondary palette is seven warm desaturated families in four tones (stone, moss, parchment, honey, oak, clay, sage). The guidelines say *avoid blues and purples*. The Visual Language R3 comms palette adds saffron, rust, forest, teal, oxblood and turmeric for digital work. Its deck headings are teal (#2C6F81), so use teal only in comms/digital. Colour can also come from real materials: handmade paper, wood, stone, brass.
- **Type**: Uniform (rational geometric sans) is the base, and Mirador (modern serif) adds finesse *occasionally*. Headline styles: (1) **fine mixed**: light Uniform with Mirador on the significant words, at large sizes; (2) **weight contrast**: thin line plus bold line (used throughout the guidelines deck); (3) **circular**: all caps on a circle that interacts with the subject, 6+ words; (4) **bold Uniform** in text-rich layouts. Presentations use Avenir Next and no serif.
- **Backgrounds**: flat full-bleed fields of Tan, Creme, Taupe or Olive (guidelines deck), or warm sand/khaki panels (VL deck). Use full-bleed photography for comms and nature textures (rock, clouds, leaf). There are **no gradient backgrounds**. Gradients appear only as image *protection*, in a brand colour picked to suit the photo.
- **Imagery**: warm, natural, mature, unfiltered. Feedback asked for fewer yellow tints so photos look natural. The four themes are source and nature, people (portrait style), the spirit itself (no cocktails or mixed drinks), and before-bottling process. Lighting is low and directional, with shadows, grain and patina.
- **Illustration**: geometric construction with warmth and tactility (paper/stone grain inside flat shapes). Three levels: L1 simple silhouettes (leaf, fruit), L2 human interaction in a circular leaf wreath, L3 intricate engraved craft (barrels). Tones are creme, sage, terracotta and teal.
- **Forms and corners**: circular, simplified and geometric. Corners are square (0 radius) on cards, panels, posters and buttons. Circles, pills and **arches** (doorways, niches) are the curved forms. No soft-rounded cards.
- **Cards**: flat colour blocks with no border and no shadow (PillarCard). Comms tiles are full-bleed images with the logo fixed top-right, never boxed. A translucent colour panel at 70–90% opacity or a brand-colour gradient protects text.
- **Borders**: hairline 1px rules in Olive or Creme between list items (signage) and under form fields. No left-accent borders.
- **Shadows**: mostly none. Use a deep soft shadow (`--shadow-frame`) only for physical objects in situ, such as framed posters on a wall. Logo glow or shadow is forbidden.
- **Transparency and blur**: colour panels at 70%/90% over photos; an olive scrim for modals. No glassmorphism or blur.
- **Layout**: comms grids are 7×4 (1920×1080), 5×7 (1920×1350) and 4×4 (1080×1080). The logo sits fixed in a corner, or centred over the middle four squares on "Image + logo" posts. Guideline pages follow a set pattern: header label top-left, logo top-right, vertical running footer on the right edge, generous left margin.
- **Motion** (not specified in the sources; inferred): calm, slow fades and gentle eases (`--ease-out`, 280–600ms). No bounces. Hover lowers opacity slightly (~0.86). Press nudges down 1px. Focus is shown in teal.
- **Logo**: circular wordmark in Olive or Creme. Minimum size 75px digital / 6mm print. Don't distort, rotate, re-proportion, add glow/shadow or outline it. The cased logo (inside a solid casing) is for busy backgrounds and neck labels.

## ICONOGRAPHY
- The guidelines ask for **minimal icons**: geometric, no excess ornament, using the same construction as the illustrations. The sources contain no icon set, icon font or SVG sprite.
- The one recurring glyph is the **ticker arrow**, a fletched arrowhead (`assets/icons/ticker-arrow.png`, exposed as `TickerArrow`). It marks objects in images and video and gives direction on signage.
- Washroom and wayfinding pictograms use the Level-2 illustrations (figure in leaf wreath) rather than standard pictograms.
- No emoji. No unicode glyphs as icons, apart from "·" separators.
- If a UI needs generic icons (menu, close, play), use a thin-stroke geometric set (e.g. Lucide at 1.5px stroke) in Olive/Creme. **This is a substitution and is not brand-sourced.** Flag it to the brand team.

## Brand fonts
Uniform and Mirador are bundled in `fonts/` and declared in `tokens/fonts.css`. Uniform weights: Light (200–300), Regular 400, Medium 500, Bold (600–700), Black 800, Ultra 900, in three widths: `--font-sans` (Uniform), `--font-sans-condensed`, `--font-sans-xcondensed`. Mirador: Book (200–500) and Bold (600+). No Mirador italic was supplied, so italics are synthesized. The Mirador files are **DEMO** cuts; swap in the licensed files before production. Newsreader stays in the serif stack for any glyphs the demo lacks.
