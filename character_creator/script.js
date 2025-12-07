// Thálassa Character Creator - JavaScript
// Author: Thálassa Community
// License: CC-BY-SA 4.0

// ===== GLOBAL STATE =====
let currentLanguage = 'en'; // 'en' or 'it'
let swapUsed = false;

const characterData = {
    name: {
        first: '',
        patronymic: '',
        origin: '',
        age: 0,
        gender: 'female'
    },
    traits: {
        physique: 0,
        skin: 0,
        hair: 0,
        face: 0,
        speech: 0,
        clothing: 0,
        virtue: 0,
        vice: 0,
        reputation: 0,
        misfortunes: 0
    },
    abilities: {
        kra: 0,
        tek: 0,
        thu: 0
    },
    combat: {
        stamina: 0
    },
    inventory: {
        slots: 0,
        items: [],
        coins: 0
    }
};

// ===== DATA TABLES =====

// Names (d20)
const FEMALE_NAMES = [
    'Althea', 'Berenike', 'Chloris', 'Corythia', 'Deineira',
    'Deipyle', 'Electra', 'Eunice', 'Galatea', 'Helike',
    'Lede', 'Lyra', 'Metis', 'Mykale', 'Niobe',
    'Phylia', 'Themis', 'Thyia', 'Xanthe', 'Zoe'
];

const MALE_NAMES = [
    'Agelaus', 'Audax', 'Brygos', 'Chrysippos', 'Cleonicus',
    'Croesus', 'Damastor', 'Demokrates', 'Dryas', 'Eleon',
    'Epistor', 'Glycon', 'Hyllus', 'Icarion', 'Kasos',
    'Lycoris', 'Mydon', 'Pheidias', 'Skiron', 'Timonax'
];

const PATRONYMIC = [
    'Alcman', 'Bacis', 'Diactorides', 'Eumaeus', 'Eutuches',
    'Geleon', 'Gnipho', 'Hagias', 'Melanippos', 'Menandros',
    'Menexinos', 'Peirithous', 'Phaenippos', 'Philokles', 'Priam',
    'Sosimenes', 'Sostias', 'Teukros', 'Thaumastus', 'Thettalos'
];

const ORIGINS = [
    'Amazon', 'Argive', 'Athenian', 'Child of deity', 'Child of hero',
    'Child of king', 'Ciconian', 'Cimmerian', 'Cretese', 'Cypriot',
    'Egyptian', 'Ethyopian', 'Lydian', 'Mycenaean', 'Mysian',
    'Phoenician', 'Rhodian', 'Spartan', 'Thracian', 'Trojan'
];

