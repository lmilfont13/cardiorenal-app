import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calculator, Activity, Check, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Avaliação de Risco CardioRenal
            </h1>
            <p className="mt-6 text-xl leading-8 text-blue-100">
              Ferramentas baseadas em evidências para avaliação de risco cardiovascular e renal
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/calculators/prevent">
                <Button size="lg" variant="secondary" className="text-lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Iniciar Avaliação
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Calculadoras Médicas Validadas
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Ferramentas precisas para tomada de decisão clínica
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* PREVENT Calculator */}
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-red-100 p-3">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle>PREVENT</CardTitle>
                </div>
                <CardDescription>
                  Calculadora de risco cardiovascular em 10 anos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Avaliação de risco de eventos cardiovasculares
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Baseada em fatores de risco modificáveis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Recomendações personalizadas
                  </li>
                </ul>
                <Link href="/calculators/prevent" className="mt-6 block">
                  <Button className="w-full">
                    Calcular Risco Cardiovascular
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* KFRE Calculator */}
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>KFRE</CardTitle>
                </div>
                <CardDescription>
                  Kidney Failure Risk Equation - Risco de falência renal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Predição de risco em 2 e 5 anos
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Classificação de estágio de DRC
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Orientações nefrológicas específicas
                  </li>
                </ul>
                <Link href="/calculators/kfre" className="mt-6 block">
                  <Button className="w-full">
                    Calcular Risco Renal
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Planos e Preços
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Escolha o plano ideal para sua prática clínica
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Gratuito</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 0</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    5 cálculos por mês
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Ambas calculadoras
                  </li>
                  <li className="flex items-center text-gray-400">
                    <Check className="mr-2 h-4 w-4" />
                    Histórico limitado
                  </li>
                </ul>
                <Button className="mt-6 w-full" variant="outline">
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            {/* Basic Plan */}
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Básico</CardTitle>
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 49</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Cálculos ilimitados
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Todas as calculadoras
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Histórico completo
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Exportar PDF
                  </li>
                </ul>
                <Button className="mt-6 w-full">
                  Assinar Agora
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 99</span>
                  <span className="text-gray-600">/mês</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Tudo do Básico
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    API de integração
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Suporte prioritário
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Relatórios avançados
                  </li>
                </ul>
                <Button className="mt-6 w-full" variant="outline">
                  Falar com Vendas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600">
          <p>© 2026 CardioRenal Risk Assessment. Todos os direitos reservados.</p>
          <p className="mt-2">
            Ferramenta para uso profissional. Não substitui avaliação clínica completa.
          </p>
        </div>
      </footer>
    </div>
  )
}
