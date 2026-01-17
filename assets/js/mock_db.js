/* ============================================================
 * MOCK DATABASE (Simulador de Banco de Dados)
 * ============================================================
 */

const productsDB = [
    {
        id: 1,
        title: "Fiat Argo 1.0",
        category: "veiculos",
        price: 55900,
        status: "active",
        platforms: ["olx", "facebook"],
        image: "ph-car"
    },
    {
        id: 2,
        title: "Terreno 10x30",
        category: "imoveis",
        price: 150000,
        status: "paused",
        platforms: ["olx"],
        image: "ph-house"
    },
    {
        id: 3,
        title: "iPhone 13 Pro",
        category: "eletronicos",
        price: 4200,
        status: "active",
        platforms: ["insta", "facebook", "olx"],
        image: "ph-device-mobile"
    },
    {
        id: 4,
        title: "Gado Nelore (Cabeça)",
        category: "agro",
        price: 3500,
        status: "active",
        platforms: ["zap"],
        image: "ph-cow"
    }
];

// Simula estatísticas para o Dashboard
const statsDB = {
    salesToday: 1250.00,
    activeAds: productsDB.filter(p => p.status === 'active').length,
    messages: 8
};
