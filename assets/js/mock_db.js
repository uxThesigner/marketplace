// --- MÉTRICAS DO DASHBOARD ---
const statsDB = {
    salesToday: 1450.50,
    activeAds: 18,
    messages: 12
};

// --- BANCO DE DADOS DE PRODUTOS (ESTOQUE) ---
// Status possíveis: 'active', 'paused', 'sold', 'rejected', 'review', 'incomplete'

const productsDB = [
    // --- VEÍCULOS ---
    {
        id: 1,
        title: "Fiat Argo 1.0 Flex Drive",
        price: 54900,
        image: "ph-car-profile",
        status: "active",
        platforms: ["OLX", "Face"]
    },
    {
        id: 2,
        title: "Toyota Hilux SW4 Diesel",
        price: 320000,
        image: "ph-jeep",
        status: "active",
        platforms: ["OLX", "WebMotors"]
    },
    {
        id: 3,
        title: "Honda Civic G10 Touring",
        price: 145000,
        image: "ph-car-profile",
        status: "sold", // Vendido
        platforms: ["Face", "Insta"]
    },
    {
        id: 4,
        title: "Moto Yamaha MT-03",
        price: 29500,
        image: "ph-motorcycle",
        status: "paused",
        platforms: ["OLX"]
    },
    {
        id: 5,
        title: "Chevrolet S10 High Country",
        price: 250000,
        image: "ph-truck",
        status: "review", // Em Análise
        platforms: ["WebMotors"]
    },

    // --- IMÓVEIS ---
    {
        id: 6,
        title: "Terreno 10x30 Centro",
        price: 180000,
        image: "ph-house-line",
        status: "active",
        platforms: ["OLX", "Zap"]
    },
    {
        id: 7,
        title: "Apto 2 Quartos Mobiliado",
        price: 350000,
        image: "ph-buildings",
        status: "active",
        platforms: ["Zap", "VivaReal"]
    },
    {
        id: 8,
        title: "Casa Condomínio Fechado",
        price: 980000,
        image: "ph-house",
        status: "incomplete", // Fotos pendentes
        platforms: ["OLX"]
    },
    {
        id: 9,
        title: "Sala Comercial 40m²",
        price: 2200, // Aluguel
        image: "ph-storefront",
        status: "paused",
        platforms: ["OLX"]
    },

    // --- ELETRÔNICOS ---
    {
        id: 10,
        title: "iPhone 13 Pro Max 256GB",
        price: 4200,
        image: "ph-device-mobile",
        status: "active",
        platforms: ["Insta", "Face"]
    },
    {
        id: 11,
        title: "MacBook Air M1 Cinza",
        price: 5100,
        image: "ph-laptop",
        status: "sold",
        platforms: ["OLX"]
    },
    {
        id: 12,
        title: "PlayStation 5 + 2 Controles",
        price: 3500,
        image: "ph-game-controller",
        status: "rejected", // Reprovado
        platforms: ["Face"]
    },
    {
        id: 13,
        title: "Drone DJI Mini 3 Pro",
        price: 4800,
        image: "ph-airplane-tilt",
        status: "active",
        platforms: ["Insta"]
    },
    {
        id: 14,
        title: "Samsung S23 Ultra",
        price: 5500,
        image: "ph-device-mobile",
        status: "review",
        platforms: ["OLX"]
    },

    // --- AGRO ---
    {
        id: 15,
        title: "Gado Nelore (Cabeça)",
        price: 3500,
        image: "ph-cow", 
        status: "active",
        platforms: ["Agro", "Face"]
    },
    {
        id: 16,
        title: "Trator John Deere 2018",
        price: 450000,
        image: "ph-tractor", // Ícone sugerido, se não existir usa plant
        status: "paused",
        platforms: ["Agro"]
    },
    {
        id: 17,
        title: "Saca de Soja (Lote)",
        price: 145,
        image: "ph-grains",
        status: "active",
        platforms: ["Agro"]
    },
    {
        id: 18,
        title: "Fazenda 500 Hectares",
        price: 15000000,
        image: "ph-map-trifold",
        status: "incomplete", // Falta documentação
        platforms: ["Agro"]
    },

    // --- SERVIÇOS E OUTROS ---
    {
        id: 19,
        title: "Serviço de Frete/Mudança",
        price: 150,
        image: "ph-truck",
        status: "active",
        platforms: ["Face", "OLX"]
    },
    {
        id: 20,
        title: "Consultoria de TI (Hora)",
        price: 200,
        image: "ph-desktop",
        status: "paused",
        platforms: ["LinkedIn"]
    },
    {
        id: 21,
        title: "Kit Gamer Completo",
        price: 1200,
        image: "ph-computer-tower",
        status: "rejected", // Preço suspeito
        platforms: ["Face"]
    },
    {
        id: 22,
        title: "Câmera Canon T7i",
        price: 3200,
        image: "ph-camera",
        status: "sold",
        platforms: ["Insta"]
    },
    {
        id: 23,
        title: "Bicicleta Caloi Elite",
        price: 4500,
        image: "ph-bicycle",
        status: "active",
        platforms: ["OLX"]
    },
    {
        id: 24,
        title: "Violão Takamine",
        price: 2800,
        image: "ph-music-notes",
        status: "active",
        platforms: ["Face"]
    },
    {
        id: 25,
        title: "Relógio Apple Watch S8",
        price: 2100,
        image: "ph-watch",
        status: "review",
        platforms: ["Insta"]
    }
];
