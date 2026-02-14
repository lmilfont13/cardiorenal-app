"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Heart, TrendingUp } from "lucide-react"
import type { PreventResult, PreventInput } from "@/lib/calculators/prevent"

export default function ResultsPage() {
    const router = useRouter()
    const [data, setData] = useState<{ input: PreventInput; result: PreventResult } | null>(null)

    useEffect(() => {
        const stored = sessionStorage.getItem("preventResult")
        if (stored) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setData(JSON.parse(stored))
        } else {
            router.push("/calculators/prevent")
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

    return (
        <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Resultado da Avaliação</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Calculadora PREVENT - Risco Cardiovascular
                </p>
            </div>

            {/* Risk Score Card */}
            <Card className={`mb-6 border-2 ${getRiskColor(result.riskCategory)}`}>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">
                        {getRiskLabel(result.riskCategory)}
                    </CardTitle>
                    <div className="mt-4">
                        <span className="text-6xl font-bold">{result.riskScore}%</span>
                        <p className="mt-2 text-sm opacity-80">
                            Risco de evento cardiovascular em 10 anos
                        </p>
                    </div>
                </CardHeader>
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
                            <p className="text-sm text-gray-600">PA Sistólica</p>
                            <p className="font-semibold">{input.systolicBP} mmHg</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Colesterol Total</p>
                            <p className="font-semibold">{input.totalCholesterol} mg/dL</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">HDL</p>
                            <p className="font-semibold">{input.hdlCholesterol} mg/dL</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Fatores de Risco</p>
                            <div className="flex flex-wrap gap-2">
                                {input.diabetes && (
                                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                        Diabetes
                                    </span>
                                )}
                                {input.smoking && (
                                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                        Tabagismo
                                    </span>
                                )}
                                {input.onBPMeds && (
                                    <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                                        Anti-HT
                                    </span>
                                )}
                                {!input.diabetes && !input.smoking && !input.onBPMeds && (
                                    <span className="text-sm text-gray-500">Nenhum</span>
                                )}
                            </div>
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
                <Link href="/calculators/prevent" className="flex-1">
                    <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" />
                        Nova Avaliação
                    </Button>
                </Link>
                <Button className="flex-1" onClick={() => window.print()}>
                    Imprimir Resultado
                </Button>
                <Link href="/" className="flex-1">
                    <Button variant="secondary" className="w-full">
                        Voltar ao Início
                    </Button>
                </Link>
            </div>

            <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                <p className="font-semibold">⚕️ Aviso Médico</p>
                <p className="mt-1">
                    Este resultado é uma estimativa baseada em modelos estatísticos e deve ser interpretado por profissional de saúde qualificado. Não substitui avaliação clínica completa e individualizada.
                </p>
            </div>
        </div>
    )
}
