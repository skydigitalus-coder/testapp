// Product database
const products = [
    // Vape Devices
    {
        id: 1,
        name: "CloudMax Pro X",
        category: "vapes",
        price: 89.99,
        description: "Advanced mod with temperature control and 200W power output",
        icon: "💨",
        featured: true
    },
    {
        id: 2,
        name: "PocketVape Mini",
        category: "vapes",
        price: 34.99,
        description: "Compact pod system perfect for beginners and travel",
        icon: "📱",
        featured: true
    },
    {
        id: 3,
        name: "VapePro Elite",
        category: "vapes",
        price: 129.99,
        description: "Premium device with OLED display and customizable LED",
        icon: "⚡",
        featured: false
    },
    {
        id: 4,
        name: "Stealth Pod Kit",
        category: "vapes",
        price: 44.99,
        description: "Discreet all-in-one pod system with draw activation",
        icon: "🔋",
        featured: false
    },
    {
        id: 5,
        name: "TurboMod 220W",
        category: "vapes",
        price: 99.99,
        description: "Dual battery mod with smart wattage modes",
        icon: "⚙️",
        featured: false
    },

    // E-Liquids
    {
        id: 6,
        name: "Tropical Paradise",
        category: "eliquids",
        price: 19.99,
        description: "Exotic blend of mango, pineapple, and passion fruit",
        icon: "🥭",
        featured: true
    },
    {
        id: 7,
        name: "Mint Ice Blast",
        category: "eliquids",
        price: 17.99,
        description: "Refreshing cool mint with icy menthol finish",
        icon: "🌿",
        featured: false
    },
    {
        id: 8,
        name: "Strawberry Cream",
        category: "eliquids",
        price: 19.99,
        description: "Sweet strawberries blended with smooth vanilla cream",
        icon: "🍓",
        featured: true
    },
    {
        id: 9,
        name: "Blue Razz Lemonade",
        category: "eliquids",
        price: 18.99,
        description: "Tangy blue raspberry mixed with fresh lemonade",
        icon: "🍋",
        featured: false
    },
    {
        id: 10,
        name: "Caramel Tobacco",
        category: "eliquids",
        price: 21.99,
        description: "Rich tobacco flavor enhanced with sweet caramel notes",
        icon: "🍂",
        featured: false
    },
    {
        id: 11,
        name: "Watermelon Wave",
        category: "eliquids",
        price: 17.99,
        description: "Juicy watermelon with a hint of cooling sensation",
        icon: "🍉",
        featured: false
    },

    // Accessories
    {
        id: 12,
        name: "Premium Coil Pack",
        category: "accessories",
        price: 14.99,
        description: "5-pack of mesh coils for enhanced flavor and clouds",
        icon: "🔧",
        featured: false
    },
    {
        id: 13,
        name: "Battery Charger Pro",
        category: "accessories",
        price: 24.99,
        description: "Smart charger for 18650 batteries with LCD display",
        icon: "🔌",
        featured: true
    },
    {
        id: 14,
        name: "Carrying Case Deluxe",
        category: "accessories",
        price: 29.99,
        description: "Premium vape case with storage for device and liquids",
        icon: "💼",
        featured: false
    },
    {
        id: 15,
        name: "Replacement Pods (3pk)",
        category: "accessories",
        price: 12.99,
        description: "Compatible refillable pods for most pod systems",
        icon: "📦",
        featured: false
    },
    {
        id: 16,
        name: "18650 Battery Pair",
        category: "accessories",
        price: 19.99,
        description: "High-drain authentic batteries for mods (2-pack)",
        icon: "🔋",
        featured: false
    },
    {
        id: 17,
        name: "Drip Tip Collection",
        category: "accessories",
        price: 9.99,
        description: "Assorted 510 drip tips in various colors",
        icon: "💎",
        featured: false
    },

    // Novelties
    {
        id: 18,
        name: "LED Fidget Spinner",
        category: "novelties",
        price: 12.99,
        description: "Light-up fidget spinner with multiple LED patterns",
        icon: "✨",
        featured: false
    },
    {
        id: 19,
        name: "Incense Starter Kit",
        category: "novelties",
        price: 16.99,
        description: "Variety pack of premium incense with holder",
        icon: "🕯️",
        featured: false
    },
    {
        id: 20,
        name: "Mood Ring Collection",
        category: "novelties",
        price: 8.99,
        description: "Set of 3 color-changing mood rings",
        icon: "💍",
        featured: false
    },
    {
        id: 21,
        name: "Glow Sticks Party Pack",
        category: "novelties",
        price: 14.99,
        description: "100-pack of assorted color glow sticks",
        icon: "🌟",
        featured: false
    },
    {
        id: 22,
        name: "Mini Lava Lamp",
        category: "novelties",
        price: 24.99,
        description: "Classic lava lamp in multiple color options",
        icon: "🔮",
        featured: true
    },
    {
        id: 23,
        name: "Stress Relief Set",
        category: "novelties",
        price: 19.99,
        description: "Collection of stress balls and squeeze toys",
        icon: "🎈",
        featured: false
    },
    {
        id: 24,
        name: "Magnetic Sculpture Kit",
        category: "novelties",
        price: 29.99,
        description: "Create endless shapes with magnetic balls",
        icon: "🧲",
        featured: false
    },

    // Glass & Pipes
    {
        id: 25,
        name: "Glass Pipe Collection",
        category: "glass",
        price: 29.99,
        description: "Handcrafted glass pipe with unique color pattern",
        icon: "💎",
        featured: true
    },
    {
        id: 26,
        name: "Premium Water Pipe",
        category: "glass",
        price: 89.99,
        description: "High-quality glass water pipe with percolator",
        icon: "🔮",
        featured: false
    },
    {
        id: 27,
        name: "Bubbler Pipe",
        category: "glass",
        price: 44.99,
        description: "Compact bubbler with smooth filtration",
        icon: "💠",
        featured: true
    },
    {
        id: 28,
        name: "Chillum One-Hitter",
        category: "glass",
        price: 12.99,
        description: "Classic glass chillum for on-the-go",
        icon: "🔷",
        featured: false
    },

    // Kratom Products
    {
        id: 29,
        name: "Premium Kratom Powder",
        category: "kratom",
        price: 24.99,
        description: "High-quality kratom powder from trusted sources",
        icon: "🌿",
        featured: true
    },
    {
        id: 30,
        name: "Kratom Capsules",
        category: "kratom",
        price: 29.99,
        description: "Convenient pre-measured kratom capsules",
        icon: "💊",
        featured: false
    },
    {
        id: 31,
        name: "Kratom Extract",
        category: "kratom",
        price: 34.99,
        description: "Concentrated kratom extract for experienced users",
        icon: "🧪",
        featured: false
    },

    // Detox Products
    {
        id: 32,
        name: "Detox Cleanse Kit",
        category: "detox",
        price: 39.99,
        description: "Complete detox system for thorough cleansing",
        icon: "🧬",
        featured: true
    },
    {
        id: 33,
        name: "Quick Detox Drink",
        category: "detox",
        price: 19.99,
        description: "Fast-acting detox beverage",
        icon: "🥤",
        featured: false
    },
    {
        id: 34,
        name: "Detox Pills",
        category: "detox",
        price: 24.99,
        description: "Daily detox supplement capsules",
        icon: "💊",
        featured: false
    }
];

// Category display names
const categoryNames = {
    'glass': 'Glass & Pipes',
    'vapes': 'Vape Devices',
    'eliquids': 'E-Liquids',
    'kratom': 'Kratom',
    'detox': 'Detox',
    'accessories': 'Accessories'
};
