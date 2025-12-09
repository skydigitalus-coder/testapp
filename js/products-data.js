// Comprehensive Product Database for Pandora's Box
// Updated with full product details including ratings, images, brands, and category-specific attributes

const products = [
    // ========== E-LIQUIDS ==========
    {
        id: 'eliq-001',
        name: 'Tropical Paradise Mix',
        brand: 'Cloud Chasers',
        category: 'eliquids',
        subcategories: ['fruity', 'tropical'],
        price: 24.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Tropical+Paradise',
            'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Tropical+Paradise+2'
        ],
        description: 'Exotic blend of mango, pineapple, and passion fruit that transports you to a tropical island.',
        features: [
            'Premium 70/30 VG/PG blend',
            'Available in 0mg, 3mg, 6mg nicotine',
            '60ml bottle',
            'Child-resistant cap'
        ],
        rating: 4.8,
        reviewCount: 156,
        stock: 'in-stock',
        isNew: false,
        tags: ['fruity', 'tropical', 'sweet'],
        // E-liquid specific
        nicotineStrength: ['0mg', '3mg', '6mg'],
        flavorProfile: 'Fruity',
        bottleSize: '60ml',
        vgPgRatio: '70/30'
    },
    {
        id: 'eliq-002',
        name: 'Mint Ice Blast',
        brand: 'Arctic Vapes',
        category: 'eliquids',
        subcategories: ['menthol', 'mint'],
        price: 22.99,
        salePrice: 18.99,
        images: [
            'https://via.placeholder.com/400x400/0d9488/ffffff?text=Mint+Ice',
            'https://via.placeholder.com/400x400/14b8a6/ffffff?text=Mint+Ice+2'
        ],
        description: 'Refreshing cool mint with an icy menthol finish that invigorates your senses.',
        features: [
            'Intense cooling sensation',
            '50/50 VG/PG for pod systems',
            '30ml bottle',
            'Perfect for all-day vaping'
        ],
        rating: 4.6,
        reviewCount: 89,
        stock: 'in-stock',
        isNew: false,
        tags: ['menthol', 'mint', 'cooling'],
        nicotineStrength: ['0mg', '3mg', '6mg', '12mg'],
        flavorProfile: 'Menthol',
        bottleSize: '30ml',
        vgPgRatio: '50/50'
    },
    {
        id: 'eliq-003',
        name: 'Strawberry Cream Dream',
        brand: 'Sweet Clouds',
        category: 'eliquids',
        subcategories: ['dessert', 'fruity'],
        price: 24.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/ef4444/ffffff?text=Strawberry+Cream',
            'https://via.placeholder.com/400x400/fbbf24/ffffff?text=Strawberry+Cream+2'
        ],
        description: 'Sweet strawberries blended with smooth vanilla cream for a decadent dessert vape.',
        features: [
            'Award-winning flavor',
            '70/30 VG/PG blend',
            '100ml bottle',
            'Steep-free ready to vape'
        ],
        rating: 4.9,
        reviewCount: 234,
        stock: 'in-stock',
        isNew: true,
        tags: ['dessert', 'strawberry', 'cream'],
        nicotineStrength: ['0mg', '3mg', '6mg'],
        flavorProfile: 'Dessert',
        bottleSize: '100ml',
        vgPgRatio: '70/30'
    },
    {
        id: 'eliq-004',
        name: 'Blue Razz Lemonade',
        brand: 'Vapor Fusion',
        category: 'eliquids',
        subcategories: ['fruity', 'candy'],
        price: 21.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/3b82f6/ffffff?text=Blue+Razz',
            'https://via.placeholder.com/400x400/60a5fa/ffffff?text=Blue+Razz+2'
        ],
        description: 'Tangy blue raspberry mixed with fresh lemonade for the perfect summer vape.',
        features: [
            'Authentic candy flavor',
            '60ml unicorn bottle',
            'Salt nicotine available',
            'Lab tested & certified'
        ],
        rating: 4.7,
        reviewCount: 178,
        stock: 'in-stock',
        isNew: false,
        tags: ['candy', 'raspberry', 'lemonade'],
        nicotineStrength: ['0mg', '3mg', '6mg', '25mg Salt', '50mg Salt'],
        flavorProfile: 'Candy',
        bottleSize: '60ml',
        vgPgRatio: '70/30'
    },
    {
        id: 'eliq-005',
        name: 'Caramel Tobacco Reserve',
        brand: 'Heritage Vapes',
        category: 'eliquids',
        subcategories: ['tobacco', 'dessert'],
        price: 26.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/92400e/ffffff?text=Caramel+Tobacco',
            'https://via.placeholder.com/400x400/78350f/ffffff?text=Caramel+Tobacco+2'
        ],
        description: 'Rich tobacco flavor enhanced with sweet caramel notes for sophisticated vapers.',
        features: [
            'Premium tobacco extract',
            'Aged for 30 days',
            '60ml glass bottle',
            'Complex flavor profile'
        ],
        rating: 4.5,
        reviewCount: 67,
        stock: 'in-stock',
        isNew: false,
        tags: ['tobacco', 'caramel', 'premium'],
        nicotineStrength: ['0mg', '3mg', '6mg', '12mg'],
        flavorProfile: 'Tobacco',
        bottleSize: '60ml',
        vgPgRatio: '60/40'
    },
    {
        id: 'eliq-006',
        name: 'Watermelon Wave',
        brand: 'Summer Breeze',
        category: 'eliquids',
        subcategories: ['fruity'],
        price: 19.99,
        salePrice: 16.99,
        images: [
            'https://via.placeholder.com/400x400/10b981/ffffff?text=Watermelon',
            'https://via.placeholder.com/400x400/34d399/ffffff?text=Watermelon+2'
        ],
        description: 'Juicy watermelon with a hint of cooling sensation for a refreshing all-day vape.',
        features: [
            'Natural watermelon flavor',
            'Light menthol kick',
            '30ml bottle',
            'Perfect for summer'
        ],
        rating: 4.4,
        reviewCount: 92,
        stock: 'in-stock',
        isNew: false,
        tags: ['fruity', 'watermelon', 'refreshing'],
        nicotineStrength: ['0mg', '3mg', '6mg'],
        flavorProfile: 'Fruity',
        bottleSize: '30ml',
        vgPgRatio: '70/30'
    },

    // ========== GLASS PIPES ==========
    {
        id: 'glass-001',
        name: 'Helix Spiral Spoon Pipe',
        brand: 'GlassArt Studios',
        category: 'glass-pipes',
        subcategories: ['hand-pipes', 'spoons'],
        price: 34.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Helix+Spiral',
            'https://via.placeholder.com/400x400/a78bfa/ffffff?text=Helix+Spiral+2'
        ],
        description: 'Handcrafted glass spoon pipe featuring a mesmerizing spiral design in vibrant colors.',
        features: [
            'Borosilicate glass construction',
            'Heat-resistant',
            'Deep bowl design',
            'Each piece is unique'
        ],
        rating: 4.7,
        reviewCount: 45,
        stock: 'in-stock',
        isNew: false,
        tags: ['handmade', 'artistic', 'durable'],
        // Glass specific
        glassType: 'Spoon',
        height: '5 inches',
        material: 'Borosilicate Glass',
        colors: ['Purple', 'Blue', 'Green']
    },
    {
        id: 'glass-002',
        name: 'Dragon Scale Bubbler',
        brand: 'MythicGlass',
        category: 'glass-pipes',
        subcategories: ['bubblers', 'water-pipes'],
        price: 64.99,
        salePrice: 54.99,
        images: [
            'https://via.placeholder.com/400x400/d97706/ffffff?text=Dragon+Bubbler',
            'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Dragon+Bubbler+2'
        ],
        description: 'Stunning bubbler with dragon scale texture providing smooth water-filtered hits.',
        features: [
            'Built-in percolator',
            'Stable flat base',
            'Artistic dragon design',
            'Premium craftsmanship'
        ],
        rating: 4.9,
        reviewCount: 78,
        stock: 'in-stock',
        isNew: true,
        tags: ['bubbler', 'artistic', 'premium'],
        glassType: 'Bubbler',
        height: '7 inches',
        material: 'Borosilicate Glass',
        colors: ['Gold', 'Red', 'Black']
    },
    {
        id: 'glass-003',
        name: 'Classic Sherlock Pipe',
        brand: 'Traditional Glass',
        category: 'glass-pipes',
        subcategories: ['hand-pipes', 'sherlock'],
        price: 42.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/0f766e/ffffff?text=Sherlock',
            'https://via.placeholder.com/400x400/14b8a6/ffffff?text=Sherlock+2'
        ],
        description: 'Elegant Sherlock-style pipe with a curved neck for cool, smooth draws.',
        features: [
            'Classic design',
            'Comfortable grip',
            'Large bowl capacity',
            'Marble accents'
        ],
        rating: 4.6,
        reviewCount: 56,
        stock: 'in-stock',
        isNew: false,
        tags: ['classic', 'elegant', 'comfortable'],
        glassType: 'Sherlock',
        height: '6 inches',
        material: 'Borosilicate Glass',
        colors: ['Teal', 'Amber', 'Clear']
    },
    {
        id: 'glass-004',
        name: 'Mini Beaker Bong 10"',
        brand: 'CloudBase',
        category: 'glass-pipes',
        subcategories: ['bongs', 'water-pipes'],
        price: 89.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/7c3aed/ffffff?text=Beaker+Bong',
            'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Beaker+Bong+2'
        ],
        description: 'Compact beaker-style water pipe with ice pinch and diffused downstem.',
        features: [
            'Ice pinch for cooler hits',
            'Diffused downstem included',
            'Thick 5mm glass',
            'Stable beaker base'
        ],
        rating: 4.8,
        reviewCount: 124,
        stock: 'in-stock',
        isNew: false,
        tags: ['bong', 'water-pipe', 'durable'],
        glassType: 'Bong',
        height: '10 inches',
        material: 'Thick Borosilicate Glass',
        colors: ['Clear', 'Blue', 'Green']
    },
    {
        id: 'glass-005',
        name: 'Steamroller XL',
        brand: 'PowerGlass',
        category: 'glass-pipes',
        subcategories: ['hand-pipes', 'steamrollers'],
        price: 29.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/dc2626/ffffff?text=Steamroller',
            'https://via.placeholder.com/400x400/ef4444/ffffff?text=Steamroller+2'
        ],
        description: 'Large steamroller pipe for massive hits and maximum airflow.',
        features: [
            'Wide bore design',
            'Carb on end',
            'Thick glass',
            'Easy to clean'
        ],
        rating: 4.5,
        reviewCount: 38,
        stock: 'low-stock',
        isNew: false,
        tags: ['powerful', 'large', 'simple'],
        glassType: 'Steamroller',
        height: '8 inches',
        material: 'Borosilicate Glass',
        colors: ['Red', 'Black', 'Clear']
    },
    {
        id: 'glass-006',
        name: 'Glow-in-Dark Chillum',
        brand: 'NightGlow',
        category: 'glass-pipes',
        subcategories: ['hand-pipes', 'chillums'],
        price: 16.99,
        salePrice: 12.99,
        images: [
            'https://via.placeholder.com/400x400/22c55e/ffffff?text=Glow+Chillum',
            'https://via.placeholder.com/400x400/10b981/ffffff?text=Glow+Chillum+2'
        ],
        description: 'Portable chillum that glows in the dark for easy finding at night.',
        features: [
            'Glow-in-dark glass',
            'Compact size',
            'Perfect for travel',
            'Durable construction'
        ],
        rating: 4.3,
        reviewCount: 67,
        stock: 'in-stock',
        isNew: true,
        tags: ['portable', 'novelty', 'fun'],
        glassType: 'Chillum',
        height: '4 inches',
        material: 'Glow Glass',
        colors: ['Green', 'Blue', 'Purple']
    },

    // ========== KRATOM ==========
    {
        id: 'krat-001',
        name: 'Red Bali Kratom Powder',
        brand: 'Premium Botanicals',
        category: 'kratom',
        subcategories: ['powder', 'red-vein'],
        price: 24.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/dc2626/ffffff?text=Red+Bali',
            'https://via.placeholder.com/400x400/b91c1c/ffffff?text=Red+Bali+2'
        ],
        description: 'Premium Red Bali kratom powder sourced from mature trees in Indonesia.',
        features: [
            'Lab tested for purity',
            'Finely ground powder',
            'Resealable bag',
            'Sourced from sustainable farms'
        ],
        rating: 4.8,
        reviewCount: 203,
        stock: 'in-stock',
        isNew: false,
        tags: ['red-vein', 'premium', 'powder'],
        // Kratom specific
        strain: 'Red Bali',
        form: 'Powder',
        veinColor: 'Red',
        weight: '100g'
    },
    {
        id: 'krat-002',
        name: 'Green Maeng Da Capsules',
        brand: 'Nature\'s Leaf',
        category: 'kratom',
        subcategories: ['capsules', 'green-vein'],
        price: 32.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/16a34a/ffffff?text=Green+Maeng+Da',
            'https://via.placeholder.com/400x400/22c55e/ffffff?text=Green+Maeng+Da+2'
        ],
        description: 'Convenient Green Maeng Da kratom capsules for precise dosing.',
        features: [
            '500mg per capsule',
            'Vegetarian capsules',
            'Lab certified',
            '60 count bottle'
        ],
        rating: 4.7,
        reviewCount: 145,
        stock: 'in-stock',
        isNew: false,
        tags: ['green-vein', 'capsules', 'convenient'],
        strain: 'Green Maeng Da',
        form: 'Capsules',
        veinColor: 'Green',
        weight: '30g (60 capsules)'
    },
    {
        id: 'krat-003',
        name: 'White Borneo Powder',
        brand: 'Island Kratom',
        category: 'kratom',
        subcategories: ['powder', 'white-vein'],
        price: 26.99,
        salePrice: 22.99,
        images: [
            'https://via.placeholder.com/400x400/f5f5f5/333333?text=White+Borneo',
            'https://via.placeholder.com/400x400/e5e5e5/333333?text=White+Borneo+2'
        ],
        description: 'Premium White Borneo kratom powder from ancient Indonesian forests.',
        features: [
            'Ultra-fine grind',
            'Freshly harvested',
            'Third-party tested',
            'Vacuum sealed'
        ],
        rating: 4.6,
        reviewCount: 98,
        stock: 'in-stock',
        isNew: true,
        tags: ['white-vein', 'premium', 'powder'],
        strain: 'White Borneo',
        form: 'Powder',
        veinColor: 'White',
        weight: '100g'
    },
    {
        id: 'krat-004',
        name: 'Gold Blend Extract',
        brand: 'Elite Extracts',
        category: 'kratom',
        subcategories: ['extract', 'enhanced'],
        price: 44.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/f59e0b/ffffff?text=Gold+Extract',
            'https://via.placeholder.com/400x400/d97706/ffffff?text=Gold+Extract+2'
        ],
        description: 'Concentrated kratom extract blend for experienced users.',
        features: [
            '10x concentrated',
            'Full spectrum alkaloids',
            'Small serving size',
            'Premium quality'
        ],
        rating: 4.9,
        reviewCount: 167,
        stock: 'in-stock',
        isNew: false,
        tags: ['extract', 'concentrated', 'advanced'],
        strain: 'Gold Blend',
        form: 'Extract',
        veinColor: 'Gold',
        weight: '10g'
    },
    {
        id: 'krat-005',
        name: 'Red Maeng Da Capsules',
        brand: 'Premium Botanicals',
        category: 'kratom',
        subcategories: ['capsules', 'red-vein'],
        price: 34.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/991b1b/ffffff?text=Red+Maeng+Da',
            'https://via.placeholder.com/400x400/b91c1c/ffffff?text=Red+Maeng+Da+2'
        ],
        description: 'High-quality Red Maeng Da kratom in easy-to-take capsule form.',
        features: [
            '750mg per capsule',
            'Premium strain',
            '100 count bottle',
            'Quality guaranteed'
        ],
        rating: 4.8,
        reviewCount: 189,
        stock: 'in-stock',
        isNew: false,
        tags: ['red-vein', 'capsules', 'premium'],
        strain: 'Red Maeng Da',
        form: 'Capsules',
        veinColor: 'Red',
        weight: '75g (100 capsules)'
    },
    {
        id: 'krat-006',
        name: 'Green Borneo Powder',
        brand: 'Nature\'s Leaf',
        category: 'kratom',
        subcategories: ['powder', 'green-vein'],
        price: 23.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/15803d/ffffff?text=Green+Borneo',
            'https://via.placeholder.com/400x400/16a34a/ffffff?text=Green+Borneo+2'
        ],
        description: 'Balanced Green Borneo kratom powder perfect for daily use.',
        features: [
            'Consistent quality',
            'Finely milled',
            'Lab verified',
            'Resealable pouch'
        ],
        rating: 4.5,
        reviewCount: 112,
        stock: 'in-stock',
        isNew: false,
        tags: ['green-vein', 'balanced', 'powder'],
        strain: 'Green Borneo',
        form: 'Powder',
        veinColor: 'Green',
        weight: '100g'
    },

    // ========== VAPE DEVICES ==========
    {
        id: 'vape-001',
        name: 'CloudMax Pro X',
        brand: 'VapeTech',
        category: 'vapes',
        subcategories: ['mods', 'advanced'],
        price: 89.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/1e40af/ffffff?text=CloudMax+Pro',
            'https://via.placeholder.com/400x400/3b82f6/ffffff?text=CloudMax+Pro+2'
        ],
        description: 'Advanced mod with temperature control and 200W power output for serious vapers.',
        features: [
            '200W max output',
            'Temperature control',
            'OLED display',
            'Dual 18650 batteries'
        ],
        rating: 4.7,
        reviewCount: 234,
        stock: 'in-stock',
        isNew: false,
        tags: ['advanced', 'powerful', 'customizable']
    },
    {
        id: 'vape-002',
        name: 'PocketVape Mini Pod',
        brand: 'SimplePods',
        category: 'vapes',
        subcategories: ['pod-systems', 'beginner'],
        price: 34.99,
        salePrice: 29.99,
        images: [
            'https://via.placeholder.com/400x400/6366f1/ffffff?text=PocketVape',
            'https://via.placeholder.com/400x400/818cf8/ffffff?text=PocketVape+2'
        ],
        description: 'Compact pod system perfect for beginners and travel.',
        features: [
            'Draw-activated',
            '2ml refillable pods',
            '650mAh battery',
            'USB-C charging'
        ],
        rating: 4.5,
        reviewCount: 456,
        stock: 'in-stock',
        isNew: true,
        tags: ['beginner', 'portable', 'simple']
    },

    // ========== DETOX ==========
    {
        id: 'detox-001',
        name: 'Total Cleanse 10-Day System',
        brand: 'CleanLife',
        category: 'detox',
        subcategories: ['kits', 'complete'],
        price: 49.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/059669/ffffff?text=Total+Cleanse',
            'https://via.placeholder.com/400x400/10b981/ffffff?text=Total+Cleanse+2'
        ],
        description: 'Complete 10-day detox system for thorough cleansing.',
        features: [
            '10-day program',
            'Dietary guide included',
            'Natural ingredients',
            'Money-back guarantee'
        ],
        rating: 4.6,
        reviewCount: 178,
        stock: 'in-stock',
        isNew: false,
        tags: ['complete', 'effective', 'natural']
    },
    {
        id: 'detox-002',
        name: 'Quick Flush Detox Drink',
        brand: 'RapidCleanse',
        category: 'detox',
        subcategories: ['drinks', 'quick'],
        price: 29.99,
        salePrice: 24.99,
        images: [
            'https://via.placeholder.com/400x400/0891b2/ffffff?text=Quick+Flush',
            'https://via.placeholder.com/400x400/06b6d4/ffffff?text=Quick+Flush+2'
        ],
        description: 'Fast-acting detox beverage for same-day results.',
        features: [
            'Works in 90 minutes',
            'Tropical flavor',
            'Effective formula',
            'Easy to use'
        ],
        rating: 4.4,
        reviewCount: 267,
        stock: 'in-stock',
        isNew: false,
        tags: ['quick', 'effective', 'convenient']
    },

    // ========== ACCESSORIES ==========
    {
        id: 'acc-001',
        name: 'Premium Mesh Coil Pack (5pk)',
        brand: 'CoilMaster',
        category: 'accessories',
        subcategories: ['coils', 'replacement-parts'],
        price: 16.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/64748b/ffffff?text=Mesh+Coils',
            'https://via.placeholder.com/400x400/94a3b8/ffffff?text=Mesh+Coils+2'
        ],
        description: '5-pack of premium mesh coils for enhanced flavor and vapor production.',
        features: [
            'Mesh technology',
            '0.15Ω resistance',
            'Long lasting',
            'Compatible with most tanks'
        ],
        rating: 4.7,
        reviewCount: 345,
        stock: 'in-stock',
        isNew: false,
        tags: ['coils', 'mesh', 'quality']
    },
    {
        id: 'acc-002',
        name: 'Smart Battery Charger',
        brand: 'ChargePro',
        category: 'accessories',
        subcategories: ['chargers', 'electronics'],
        price: 28.99,
        salePrice: null,
        images: [
            'https://via.placeholder.com/400x400/475569/ffffff?text=Charger',
            'https://via.placeholder.com/400x400/64748b/ffffff?text=Charger+2'
        ],
        description: 'Smart charger for 18650 batteries with LCD display and safety features.',
        features: [
            '4-bay charging',
            'LCD display',
            'Overcharge protection',
            'Fast charging mode'
        ],
        rating: 4.8,
        reviewCount: 456,
        stock: 'in-stock',
        isNew: false,
        tags: ['charger', 'safe', 'smart']
    }
];

