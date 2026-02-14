"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Activity, TrendingDown } from "lucide-react"
import type { KfreResult, KfreInput } from "@/lib/calculators/kfre"

export default function KfreResultsPage() {
    const router = useRouter()
    const [data, setData] = useState<{ input: KfreInput; result: KfreResult } | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("kfreResult")
        if (stored) {
            setData(JSON.parse(stored))
        } else {
            router.push("/calculators/kfre")
        }
    }, [router])

    if (!data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">Carregando resultados...</p>
            </div>
        )
    }

    const { input, result } = data

    const getRiskColor = (category: string) => {
        switch (category) {
            case "low":
                return "text-green-600 bg-green-50 border-green-200"
            case "moderate":
                return "text-yellow-600 bg-yellow-50 border-yellow-200"
            case "high":
                return "text-orange-600 bg-orange-50 border-orange-200"
            case "very-high":
                return "text-red-600 bg-red-50 border-red-200"
            default:
                return "text-gray-600 bg-gray-50 border-gray-200"
        }
    }

    const getRiskLabel = (category: string) => {
        switch (category) {
            case "low":
                return "Risco Baixo"
            case "moderate":
                return "Risco Moderado"
            case "high":
                return "Risco Alto"
            case "very-high":
                return "Risco Muito Alto"
            default:
                return "Indeterminado"
        }
    }

    const getKidneyStage = (egfr: number) => {
        if (egfr >= 90) return { stage: "G1", label: "Normal ou elevada", color: "text-green-600" }
        if (egfr >= 60) return { stage: "G2", label: "Levemente reduzida", color: "text-blue-600" }
        if (egfr >= 45) return { stage: "G3a", label: "Leve a moderadamente reduzida", color: "text-yellow-600" }
        if (egfr >= 30) return { stage: "G3b", label: "Moderada a severamente reduzida", color: "text-orange-600" }
        if (egfr >= 15) return { stage: "G4", label: "Severamente reduzida", color: "text-red-600" }
        return { stage: "G5", label: "Falência renal", color: "text-red-800" }
    }

    const kidneyStage = getKidneyStage(input.egfr)

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <TrendingDown className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Resultado da Avaliação</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Calculadora KFRE - Risco de Falência Renal
                </p>
            </div>

            {/* Risk Score Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <Card className={`border-2 ${getRiskColor(result.riskCategory)}`}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Risco em 2 Anos</CardTitle>
                        <div className="mt-2">
                            <span className="text-5xl font-bold">{result.risk2Year}%</span>
                        </div>
                    </CardHeader>
                </Card>

                <Card className={`border-2 ${getRiskColor(result.riskCategory)}`}>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Risco em 5 Anos</CardTitle>
                        <div className="mt-2">
                            <span className="text-5xl font-bold">{result.risk5Year}%</span>
                        </div>
                    </CardHeader>
                </Card>
            </div>

            {/* Overall Risk Category */}
            <Card className={`mb-6 border-2 ${getRiskColor(result.riskCategory)}`}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {getRiskLabel(result.riskCategory)}
                    </CardTitle>
                    <p className="mt-2 text-sm opacity-80">
                        Classificação geral de risco de falência renal
                    </p>
                </CardHeader>
            </Card>

            {/* Kidney Stage */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <CardTitle>Estágio da Doença Renal Crônica</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                        <div>
                            <p className="text-sm text-gray-600">Estágio baseado em eGFR</p>
                            <p className={`text-2xl font-bold ${kidneyStage.color}`}>
                                {kidneyStage.stage}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Função Renal</p>
                            <p className="font-semibold">{kidneyStage.label}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Interpretation */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                        <CardTitle>Interpretação Clínica</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">{result.interpretation}</p>
                </CardContent>
            </Card>

            {/* Patient Data Summary */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Dados do Paciente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-600">Idade</p>
                            <p className="font-semibold">{input.age} anos</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Sexo</p>
                            <p className="font-semibold">{input.gender === "male" ? "Masculino" : "Feminino"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">eGFR</p>
                            <p className="font-semibold">{input.egfr} mL/min/1.73m²</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">ACR</p>
                            <p className="font-semibold">{input.acr} mg/g</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="mb-6">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <CardTitle>Recomendações</CardTitle>
                    </div>
                    <CardDescription>
                        Orientações baseadas no perfil de risco do paciente
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                                    {index + 1}
                                </span>
                                <span className="text-gray-700">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/calculators/kfre" className="flex-1">
                    <Button variant="outline" className="w-full">
                        <Activity className="mr-2 h-4 w-4" />
                        Nova Avaliação KFRE
                    </Button>
                </Link>
                <Link href="/calculators/prevent" className="flex-1">
                    <Button variant="outline" className="w-full">
                        Avaliar Risco Cardiovascular
                    </Button>
                </Link>
                <Button className="flex-1" onClick={() => window.print()}>
                    Imprimir Resultado
                </Button>
            </div>

            <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                <p className="font-semibold">⚕️ Aviso Médico</p>
                <p className="mt-1">
                    Este resultado é baseado na equação KFRE de 4 variáveis e deve ser interpretado por nefrologista ou profissional de saúde qualificado. Não substitui avaliação clínica completa e individualizada.
                </p>
            </div>
        </div>
    )
}