// Traits (d10) - Bilingual
const TRAIT_TABLES = {
    en: {
        physique: ['Athletic', 'Brawny', 'Flabby', 'Lanky', 'Rugged', 'Scrawny', 'Short', 'Statuesque', 'Stout', 'Towering'],
        skin: ['Birthmark', 'Dark', 'Elongated', 'Pockmarked', 'Rosy', 'Round', 'Soft', 'Tanned', 'Tattooed', 'Weathered'],
        hair: ['Bald', 'Braided', 'Curly', 'Filthy', 'Frizzy', 'Long', 'Luxurious', 'Oily', 'Wavy', 'Wispy'],
        face: ['Bony', 'Broken', 'Chiseled', 'Elongated', 'Pale', 'Perfect', 'Rat-like', 'Sharp', 'Square', 'Sunken'],
        speech: ['Blunt', 'Booming', 'Cryptic', 'Droning', 'Formal', 'Gravelly', 'Precise', 'Squeaky', 'Stuttering', 'Whispery'],
        clothing: ['Antique', 'Bloody', 'Elegant', 'Filthy', 'Foreign', 'Frayed', 'Frumpy', 'Livery', 'Rancid', 'Soiled'],
        virtue: ['Ambitious', 'Cautious', 'Courageous', 'Disciplined', 'Gregarious', 'Honorable', 'Humble', 'Merciful', 'Serene', 'Tolerant'],
        vice: ['Aggressive', 'Bitter', 'Craven', 'Deceitful', 'Greedy', 'Lazy', 'Nervous', 'Rude', 'Vain', 'Vengeful'],
        reputation: ['Ambitious', 'Boor', 'Dangerous', 'Entertainer', 'Honest', 'Loafer', 'Oddball', 'Repulsive', 'Respected', 'Wise'],
        misfortunes: ['Abandoned', 'Addicted', 'Blackmailed', 'Condemned', 'Cursed', 'Defrauded', 'Demoted', 'Discredited', 'Disowned', 'Exiled']
    },
    it: {
        physique: ['Atletico', 'Muscoloso', 'Corpulento', 'Longilineo', 'Massiccio', 'Gracile', 'Basso', 'Statuario', 'Robusto', 'Imponente'],
        skin: ['Voglia', 'Scura', 'Flaccida', 'Butterata', 'Rosea', 'Morbida', 'Liscia', 'Abbronzata', 'Tatuata', 'Segnata'],
        hair: ['Calvo', 'Intrecciati', 'Ricci', 'Sporchi', 'Crespi', 'Lunghi', 'Voluminosi', 'Grassi', 'Mossi', 'Sparsi'],
        face: ['Ossuta', 'Rotta', 'Cesellata', 'Allungata', 'Pallida', 'Perfetta', 'da Topo', 'Appuntita', 'Quadrata', 'Infossata'],
        speech: ['Schietta', 'Profonda', 'Misteriosa', 'Monotona', 'Formale', 'Greve', 'Precisa', 'Stridula', 'Balbettante', 'Bisbigliante'],
        clothing: ['Antico', 'Insanguinato', 'Elegante', 'Sporco', 'Esotico', 'Logoro', 'Sgargiante', 'Livrea', 'Fetido', 'Sudicio'],
        virtue: ['Ambizioso', 'Cauto', 'Coraggioso', 'Disciplinato', 'Socievole', 'Onorevole', 'Umile', 'Compassionevole', 'Sereno', 'Tollerante'],
        vice: ['Aggressivo', 'Scorbutico', 'Vile', 'Bugiardo', 'Avido', 'Pigro', 'Nervoso', 'Rude', 'Vanitoso', 'Vendicativo'],
        reputation: ['Ambizioso', 'Zoticone', 'Pericoloso', 'Intrattenitore', 'Onesto', 'Fannullone', 'Eccentrico', 'Ripugnante', 'Rispettato', 'Saggio'],
        misfortunes: ['Abbandonato', 'Assuefatto', 'Ricattato', 'Condannato', 'Maledetto', 'Truffato', 'Declassato', 'Screditato', 'Ripudiato', 'Esiliato']
    }
};

// Equipment Tables
const ARMOR_TABLE = {
    ranges: [[1, 3], [4, 14], [15, 19], [20]],
    items: [
        { name: 'None', slots: 0, armor: 0 },
        { name: 'Fur Coat', slots: 1, armor: 1 },
        { name: 'Linothorax', slots: 2, armor: 2, bulky: true },
        { name: 'Breastplate', slots: 2, armor: 3, bulky: true }
    ]
};

const HELMET_SHIELD_TABLE = {
    ranges: [[1, 13], [14, 16], [17, 19], [20]],
    items: [
        { name: 'None', slots: 0 },
        { name: 'Krános (Helmet)', slots: 1, armor: 1 },
        { name: 'Aspis (Shield)', slots: 1, armor: 1 },
        { name: 'Krános & Aspis', slots: 2, armor: 2 }
    ]
};

const WEAPON_TABLE = {
    ranges: [[1, 5], [6, 14], [15, 19], [20]],
    items: [
        { name: 'Kopis (curved knife)', slots: 1, damage: 'd6' },
        { name: 'Doru (spear) or Xiphos (sword)', slots: 1, damage: 'd8' },
        { name: 'Akontia (javelin) or Sfendonai (sling)', slots: 1, damage: 'd4/d10' },
        { name: 'Xyston (long lance) or Toxa (bow)', slots: 2, damage: 'd10/d6', bulky: true }
    ]
};

