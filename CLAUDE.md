# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Thálassa is a tabletop RPG adventure game set in the Mythical Age of Hesiod and Homer. The repository contains:
- A Jekyll-based website for the online version
- Build scripts for PDF generation
- Content in both English and Italian
- Custom styling based on ancient Greek aesthetics

The game is licensed under CC-BY-SA 4.0 and based on the Cairn SRD.

## Repository Structure

### Content Organization

The repository has a dual structure:

1. **Root directory** - Jekyll website source
   - Markdown files are thin wrappers with Jekyll frontmatter
   - They use `{% include_relative _build/md/XX_filename.md %}` to include actual content
   - Example: `character.md` includes `_build/md/05_character.md`

2. **`_build/` directory** - PDF build system and source content
   - `en/` - English markdown files (numbered 00-21)
   - `it/` - Italian markdown files
   - `css/` - Styling for PDF generation
   - `img/` - Maps and graphics
   - `pdf/` - Generated PDF output
   - `metadata.yml` - PDF metadata configuration
   - `build.sh` - PDF generation script

### Key Configuration Files

- `_config.yml` - Jekyll configuration using Just The Docs theme
- `_sass/custom/custom.scss` - Custom fonts (GFS Artemisia, Diogenes) and styling
- `_build/metadata.yml` - Pandoc metadata for PDF generation

## Build Commands

### Generate PDF

```bash
cd _build
./build.sh
```

This uses Pandoc with WeasyPrint to generate `pdf/thalassa.pdf` from the markdown files, applying custom CSS styling.

The build command is:
```bash
pandoc -f gfm -t html -o pdf/thalassa.pdf -s md/*.md --pdf-engine=weasyprint --css="css/thalassa.css" --metadata-file="metadata.yml"
```

### Jekyll Website

The site is deployed via GitHub Pages and uses the Just The Docs remote theme. There's no local build command needed - Jekyll builds automatically on push to GitHub.

To test locally (if needed):
```bash
bundle exec jekyll serve
```

## Content Management

### File Naming Convention

Content files in `_build/en/` and `_build/it/` follow a numbered prefix system:
- `00_` - Index/Overview
- `01-04_` - Principles
- `05-09_` - Character creation and equipment
- `10-13_` - Rules, magic, combat, bestiary
- `14-18_` - World, adventures, locations, tables
- `19-21_` - Summary, appendix, credits

### Adding New Content

When adding or modifying content:

1. **For website updates**: Edit files in `_build/en/` or `_build/it/`
2. **For Jekyll navigation**: Update corresponding root-level `.md` file with proper frontmatter:
   ```yaml
   ---
   layout: default
   title: Page Title
   nav_order: X
   parent: Parent Section (if applicable)
   ---
   ```

### Bilingual Content

The game supports English (`_build/en/`) and Italian (`_build/it/`). When editing content:
- Both language versions should be kept in sync conceptually
- File numbers should match between languages (e.g., `en/05_character.md` ↔ `it/05_personaggi.md`)

## Styling

### Fonts

The project uses two custom font families:
- **GFS Artemisia** - Body text (serif, ancient Greek-inspired)
- **Diogenes** - Headers (loaded from onlinewebfonts.com)

Font files are in `/fonts/` with `.woff` format for web use.

### Custom Styling

All custom SCSS is in `_sass/custom/custom.scss`:
- Sets base font size to 1.25em
- Defines font families
- Applied to both Jekyll site and PDF builds (via `_build/css/thalassa.css`)

## License and Attribution

All text and maps are licensed under CC-BY-SA 4.0. The game is based on Cairn SRD. When making changes:
- Preserve license information in files
- Maintain attribution to original sources
- Follow CC-BY-SA 4.0 requirements for derivative works
