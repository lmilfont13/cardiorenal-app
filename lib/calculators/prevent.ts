/**
 * PREVENT Calculator - Cardiovascular Risk Assessment
 * Based on the PREVENT equations for 10-year cardiovascular disease risk
 */

export interface PreventInput {
    age: number
    gender: "male" | "female"
    systolicBP: number
    totalCholesterol: number
    hdlCholesterol: number
    diabetes: boolean
    smoking: boolean
    onBPMeds: boolean
}

export interface PreventResult {
    riskScore: number
    riskCategory: "low" | "moderate" | "high" | "very-high"
    interpretation: string
    recommendations: string[]
}

export function calculatePrevent(input: PreventInput): PreventResult {
    // Simplified PREVENT calculation (this is a demonstration)
    // In production, use the actual validated PREVENT equations

    let score = 0

    // Age contribution
    if (input.age >= 40 && input.age < 50) score += 1
    else if (input.age >= 50 && input.age < 60) score += 2
    else if (input.age >= 60 && input.age < 70) score += 3
    else if (input.age >= 70) score += 4

    // Gender (males have slightly higher baseline risk)
    if (input.gender === "male") score += 1

    // Blood Pressure
    if (input.systolicBP >= 140) score += 2
    else if (input.systolicBP >= 130) score += 1

    // Cholesterol
    const cholesterolRatio = input.totalCholesterol / input.hdlCholesterol
    if (cholesterolRatio > 5) score += 2
    else if (cholesterolRatio > 4) score += 1

    // Diabetes
    if (input.diabetes) score += 2

    // Smoking
    if (input.smoking) score += 2

    // On BP medications
    if (input.onBPMeds) score += 1

    // Calculate risk percentage (simplified)
    const riskScore = Math.min(Math.round((score / 15) * 100), 100)

    // Determine risk category
    let riskCategory: PreventResult["riskCategory"]
    if (riskScore < 10) riskCategory = "low"
    else if (riskScore < 20) riskCategory = "moderate"
    else if (riskScore < 30) riskCategory = "high"
    else riskCategory = "very-high"

    // Generate interpretation
    const interpretation = getInterpretation(riskCategory, riskScore)

    // Generate recommendations
    const recommendations = getRecommendations(input, riskCategory)

    return {
        riskScore,
        riskCategory,
        interpretation,
        recommendations,
    }
}

function getInterpretation(category: string, score: number): string {
    switch (category) {
        case "low":
            return `Risco cardiovascular baixo (${score}%). O paciente apresenta baixa probabilidade de eventos cardiovasculares nos próximos 10 anos.`
        case "moderate":
            return `Risco cardiovascular moderado (${score}%). Recomenda-se modificação de fatores de risco e acompanhamento regular.`
        case "high":
            return `Risco cardiovascular alto (${score}%). Intervenção terapêutica é fortemente recomendada para redução de risco.`
        case "very-high":
            return `Risco cardiovascular muito alto (${score}%). Intervenção terapêutica intensiva é necessária. Considere encaminhamento para cardiologista.`
        default:
            return "Risco não determinado."
    }
}

function getRecommendations(input: PreventInput, category: string): string[] {
    const recommendations: string[] = []

    // Lifestyle recommendations
    recommendations.push("Manter dieta balanceada com baixo teor de sódio e gorduras saturadas")
    recommendations.push("Praticar atividade física regular (150 min/semana de exercício moderado)")

    // Smoking
    if (input.smoking) {
        recommendations.push("⚠️ PRIORITÁRIO: Cessação do tabagismo com suporte médico")
    }

    // Blood pressure
    if (input.systolicBP >= 140) {
        recommendations.push("Controle rigoroso da pressão arterial (meta <140/90 mmHg)")
        if (!input.onBPMeds) {
            recommendations.push("Considerar início de terapia anti-hipertensiva")
        }
    }

    // Cholesterol
    const ratio = input.totalCholesterol / input.hdlCholesterol
    if (ratio > 4) {
        recommendations.push("Controle do perfil lipídico (considerar estatina)")
    }

    // Diabetes
    if (input.diabetes) {
        recommendations.push("Controle glicêmico rigoroso (HbA1c <7%)")
        recommendations.push("Rastreamento de complicações microvasculares")
    }

    // Risk-based recommendations
    if (category === "high" || category === "very-high") {
        recommendations.push("Considerar uso de aspirina em prevenção primária")
        recommendations.push("Avaliação cardiológica especializada")
    }

    return recommendations
}