const EXPEDITIONARY_TABLE = [
    { name: 'Cart (+4 slots, bulky)', slots: 2, bulky: true, special: '+4 inventory' },
    { name: 'Chain (10ft)', slots: 1 },
    { name: 'Dowsing Rod', slots: 1 },
    { name: 'Fire Oil', slots: 1 },
    { name: 'Large Sack', slots: 1 },
    { name: 'Large Trap', slots: 1 },
    { name: 'Lockpicks', slots: 1 },
    { name: 'Pick', slots: 1 },
    { name: 'Pole (10ft)', slots: 1 },
    { name: 'Rope (25ft)', slots: 1 },
    { name: 'Torch', slots: 1 },
    { name: 'Waterskin', slots: 1 }
];

const TOOLS_TABLE = [
    { name: 'Bellows', slots: 1 },
    { name: 'Bucket', slots: 1 },
    { name: 'Chalk', slots: 1 },
    { name: 'Chisel', slots: 1 },
    { name: 'Cook Pots', slots: 1 },
    { name: 'Drill (Manual)', slots: 1 },
    { name: 'Fishing Rod', slots: 1 },
    { name: 'Flint & Steel', slots: 1 },
    { name: 'Grease', slots: 1 },
    { name: 'Staff', slots: 1 }
];

const TRINKETS_TABLE = [
    { name: 'Amulet', slots: 1 },
    { name: 'Bottle', slots: 1 },
    { name: 'Copper', slots: 1 },
    { name: 'Horn', slots: 1 },
    { name: 'Incense', slots: 1 },
    { name: 'Lyre', slots: 1 },
    { name: 'Necklace', slots: 1 },
    { name: 'Silver Mirror', slots: 1 },
    { name: 'Talisman', slots: 1 },
    { name: 'Tunic', slots: 1 }
];

// UI Labels (Bilingual)
const UI_LABELS = {
    en: {
        langButton: 'Italiano',
        physique: 'Physique',
        skin: 'Skin',
        hair: 'Hair',
        face: 'Face',
        speech: 'Speech',
        clothing: 'Clothing',
        virtue: 'Virtue',
        vice: 'Vice',
        reputation: 'Reputation',
        misfortunes: 'Misfortune'
    },
    it: {
        langButton: 'English',
        physique: 'Fisico',
        skin: 'Pelle',
        hair: 'Capelli',
        face: 'Faccia',
        speech: 'Parlata',
        clothing: 'Vestito',
        virtue: 'Virtù',
        vice: 'Vizio',
        reputation: 'Reputazione',
        misfortunes: 'Sfortune'
    }
};

// ===== DICE ROLLING FUNCTIONS =====

function rollDice(sides, count = 1) {
    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    return rolls;
}

function rollD6() {
    return rollDice(6, 1)[0];
}

function rollD10() {
    return rollDice(10, 1)[0];
}

function rollD12() {
    return rollDice(12, 1)[0];
}

function rollD20() {
    return rollDice(20, 1)[0];
}

function roll3d6() {
    const rolls = rollDice(6, 3);
    return {
        rolls: rolls,
        total: rolls.reduce((a, b) => a + b, 0)
    };
}

function roll2d20Plus10() {
    const rolls = rollDice(20, 2);
    return {
        rolls: rolls,
        total: rolls.reduce((a, b) => a + b, 0) + 10
    };
}

// ===== HELPER FUNCTIONS =====

function getTableItem(roll, ranges, items) {
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (range.length === 1) {
            if (roll === range[0]) return items[i];
        } else {
            if (roll >= range[0] && roll <= range[1]) return items[i];
        }
    }
    return items[0];
}

function getTrait(category, roll) {
    return TRAIT_TABLES[currentLanguage][category][roll - 1];
}

function updateLanguageUI() {
    document.getElementById('langText').textContent = UI_LABELS[currentLanguage].langButton;

    // Update all trait displays
    Object.keys(characterData.traits).forEach(category => {
        if (characterData.traits[category] > 0) {
            const element = document.getElementById(`trait-${category}`);
            if (element) {
                element.textContent = getTrait(category, characterData.traits[category]);
            }
        }
    });

    // Update character sheet if it's populated
    displayCharacterSheet();
}

