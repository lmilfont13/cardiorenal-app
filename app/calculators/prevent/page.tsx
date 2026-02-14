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
import { calculatePrevent, type PreventInput } from "@/lib/calculators/prevent"
import { savePreventAssessment } from "@/lib/db"
import { Heart } from "lucide-react"
import { toast } from "sonner"

const preventSchema = z.object({
    age: z.coerce.number().min(18, "Idade mínima: 18 anos").max(120, "Idade máxima: 120 anos"),
    gender: z.enum(["male", "female"]),
    systolicBP: z.coerce.number().min(70, "Valor muito baixo").max(250, "Valor muito alto"),
    totalCholesterol: z.coerce.number().min(100, "Valor muito baixo").max(500, "Valor muito alto"),
    hdlCholesterol: z.coerce.number().min(20, "Valor muito baixo").max(150, "Valor muito alto"),
    diabetes: z.boolean(),
    smoking: z.boolean(),
    onBPMeds: z.boolean(),
})

type PreventFormData = z.infer<typeof preventSchema>

export default function PreventCalculator() {
    const router = useRouter()
    const [isCalculating, setIsCalculating] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PreventFormData>({
        resolver: zodResolver(preventSchema) as any,
        defaultValues: {
            gender: "male",
            diabetes: false,
            smoking: false,
            onBPMeds: false,
        },
    })

    const onSubmit = handleSubmit(async (data: PreventFormData) => {
        setIsCalculating(true)

        // Calculate risk
        const result = calculatePrevent(data as PreventInput)

        // Save to Supabase (non-blocking)
        try {
            await savePreventAssessment({
                patient_age: data.age,
                patient_gender: data.gender,
                systolic_bp: data.systolicBP,
                total_cholesterol: data.totalCholesterol,
                hdl_cholesterol: data.hdlCholesterol,
                has_diabetes: data.diabetes,
                is_smoker: data.smoking,
                on_bp_medication: data.onBPMeds,
                risk_score: result.riskScore,
                risk_category: result.riskCategory,
            })
            toast.success('Avaliação PREVENT salva no banco de dados!')
        } catch (error) {
            console.error('⚠️ Erro ao salvar no Supabase:', error)
            toast.error('Erro ao conectar ao banco de dados, mas o resultado local está disponível.')
        }

        // Store result in sessionStorage
        sessionStorage.setItem("preventResult", JSON.stringify({ input: data, result }))

        // Navigate to results page
        setTimeout(() => {
            router.push("/results")
        }, 500)
    })

    return (
        <div className="mx-auto max-w-3xl px-4 py-12">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Calculadora PREVENT</h1>
                <p className="mt-2 text-lg text-gray-600">
                    Avaliação de risco cardiovascular em 10 anos
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dados do Paciente</CardTitle>
                    <CardDescription>
                        Preencha os campos abaixo para calcular o risco cardiovascular
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Demographics */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Dados Demográficos</h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Idade (anos)</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="Ex: 55"
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

                        {/* Clinical Data */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Dados Clínicos</h3>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="systolicBP">Pressão Arterial Sistólica (mmHg)</Label>
                                    <Input
                                        id="systolicBP"
                                        type="number"
                                        placeholder="Ex: 130"
                                        {...register("systolicBP")}
                                    />
                                    {errors.systolicBP && (
                                        <p className="text-sm text-red-600">{errors.systolicBP.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="totalCholesterol">Colesterol Total (mg/dL)</Label>
                                    <Input
                                        id="totalCholesterol"
                                        type="number"
                                        placeholder="Ex: 200"
                                        {...register("totalCholesterol")}
                                    />
                                    {errors.totalCholesterol && (
                                        <p className="text-sm text-red-600">{errors.totalCholesterol.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hdlCholesterol">HDL Colesterol (mg/dL)</Label>
                                    <Input
                                        id="hdlCholesterol"
                                        type="number"
                                        placeholder="Ex: 50"
                                        {...register("hdlCholesterol")}
                                    />
                                    {errors.hdlCholesterol && (
                                        <p className="text-sm text-red-600">{errors.hdlCholesterol.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Risk Factors */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Fatores de Risco</h3>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="diabetes"
                                        {...register("diabetes")}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <Label htmlFor="diabetes" className="cursor-pointer font-normal">
                                        Diabetes Mellitus
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="smoking"
                                        {...register("smoking")}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <Label htmlFor="smoking" className="cursor-pointer font-normal">
                                        Tabagismo Atual
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="onBPMeds"
                                        {...register("onBPMeds")}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
                                    />
                                    <Label htmlFor="onBPMeds" className="cursor-pointer font-normal">
                                        Em uso de anti-hipertensivos
                                    </Label>
                                </div>
                            </div>
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
                    Esta calculadora é uma ferramenta de auxílio à decisão clínica. Os resultados devem ser interpretados por profissional de saúde qualificado e não substituem avaliação clínica completa.
                </p>
            </div>
        </div>
    )
}
