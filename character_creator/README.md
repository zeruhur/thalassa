# Thálassa Character Creator

An interactive web-based character generator for the Thálassa tabletop RPG, a Mythical Age adventure game set in the world of Hesiod and Homer.

## Features

- **Complete Character Generation**: Generate all aspects of a character following official Thálassa rules
- **Bilingual Support**: Toggle between English and Italian trait names
- **Step-by-Step Creation**: Guided character creation process with individual roll buttons
- **Quick Generation**: "Roll All" button for instant complete character creation
- **Inventory Management**: Real-time slot tracking with visual indicators and warnings
- **Ability Score Swapping**: One-time swap option as per official rules
- **Export Options**: Print character sheets or export to text file
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Classical Theme**: Styled to match the Thálassa aesthetic with GFS Artemisia and Diogenes fonts

## Usage

### Basic Usage

1. Open `index.html` in any modern web browser
2. Click "⚡ Roll Complete Character" for instant character generation, or
3. Use the step-by-step sections to generate each aspect individually:
   - Name & Background
   - Character Traits
   - Ability Scores
   - Stamina & Money
   - Starting Gear

### Language Toggle

Click the "🌐" button in the header to switch between English and Italian trait names. Character data is preserved when switching languages.

### Ability Score Swapping

After rolling ability scores (KRA, TEK, THU), you can swap any two scores once:
1. Check the boxes next to two abilities
2. Click "Swap Selected Abilities"
3. This option can only be used once per character

### Inventory Management

- Inventory slots equal your KRA (Kratos) score
- The progress bar shows slot usage:
  - Green: Below 80% capacity
  - Yellow: 80-99% capacity
  - Red: 100%+ capacity (character reduced to 0 STA)
- Bulky items are marked with [BULKY] tag and take 2 slots

### Export & Print

- **Print**: Click "🖨️ Print" to print the character sheet
- **Export Text**: Click "💾 Export Text" to download a .txt file of your character

## Character Creation Process

The app follows the official Thálassa character creation workflow:

1. **Name & Background** (d20 rolls)
   - First name (gender-based)
   - Patronymic ("child of...")
   - Origin
   - Age (2d20+10)

2. **Character Traits** (d10 rolls each)
   - Physique, Skin, Hair, Face
   - Speech, Clothing
   - Virtue, Vice, Reputation
   - Optional: Misfortune

3. **Ability Scores** (3d6 each)
   - KRA (Kratos) - Strength
   - TEK (Tekhne) - Nimbleness
   - THU (Thumos) - Control
   - Option to swap two scores

4. **Stamina & Money**
   - Stamina: 1d6
   - Electron Coins: 3d6

5. **Starting Gear**
   - Three days' rations (automatic)
   - Armor (d20)
   - Helmet/Shield (d20)
   - Weapon (d20)
   - Expeditionary Gear (d12)
   - Tools (d10)
   - Trinkets (d10)
   - Bonus Item (d20)

## Technical Details

### Files

- `index.html` - Main application structure
- `styles.css` - Thálassa-themed styling
- `script.js` - Character generation logic and data
- `README.md` - This file

### Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

Requires JavaScript enabled.

### Data Sources

All character creation tables and rules are sourced from the official Thálassa game files:
- `_build/en/05_character.md` - Character creation workflow
- `_build/en/06_background.md` - Name and origin tables
- `_build/en/07_traits.md` - English character traits
- `_build/it/07_tratti.md` - Italian character traits
- `_build/en/08_starting_gear.md` - Equipment tables
- `_build/en/09_equipment_list.md` - Equipment statistics

## License

This character creator is created for Thálassa, which is based on [Cairn SRD](https://cairnrpg.com/) and licensed under [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

The character creator itself is also released under CC-BY-SA 4.0.

## Credits

- **Thálassa RPG**: Roberto Bisceglie
- **Cairn SRD**: Yochai Gal
- **Character Creator**: Thálassa Community
- **Fonts**:
  - GFS Artemisia (Greek Font Society)
  - Diogenes (onlinewebfonts.com)

## Support

For issues, questions, or contributions, please visit the [Thálassa GitHub repository](https://github.com/zeruhur/thalassa).

## Version

Version 1.0 - December 2024

---

**Happy adventuring in the Mythical Age!**