// ===== NAME & BACKGROUND =====

function rollName() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    characterData.name.gender = gender;

    const nameRoll = rollD20();
    const patronymicRoll = rollD20();
    const originRoll = rollD20();

    const names = gender === 'female' ? FEMALE_NAMES : MALE_NAMES;
    characterData.name.first = names[nameRoll - 1];
    characterData.name.patronymic = PATRONYMIC[patronymicRoll - 1];
    characterData.name.origin = ORIGINS[originRoll - 1];

    const fullName = `${characterData.name.first} child of ${characterData.name.patronymic}, ${characterData.name.origin}`;
    document.getElementById('fullName').textContent = fullName;
    document.getElementById('nameDetails').textContent =
        `(Rolled: ${nameRoll}, ${patronymicRoll}, ${originRoll})`;

    displayCharacterSheet();
}

function rollAge() {
    const ageData = roll2d20Plus10();
    characterData.name.age = ageData.total;

    document.getElementById('ageValue').textContent = ageData.total;
    document.getElementById('ageDice').textContent =
        `(Rolled: ${ageData.rolls[0]} + ${ageData.rolls[1]} + 10)`;

    displayCharacterSheet();
}

// ===== TRAITS =====

function rollAllTraits() {
    const categories = ['physique', 'skin', 'hair', 'face', 'speech', 'clothing', 'virtue', 'vice', 'reputation'];

    categories.forEach(category => {
        const roll = rollD10();
        characterData.traits[category] = roll;
        document.getElementById(`trait-${category}`).textContent = getTrait(category, roll);
    });

    displayCharacterSheet();
}

function rerollTrait(category) {
    const roll = rollD10();
    characterData.traits[category] = roll;
    document.getElementById(`trait-${category}`).textContent = getTrait(category, roll);
    displayCharacterSheet();
}

function rollMisfortune() {
    const roll = rollD10();
    characterData.traits.misfortunes = roll;
    document.getElementById('trait-misfortunes').textContent = getTrait('misfortunes', roll);
    displayCharacterSheet();
}

// ===== ABILITIES =====

function rollAbilities() {
    const abilities = ['kra', 'tek', 'thu'];

    abilities.forEach(ability => {
        const rollData = roll3d6();
        characterData.abilities[ability] = rollData.total;

        document.getElementById(`${ability}-value`).textContent = rollData.total;
        document.getElementById(`${ability}-dice`).textContent =
            `(${rollData.rolls.join(', ')})`;
    });

    // Update inventory slots
    characterData.inventory.slots = characterData.abilities.kra;
    document.getElementById('inventorySlots').textContent = characterData.abilities.kra;
    document.getElementById('slotsTotal').textContent = characterData.abilities.kra;
    updateInventoryDisplay();

    // Enable swap if not used
    if (!swapUsed) {
        document.getElementById('swapControls').style.display = 'block';
    }

    displayCharacterSheet();
}

function executeSwap() {
    const checkboxes = document.querySelectorAll('input[name="swap-ability"]:checked');

    if (checkboxes.length !== 2) {
        alert('Please select exactly two abilities to swap.');
        return;
    }

    const ability1 = checkboxes[0].value;
    const ability2 = checkboxes[1].value;

    // Swap values
    const temp = characterData.abilities[ability1];
    characterData.abilities[ability1] = characterData.abilities[ability2];
    characterData.abilities[ability2] = temp;

    // Update display
    document.getElementById(`${ability1}-value`).textContent = characterData.abilities[ability1];
    document.getElementById(`${ability2}-value`).textContent = characterData.abilities[ability2];

    // Update inventory slots if KRA was swapped
    characterData.inventory.slots = characterData.abilities.kra;
    document.getElementById('inventorySlots').textContent = characterData.abilities.kra;
    document.getElementById('slotsTotal').textContent = characterData.abilities.kra;
    updateInventoryDisplay();

    // Disable swap
    swapUsed = true;
    document.getElementById('swapControls').style.display = 'none';
    checkboxes.forEach(cb => cb.checked = false);

    displayCharacterSheet();
}

