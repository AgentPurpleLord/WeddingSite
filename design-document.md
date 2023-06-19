# Design System
1. Set pre-defined styles
2. Create re-usable modules
3. Define usage guidelines

# Systems
1. Component System
   2. Box Card / Gate
   3. Title Text
   4. Subtitle Text
   5. Button
   6. Nav Bar
   7. Stepper
   8. Input Boxes
9. Usage Guiidelines
   10. Sentence Case for normal, little caps for title
   11. Buttons are left aligned, unless header, then center aligned
   12. Concise, plain language


# Colour


````
--background: hsl(0deg, 0%, 100%); /* Background */
--background-alt: hsl(23, 57%, 95%); /* Alternative Background */
--Seasalt100: hsl(60deg, 1%, 83%);
--Seasalt200: hsl(60deg, 1%, 70%);
--Seasalt300: hsl(60deg, 0%, 58%);
--Seasalt400: hsl(0deg, 0%, 46%);
--Seasalt500: hsl(0deg, 0%, 35%); /* Secondary Text */
--Seasalt600: hsl(0deg, 0%, 19%); /* Heading Text */
--Isabelline100: hsl(34deg, 8%, 83%);
--Isabelline200: hsl(30deg, 4%, 70%);
--Isabelline300: hsl(36deg, 2%, 58%);
--Isabelline400: hsl(20deg, 1%, 46%);
--Isabelline500: hsl(40deg, 2%, 35%);
--Isabelline600: hsl(30deg, 2%, 19%);
--AntiqueWhite100: hsl(35deg, 26%, 82%);
--AntiqueWhite200: hsl(36deg, 13%, 69%);
--AntiqueWhite300: hsl(34deg, 7%, 57%);
--AntiqueWhite400: hsl(32deg, 6%, 45%);
--AntiqueWhite500: hsl(30deg, 6%, 35%);
--AntiqueWhite600: hsl(30deg, 6%, 19%);
--Buff100: hsl(22deg, 68%, 83%);
--Buff200: hsl(22deg, 68%, 70%);
--Buff300: hsl(22deg, 45%, 57%);
--Buff400: hsl(22deg, 33%, 45%);
--Buff500: hsl(23deg, 33%, 35%);
--Buff600: hsl(23deg, 33%, 19%);
--Caramel100: hsl(26deg, 53%, 82%); /* Decorative borders */
--Caramel200: hsl(27deg, 53%, 68%); /* Non-decorative borders */
--Caramel300: hsl(27deg, 53%, 55%); /* Used for actions */
--Caramel400: hsl(27deg, 44%, 43%);
--Caramel500: hsl(27deg, 44%, 33%);
--Caramel600: hsl(26deg, 44%, 18%);
````

# Typography
Body-text and all others:
``@import url("https://fonts.cdnfonts.com/css/libre-baskerville");``

Titles:
``@import url("https://fonts.cdnfonts.com/css/rouge-script");``

Responsive text is utilised via ``font-size: calc(16px + (32 - 16) * (100vw - 400px) / (1920 - 400));``

Scale of font controled via em (increasing by ~1.25 scale):

- Small = 1em
- Body = 1.2em
- Heading 4 = 1.45em
- Heading 3 = 1.86em
- Heading 2 = 2.4em
- Heading 1 = 2.9em

# Spacing
| Scale | Size |
|-------|------|
| XS    | 8pt  |
| S     | 16pt |
| M     | 24pt |
| L     | 32pt |
| XL    | 48pt |
| XXL   | 80pt |


# Shadows
Small: ``box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%);``

Medium: ``box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);``

Large: ``box-shadow: 0 16px 32px 0 rgb(0 0 0 / 10%);``

# Borders
## Edges
Coloured: ``border: 1px solid var(--Caramel100);``

Non-Coloured: ``border: 1px solid var(--Seasalt300);``

## Radius
Small: ``border-radius: 8pt;``

Medium: ``border-radius: 16pt;``

Large: ``border-radius: 32pt;``