// Brand list
const brands = [
    'Cloud Chasers',
    'Arctic Vapes',
    'Sweet Clouds',
    'Vapor Fusion',
    'Heritage Vapes',
    'Summer Breeze',
    'GlassArt Studios',
    'MythicGlass',
    'Traditional Glass',
    'CloudBase',
    'PowerGlass',
    'NightGlow',
    'Premium Botanicals',
    'Nature\'s Leaf',
    'Island Kratom',
    'Elite Extracts',
    'VapeTech',
    'SimplePods',
    'CleanLife',
    'RapidCleanse',
    'CoilMaster',
    'ChargePro'
];

// Category configurations
const categoryConfig = {
    'eliquids': {
        name: 'E-Liquids',
        description: 'Premium e-liquids in a variety of flavors and nicotine strengths',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            flavorProfile: { type: 'checkbox', label: 'Flavor Profile', options: ['Fruity', 'Menthol', 'Dessert', 'Candy', 'Tobacco'] },
            nicotineStrength: { type: 'checkbox', label: 'Nicotine Strength', options: ['0mg', '3mg', '6mg', '12mg', '25mg Salt', '50mg Salt'] },
            bottleSize: { type: 'checkbox', label: 'Bottle Size', options: ['30ml', '60ml', '100ml'] },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 50 }
        }
    },
    'glass-pipes': {
        name: 'Glass Pipes',
        description: 'Handcrafted glass pipes, bongs, and water pipes',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            glassType: { type: 'checkbox', label: 'Type', options: ['Spoon', 'Bubbler', 'Sherlock', 'Bong', 'Steamroller', 'Chillum'] },
            height: { type: 'checkbox', label: 'Height', options: ['4 inches', '5 inches', '6 inches', '7 inches', '8 inches', '10 inches'] },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 100 }
        }
    },
    'kratom': {
        name: 'Kratom',
        description: 'Premium kratom products in various strains and forms',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            strain: { type: 'checkbox', label: 'Strain' },
            veinColor: { type: 'checkbox', label: 'Vein Color', options: ['Red', 'Green', 'White', 'Gold'] },
            form: { type: 'checkbox', label: 'Form', options: ['Powder', 'Capsules', 'Extract'] },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 50 }
        }
    },
    'vapes': {
        name: 'Vape Devices',
        description: 'Premium vape devices, mods, and starter kits',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 150 }
        }
    },
    'detox': {
        name: 'Detox Products',
        description: 'Effective cleansing and detox solutions',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 100 }
        }
    },
    'accessories': {
        name: 'Accessories',
        description: 'Coils, batteries, chargers, and more',
        filters: {
            brand: { type: 'checkbox', label: 'Brand' },
            priceRange: { type: 'range', label: 'Price Range', min: 0, max: 50 }
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, brands, categoryConfig };
}