// Listen for checkbox changes
document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[name="swap-ability"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checked = document.querySelectorAll('input[name="swap-ability"]:checked');
            if (checked.length > 2) {
                checkbox.checked = false;
            }
        });
    });
});

// ===== STAMINA & MONEY =====

function rollStamina() {
    const roll = rollD6();
    characterData.combat.stamina = roll;
    document.getElementById('stamina-value').textContent = roll;
    displayCharacterSheet();
}

function rollMoney() {
    const rolls = rollDice(6, 3);
    const total = rolls.reduce((a, b) => a + b, 0);
    characterData.inventory.coins = total;
    document.getElementById('money-value').textContent = `${total} (${rolls.join(', ')})`;
    displayCharacterSheet();
}

// ===== INVENTORY MANAGEMENT =====

function addItemToInventory(item) {
    characterData.inventory.items.push(item);
    updateInventoryDisplay();
    displayCharacterSheet();
}

function getTotalSlotsUsed() {
    let total = 1; // Three days' rations
    characterData.inventory.items.forEach(item => {
        total += item.slots || 1;
    });
    return total;
}

function updateInventoryDisplay() {
    const used = getTotalSlotsUsed();
    const total = characterData.inventory.slots;
    const percentage = total > 0 ? (used / total) * 100 : 0;

    document.getElementById('slotsUsed').textContent = used;
    document.getElementById('slotsTotal').textContent = total;

    const bar = document.getElementById('inventoryBar');
    bar.style.width = Math.min(percentage, 100) + '%';

    // Color coding
    bar.className = 'inventory-fill';
    if (percentage >= 100) {
        bar.classList.add('danger');
    } else if (percentage >= 80) {
        bar.classList.add('warning');
    }

    // Warning message
    const warning = document.getElementById('inventoryWarning');
    if (percentage >= 100) {
        warning.textContent = '⚠️ Inventory full! Character reduced to 0 STA.';
        warning.style.display = 'block';
    } else if (percentage >= 80) {
        warning.textContent = '⚠️ Inventory nearly full!';
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }

    // Update equipment list
    const list = document.getElementById('equipmentList');
    list.innerHTML = '<li class="gear-item default">Three days\' rations (1 slot)</li>';

    characterData.inventory.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'gear-item' + (item.bulky ? ' bulky' : '');
        let text = item.name;
        if (item.slots) text += ` (${item.slots} slot${item.slots > 1 ? 's' : ''})`;
        if (item.armor) text += ` [+${item.armor} Armor]`;
        if (item.damage) text += ` [${item.damage} damage]`;
        li.textContent = text;
        list.appendChild(li);
    });
}

// ===== STARTING GEAR =====

function rollAllGear() {
    // Clear existing items except default rations
    characterData.inventory.items = [];

    rollArmor();
    rollHelmetShield();
    rollWeapon();
    rollExpeditionaryGear();
    rollTools();
    rollTrinkets();
    rollBonusItem();
}

function rollArmor() {
    const roll = rollD20();
    const item = getTableItem(roll, ARMOR_TABLE.ranges, ARMOR_TABLE.items);
    if (item.name !== 'None') {
        addItemToInventory(item);
    }
}

function rollHelmetShield() {
    const roll = rollD20();
    const item = getTableItem(roll, HELMET_SHIELD_TABLE.ranges, HELMET_SHIELD_TABLE.items);
    if (item.name !== 'None') {
        addItemToInventory(item);
    }
}

function rollWeapon() {
    const roll = rollD20();
    const item = getTableItem(roll, WEAPON_TABLE.ranges, WEAPON_TABLE.items);
    addItemToInventory(item);
}

function rollExpeditionaryGear() {
    const roll = rollD12();
    const item = EXPEDITIONARY_TABLE[roll - 1];
    addItemToInventory(item);
}

function rollTools() {
    const roll = rollD10();
    const item = TOOLS_TABLE[roll - 1];
    addItemToInventory(item);
}

