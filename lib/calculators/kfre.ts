/**
 * KFRE Calculator - Kidney Failure Risk Equation
 * Predicts risk of kidney failure (dialysis or transplant) in 2 and 5 years
 */

export interface KfreInput {
    age: number
    gender: "male" | "female"
    egfr: number  // estimated Glomerular Filtration Rate (mL/min/1.73m²)
    acr: number   // Albumin-to-Creatinine Ratio (mg/g)
}

export interface KfreResult {
    risk2Year: number
    risk5Year: number
    riskCategory: "low" | "moderate" | "high" | "very-high"
    interpretation: string
    recommendations: string[]
}

export function calculateKfre(input: KfreInput): KfreResult {
    // Simplified KFRE calculation (4-variable equation)
    // In production, use the actual validated KFRE equations

    let score = 0

    // Age contribution
    if (input.age >= 60) score += 2
    else if (input.age >= 50) score += 1

    // Gender (males have slightly higher risk)
    if (input.gender === "male") score += 1

    // eGFR (lower = higher risk)
    if (input.egfr < 15) score += 5
    else if (input.egfr < 30) score += 4
    else if (input.egfr < 45) score += 3
    else if (input.egfr < 60) score += 2
    else if (input.egfr < 90) score += 1

    // ACR (higher = higher risk)
    if (input.acr > 300) score += 4
    else if (input.acr > 30) score += 2
    else if (input.acr > 10) score += 1

    // Calculate risk percentages (simplified)
    const risk2Year = Math.min(Math.round((score / 12) * 100 * 0.5), 100)
    const risk5Year = Math.min(Math.round((score / 12) * 100), 100)

    // Determine risk category based on 5-year risk
    let riskCategory: KfreResult["riskCategory"]
    if (risk5Year < 5) riskCategory = "low"
    else if (risk5Year < 15) riskCategory = "moderate"
    else if (risk5Year < 40) riskCategory = "high"
    else riskCategory = "very-high"

    // Generate interpretation
    const interpretation = getInterpretation(riskCategory, risk2Year, risk5Year, input.egfr)

    // Generate recommendations
    const recommendations = getRecommendations(input, riskCategory)

    return {
        risk2Year,
        risk5Year,
        riskCategory,
        interpretation,
        recommendations,
    }
}

function getInterpretation(category: string, risk2y: number, risk5y: number, egfr: number): string {
    const stage = getKidneyStage(egfr)

    switch (category) {
        case "low":
            return `Risco baixo de falência renal (2 anos: ${risk2y}%, 5 anos: ${risk5y}%). Paciente em estágio ${stage} de DRC com baixa probabilidade de progressão para diálise ou transplante.`
        case "moderate":
            return `Risco moderado de falência renal (2 anos: ${risk2y}%, 5 anos: ${risk5y}%). Paciente em estágio ${stage} de DRC. Acompanhamento regular e controle de fatores de risco são essenciais.`
        case "high":
            return `Risco alto de falência renal (2 anos: ${risk2y}%, 5 anos: ${risk5y}%). Paciente em estágio ${stage} de DRC. Encaminhamento para nefrologista e planejamento de terapia renal substitutiva são recomendados.`
        case "very-high":
            return `Risco muito alto de falência renal (2 anos: ${risk2y}%, 5 anos: ${risk5y}%). Paciente em estágio ${stage} de DRC. Encaminhamento urgente para nefrologista e início de preparação para terapia renal substitutiva.`
        default:
            return "Risco não determinado."
    }
}

function getKidneyStage(egfr: number): string {
    if (egfr >= 90) return "G1 (normal ou elevada)"
    if (egfr >= 60) return "G2 (levemente reduzida)"
    if (egfr >= 45) return "G3a (leve a moderadamente reduzida)"
    if (egfr >= 30) return "G3b (moderada a severamente reduzida)"
    if (egfr >= 15) return "G4 (severamente reduzida)"
    return "G5 (falência renal)"
}

function getRecommendations(input: KfreInput, category: string): string[] {
    const recommendations: string[] = []

    // General recommendations
    recommendations.push("Controle rigoroso da pressão arterial (meta <130/80 mmHg)")
    recommendations.push("Controle glicêmico se diabético (HbA1c <7%)")

    // eGFR-based recommendations
    if (input.egfr < 60) {
        recommendations.push("Avaliação e tratamento de complicações da DRC (anemia, distúrbios minerais)")
        recommendations.push("Restrição proteica moderada (0.8-1.0 g/kg/dia)")
    }

    if (input.egfr < 30) {
        recommendations.push("⚠️ Encaminhamento para nefrologista")
        recommendations.push("Evitar nefrotóxicos (AINEs, contraste iodado)")
        recommendations.push("Ajuste de doses de medicações conforme TFG")
    }

    if (input.egfr < 20) {
        recommendations.push("⚠️ PRIORITÁRIO: Planejamento de acesso vascular para hemodiálise")
        recommendations.push("Educação sobre opções de terapia renal substitutiva")
        recommendations.push("Avaliação para transplante renal")
    }

    // ACR-based recommendations
    if (input.acr > 30) {
        recommendations.push("Uso de IECA ou BRA para redução de proteinúria")
        recommendations.push("Considerar inibidor de SGLT2 se diabético")
    }

    if (input.acr > 300) {
        recommendations.push("Investigar causas de proteinúria nefrótica")
        recommendations.push("Considerar biópsia renal se etiologia incerta")
    }

    // Risk-based recommendations
    if (category === "high" || category === "very-high") {
        recommendations.push("Monitoramento frequente de função renal (a cada 3 meses)")
        recommendations.push("Rastreamento de complicações cardiovasculares")
        recommendations.push("Suporte nutricional especializado")
    }

    // Lifestyle
    recommendations.push("Restrição de sódio (<2g/dia)")
    recommendations.push("Manter hidratação adequada")
    recommendations.push("Atividade física regular conforme tolerância")

    return recommendations
}
