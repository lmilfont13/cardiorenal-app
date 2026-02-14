"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Building2, Phone, Save } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        crm: "",
        specialty: "",
        institution: "",
        phone: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implementar salvamento de perfil
        alert("Perfil salvo com sucesso! (Em desenvolvimento)")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Perfil do Usuário</h1>
                <p className="mt-2 text-gray-600">
                    Gerencie suas informações profissionais
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Sidebar com Avatar */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Foto de Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-blue-100">
                                <User className="h-16 w-16 text-blue-600" />
                            </div>
                            <Button variant="outline" size="sm" disabled>
                                Alterar Foto
                            </Button>
                            <p className="mt-2 text-xs text-gray-500">Em breve</p>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-sm">Estatísticas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Avaliações PREVENT:</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Avaliações KFRE:</span>
                                <span className="font-semibold">0</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total:</span>
                                <span className="font-semibold">0</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Formulário Principal */}
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Profissionais</CardTitle>
                            <CardDescription>
                                Atualize seus dados cadastrais
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome Completo */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        <User className="mr-2 inline h-4 w-4" />
                                        Nome Completo
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Dr(a). Seu Nome"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        <Mail className="mr-2 inline h-4 w-4" />
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="seu.email@exemplo.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* CRM e Especialidade */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="crm">CRM</Label>
                                        <Input
                                            id="crm"
                                            name="crm"
                                            placeholder="12345/UF"
                                            value={formData.crm}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="specialty">Especialidade</Label>
                                        <Input
                                            id="specialty"
                                            name="specialty"
                                            placeholder="Cardiologia, Nefrologia..."
                                            value={formData.specialty}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Instituição */}
                                <div className="space-y-2">
                                    <Label htmlFor="institution">
                                        <Building2 className="mr-2 inline h-4 w-4" />
                                        Instituição
                                    </Label>
                                    <Input
                                        id="institution"
                                        name="institution"
                                        placeholder="Hospital ou Clínica"
                                        value={formData.institution}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Telefone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">
                                        <Phone className="mr-2 inline h-4 w-4" />
                                        Telefone
                                    </Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="(00) 00000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Botões */}
                                <div className="flex gap-4">
                                    <Button type="submit" className="flex-1">
                                        <Save className="mr-2 h-4 w-4" />
                                        Salvar Alterações
                                    </Button>
                                    <Button type="button" variant="outline" className="flex-1">
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Configurações Adicionais */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Configurações da Conta</CardTitle>
                            <CardDescription>
                                Gerencie suas preferências
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Notificações por Email</p>
                                    <p className="text-sm text-gray-600">
                                        Receba atualizações sobre novas funcionalidades
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" disabled>
                                    Em breve
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Exportar Dados</p>
                                    <p className="text-sm text-gray-600">
                                        Baixe todas as suas avaliações em PDF
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" disabled>
                                    Em breve
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-red-600">Excluir Conta</p>
                                    <p className="text-sm text-gray-600">
                                        Remover permanentemente sua conta
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" className="text-red-600" disabled>
                                    Em breve
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
