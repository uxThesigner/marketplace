// Métricas do Dashboard
const statsDB = {
    salesToday: 1450.50,
    activeAds: 12,
    messages: 5
};

// Lista de Produtos (Estoque)
const productsDB = [
    {
        id: 1,
        title: "Fiat Argo 1.0 Flex",
        price: 54900,
        image: "ph-car", // Ícone Phosphor
        status: "active", // 'active' ou 'paused'
        platforms: ["OLX", "Face"]
    },
    {
        id: 2,
        title: "iPhone 13 Pro Max",
        price: 4200,
        image: "ph-device-mobile",
        status: "active",
        platforms: ["Insta"]
    },
    {
        id: 3,
        title: "Terreno 10x30 Centro",
        price: 180000,
        image: "ph-house",
        status: "paused",
        platforms: ["OLX", "Zap"]
    },
    {
        id: 4,
        title: "Gado Nelore (Cabeça)",
        price: 3500,
        image: "ph-cow", /* Usando cow ou plant se cow não existir */
        status: "active",
        platforms: ["Face", "Agro"]
    },
    {
        id: 5,
        title: "MacBook Air M1",
        price: 5100,
        image: "ph-laptop",
        status: "active",
        platforms: ["OLX"]
    },
    {
        id: 6,
        title: "Trator John Deere",
        price: 450000,
        image: "ph-plant",
        status: "paused",
        platforms: ["Agro"]
    }
];
