/* ============================================================
 * CONFIGURAÇÃO DO ASSINANTE (DADOS DE NEGÓCIO)
 * ============================================================
 * Em produção, estes dados viriam de uma API (ex: /api/account).
 * No MVP, eles são estáticos para prova de conceito.
 */

const appConfig = {
    user: {
        name: "Paulo",           // Nome do usuário logado
        firstName: "Paulo",      // Para saudações curtas
        avatarInitials: "PA",    // Iniciais para o avatar
        plan: "Enterprise",      // Nível do plano (controla funcionalidades)
    },
    business: {
        name: "Koda Shop",       // Nome da empresa assinante
        cnpj: "12.345.678/0001-90",
        since: 2024
    }
};

/* * Nota para o Investidor:
 * Apenas alterando este objeto JSON, o sistema inteiro
 * personaliza a saudação e as regras de negócio para o novo cliente.
 */
