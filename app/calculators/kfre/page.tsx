"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { calculateKfre, type KfreInput } from "@/lib/calculators/kfre"
import { saveKfreAssessment } from "@/lib/db"
import { Activity } from "lucide-react"
import { toast } from "sonner"

const kfreSchema = z.object({
    patientName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome muito longo"),
    age: z.coerce.number().min(18, "Idade mínima: 18 anos").max(120, "Idade máxima: 120 anos"),
    gender: z.enum(["male", "female"]),
    egfr: z.coerce.number().min(1, "Valor muito baixo").max(200, "Valor muito alto"),
    acr: z.coerce.number().min(0, "Valor não pode ser negativo").max(10000, "Valor muito alto"),
})

type KfreFormData = z.infer<typeof kfreSchema>

export default function KfreCalculator() {
    const router = useRouter()
    const [isCalculating, setIsCalculating] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<KfreFormData>({
        resolver: zodResolver(kfreSchema) as any,
        defaultValues: {
            gender: "male",
        },
    })

    const onSubmit = handleSubmit(async (data: KfreFormData) => {
        setIsCalculating(true)

        // Calculate risk
        const result = calculateKfre(data as KfreInput)

        // Calculate kidney stage based on eGFR
        const getKidneyStage = (egfr: number): string => {
            if (egfr >= 90) return "G1"
            if (egfr >= 60) return "G2"
            if (egfr >= 45) return "G3a"
            if (egfr >= 30) return "G3b"
            if (egfr >= 15) return "G4"
            return "G5"
        }

        // Save to Supabase (non-blocking)
        try {
            await saveKfreAssessment({
                patient_name: data.patientName,
                patient_age: data.age,
                patient_gender: data.gender,
                egfr: data.egfr,
                acr: data.acr,
                risk_2_year: result.risk2Year,
                risk_5_year: result.risk5Year,
                kidney_stage: getKidneyStage(data.egfr),
                risk_category: result.riskCategory,
            })
            toast.success('Avaliação KFRE salva no banco de dados!')
        } catch (error) {
            console.error('⚠️ Erro ao salvar no Supabase:', error)
            toast.error('Erro ao conectar ao banco de dados, mas o resultado local está disponível.')
        }

        // Store result in sessionStorage
        sessionStorage.setItem("kfreResult", JSON.stringify({ input: data, result }))

        // Navigate to results page
        setTimeout(() => {
            router.push("/results/kfre")
        }, 500)
    })

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Calculadora KFRE</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Kidney Failure Risk Equation - Predição de falência renal
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do Paciente</CardTitle>
                    <CardDescription>
                        Preencha os campos abaixo para calcular o risco de falência renal
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Patient Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Identificação do Paciente</h3>

                            <div className="space-y-2">
                                <Label htmlFor="patientName">Nome Completo do Paciente *</Label>
                                <Input
                                    id="patientName"
                                    type="text"
                                    placeholder="Ex: Maria Oliveira"
                                    {...register("patientName")}
                                />
                                {errors.patientName && (
                                    <p className="text-sm text-red-600">{errors.patientName.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Demographics */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Dados Demográficos</h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Idade (anos)</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="Ex: 65"
                                        {...register("age")}
                                    />
                                    {errors.age && (
                                        <p className="text-sm text-red-600">{errors.age.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gender">Sexo</Label>
                                    <select
                                        id="gender"
                                        {...register("gender")}
                                        className="flex h-11 w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                    >
                                        <option value="male">Masculino</option>
                                        <option value="female">Feminino</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Kidney Function */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Função Renal</h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="egfr">eGFR (mL/min/1.73m²)</Label>
                                    <Input
                                        id="egfr"
                                        type="number"
                                        step="0.1"
                                        placeholder="Ex: 45.5"
                                        {...register("egfr")}
                                    />
                                    {errors.egfr && (
                                        <p className="text-sm text-red-600">{errors.egfr.message}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Taxa de Filtração Glomerular estimada
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="acr">ACR (mg/g)</Label>
                                    <Input
                                        id="acr"
                                        type="number"
                                        step="0.1"
                                        placeholder="Ex: 150"
                                        {...register("acr")}
                                    />
                                    {errors.acr && (
                                        <p className="text-sm text-red-600">{errors.acr.message}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Razão Albumina/Creatinina urinária
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                            <p className="font-semibold">ℹ️ Estágios de DRC por eGFR:</p>
                            <ul className="mt-2 space-y-1 text-xs">
                                <li>• G1: ≥90 (normal ou elevada)</li>
                                <li>• G2: 60-89 (levemente reduzida)</li>
                                <li>• G3a: 45-59 (leve a moderadamente reduzida)</li>
                                <li>• G3b: 30-44 (moderada a severamente reduzida)</li>
                                <li>• G4: 15-29 (severamente reduzida)</li>
                                <li>• G5: &lt;15 (falência renal)</li>
                            </ul>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isCalculating}
                            >
                                {isCalculating ? "Calculando..." : "Calcular Risco"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/")}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-semibold">ℹ️ Nota Importante</p>
                <p className="mt-1">
                    Esta calculadora utiliza a equação KFRE de 4 variáveis. Os resultados devem ser interpretados por profissional de saúde qualificado e não substituem avaliação clínica completa.
                </p>
            </div>
        </div>
    )
}