function rollTrinkets() {
    const roll = rollD10();
    const item = TRINKETS_TABLE[roll - 1];
    addItemToInventory(item);
}

function rollBonusItem() {
    const roll = rollD20();

    if (roll >= 1 && roll <= 5) {
        // Tool or Trinket
        const choice = Math.random() < 0.5;
        if (choice) {
            rollTools();
        } else {
            rollTrinkets();
        }
    } else if (roll >= 6 && roll <= 13) {
        // Expeditionary Gear
        rollExpeditionaryGear();
    } else if (roll >= 14 && roll <= 17) {
        // Armor or Weapon
        const choice = Math.random() < 0.5;
        if (choice) {
            rollArmor();
        } else {
            rollWeapon();
        }
    } else {
        // Incantation (18-20)
        addItemToInventory({ name: 'Incantation (magical)', slots: 1 });
    }
}

// ===== COMPLETE CHARACTER GENERATION =====

function rollCompleteCharacter() {
    // Reset
    characterData.inventory.items = [];
    swapUsed = false;

    // Roll everything
    rollName();
    rollAge();
    rollAllTraits();
    rollAbilities();
    rollStamina();
    rollMoney();
    rollAllGear();

    // Scroll to character sheet
    document.getElementById('sheet-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== CHARACTER SHEET DISPLAY =====

function displayCharacterSheet() {
    // Name and Origin
    if (characterData.name.first) {
        const fullName = `${characterData.name.first} child of ${characterData.name.patronymic}`;
        document.getElementById('sheetName').textContent = fullName;

        let origin = characterData.name.origin;
        if (characterData.name.age > 0) {
            origin += `, Age ${characterData.name.age}`;
        }
        document.getElementById('sheetOrigin').textContent = origin;
    }

    // Appearance
    const appearance = [];
    if (characterData.traits.physique) appearance.push(`Physique: ${getTrait('physique', characterData.traits.physique)}`);
    if (characterData.traits.skin) appearance.push(`Skin: ${getTrait('skin', characterData.traits.skin)}`);
    if (characterData.traits.hair) appearance.push(`Hair: ${getTrait('hair', characterData.traits.hair)}`);
    if (characterData.traits.face) appearance.push(`Face: ${getTrait('face', characterData.traits.face)}`);
    if (characterData.traits.clothing) appearance.push(`Clothing: ${getTrait('clothing', characterData.traits.clothing)}`);

    const appearanceList = document.getElementById('sheetAppearance');
    appearanceList.innerHTML = appearance.map(t => `<li>${t}</li>`).join('');

    // Personality
    const personality = [];
    if (characterData.traits.speech) personality.push(`Speech: ${getTrait('speech', characterData.traits.speech)}`);
    if (characterData.traits.virtue) personality.push(`Virtue: ${getTrait('virtue', characterData.traits.virtue)}`);
    if (characterData.traits.vice) personality.push(`Vice: ${getTrait('vice', characterData.traits.vice)}`);
    if (characterData.traits.reputation) personality.push(`Reputation: ${getTrait('reputation', characterData.traits.reputation)}`);
    if (characterData.traits.misfortunes) personality.push(`Misfortune: ${getTrait('misfortunes', characterData.traits.misfortunes)}`);

    const personalityList = document.getElementById('sheetPersonality');
    personalityList.innerHTML = personality.map(t => `<li>${t}</li>`).join('');

    // Abilities
    const abilities = [];
    if (characterData.abilities.kra) abilities.push(`KRA (Kratos): ${characterData.abilities.kra}`);
    if (characterData.abilities.tek) abilities.push(`TEK (Tekhne): ${characterData.abilities.tek}`);
    if (characterData.abilities.thu) abilities.push(`THU (Thumos): ${characterData.abilities.thu}`);

    const abilitiesList = document.getElementById('sheetAbilities');
    abilitiesList.innerHTML = abilities.map(a => `<li>${a}</li>`).join('');

    // Combat
    const combat = [];
    if (characterData.combat.stamina) combat.push(`Stamina: ${characterData.combat.stamina}`);

    const combatList = document.getElementById('sheetCombat');
    combatList.innerHTML = combat.map(c => `<li>${c}</li>`).join('');

    // Inventory
    const inventoryList = document.getElementById('sheetInventory');
    inventoryList.innerHTML = '<li>Three days\' rations</li>';
    characterData.inventory.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        inventoryList.appendChild(li);
    });

    const used = getTotalSlotsUsed();
    document.getElementById('sheetSlotsUsed').textContent = used;
    document.getElementById('sheetSlotsTotal').textContent = characterData.inventory.slots;

    // Money
    if (characterData.inventory.coins) {
        document.getElementById('sheetMoney').textContent = `${characterData.inventory.coins} electron coins`;
    }
}

// ===== LANGUAGE TOGGLE =====

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'it' : 'en';
    updateLanguageUI();
}

// Add event listener
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('languageToggle').addEventListener('click', toggleLanguage);
    document.getElementById('rollAllBtn').addEventListener('click', rollCompleteCharacter);
});

// ===== EXPORT & PRINT =====

function exportCharacter() {
    let text = '=== THÁLASSA CHARACTER SHEET ===\n\n';

    // Name
    if (characterData.name.first) {
        text += `NAME: ${characterData.name.first} child of ${characterData.name.patronymic}\n`;
        text += `ORIGIN: ${characterData.name.origin}\n`;
        text += `AGE: ${characterData.name.age}\n\n`;
    }

    // Appearance
    text += '--- APPEARANCE ---\n';
    if (characterData.traits.physique) text += `Physique: ${getTrait('physique', characterData.traits.physique)}\n`;
    if (characterData.traits.skin) text += `Skin: ${getTrait('skin', characterData.traits.skin)}\n`;
    if (characterData.traits.hair) text += `Hair: ${getTrait('hair', characterData.traits.hair)}\n`;
    if (characterData.traits.face) text += `Face: ${getTrait('face', characterData.traits.face)}\n`;
    if (characterData.traits.clothing) text += `Clothing: ${getTrait('clothing', characterData.traits.clothing)}\n`;
    text += '\n';

    // Personality
    text += '--- PERSONALITY ---\n';
    if (characterData.traits.speech) text += `Speech: ${getTrait('speech', characterData.traits.speech)}\n`;
    if (characterData.traits.virtue) text += `Virtue: ${getTrait('virtue', characterData.traits.virtue)}\n`;
    if (characterData.traits.vice) text += `Vice: ${getTrait('vice', characterData.traits.vice)}\n`;
    if (characterData.traits.reputation) text += `Reputation: ${getTrait('reputation', characterData.traits.reputation)}\n`;
    if (characterData.traits.misfortunes) text += `Misfortune: ${getTrait('misfortunes', characterData.traits.misfortunes)}\n`;
    text += '\n';

    // Abilities
    text += '--- ABILITIES ---\n';
    text += `KRA (Kratos): ${characterData.abilities.kra}\n`;
    text += `TEK (Tekhne): ${characterData.abilities.tek}\n`;
    text += `THU (Thumos): ${characterData.abilities.thu}\n\n`;

    // Combat
    text += '--- COMBAT ---\n';
    text += `Stamina: ${characterData.combat.stamina}\n\n`;

    // Inventory
    text += `--- INVENTORY (${getTotalSlotsUsed()}/${characterData.inventory.slots} slots) ---\n`;
    text += `Three days' rations\n`;
    characterData.inventory.items.forEach(item => {
        text += `${item.name}\n`;
    });
    text += '\n';

    // Money
    text += `--- MONEY ---\n`;
    text += `${characterData.inventory.coins} electron coins\n\n`;

    text += '===================================\n';
    text += 'Created with Thálassa Character Creator\n';
    text += 'Thálassa is licensed under CC-BY-SA 4.0\n';

    // Download
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thalassa_${characterData.name.first || 'character'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function printCharacter() {
    window.print();
}

function resetCharacter() {
    if (confirm('Are you sure you want to start over? This will clear your current character.')) {
        location.reload();
    }
}
