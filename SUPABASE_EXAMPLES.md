# 📝 Exemplos de Uso do Supabase

## 🎯 Como Usar nos Formulários

### Exemplo 1: Salvar Avaliação PREVENT

Edite `app/calculators/prevent/page.tsx`:

```typescript
// Adicione no topo
import { savePreventAssessment } from '@/lib/db'

// No handleSubmit, após calcular o risco:
const onSubmit = handleSubmit(async (data: PreventFormData) => {
  const result = calculatePreventRisk(data)
  
  // Salvar no Supabase
  try {
    await savePreventAssessment({
      patient_age: data.age,
      patient_gender: data.gender,
      systolic_bp: data.systolicBP,
      total_cholesterol: data.totalCholesterol,
      hdl_cholesterol: data.hdlCholesterol,
      has_diabetes: data.hasDiabetes,
      is_smoker: data.isSmoker,
      on_bp_medication: data.onBPMedication,
      risk_score: result.score,
      risk_category: result.category,
    })
    
    console.log('✅ Avaliação salva no Supabase!')
  } catch (error) {
    console.error('❌ Erro ao salvar:', error)
    // Continuar mesmo se der erro no banco
  }
  
  // Continuar com a navegação
  sessionStorage.setItem("preventResult", JSON.stringify(result))
  sessionStorage.setItem("preventFormData", JSON.stringify(data))
  router.push("/results")
})
```

### Exemplo 2: Salvar Avaliação KFRE

Edite `app/calculators/kfre/page.tsx`:

```typescript
// Adicione no topo
import { saveKfreAssessment } from '@/lib/db'

// No handleSubmit:
const onSubmit = handleSubmit(async (data: KfreFormData) => {
  const result = calculateKfreRisk(data)
  
  // Salvar no Supabase
  try {
    await saveKfreAssessment({
      patient_age: data.age,
      patient_gender: data.gender,
      egfr: data.egfr,
      acr: data.acr,
      risk_2_year: result.risk2Year,
      risk_5_year: result.risk5Year,
      kidney_stage: result.kidneyStage,
      risk_category: result.category,
    })
    
    console.log('✅ Avaliação KFRE salva!')
  } catch (error) {
    console.error('❌ Erro ao salvar:', error)
  }
  
  // Continuar...
  sessionStorage.setItem("kfreResult", JSON.stringify(result))
  sessionStorage.setItem("kfreFormData", JSON.stringify(data))
  router.push("/results/kfre")
})
```

### Exemplo 3: Listar Histórico de Avaliações

Crie uma nova página `app/history/page.tsx`:

```typescript
"use client"

import { useEffect, useState } from 'react'
import { getPreventAssessments, getKfreAssessments } from '@/lib/db'
import type { PreventAssessment, KfreAssessment } from '@/lib/supabase'

export default function HistoryPage() {
  const [preventHistory, setPreventHistory] = useState<PreventAssessment[]>([])
  const [kfreHistory, setKfreHistory] = useState<KfreAssessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadHistory() {
      try {
        const [prevent, kfre] = await Promise.all([
          getPreventAssessments(),
          getKfreAssessments(),
        ])
        setPreventHistory(prevent)
        setKfreHistory(kfre)
      } catch (error) {
        console.error('Erro ao carregar histórico:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHistory()
  }, [])

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Histórico de Avaliações</h1>
      
      <h2 className="text-2xl font-semibold mb-4">PREVENT ({preventHistory.length})</h2>
      <ul className="space-y-2 mb-8">
        {preventHistory.map((assessment) => (
          <li key={assessment.id} className="border p-4 rounded">
            <p>Idade: {assessment.patient_age} | Risco: {assessment.risk_score}%</p>
            <p className="text-sm text-gray-600">
              {new Date(assessment.created_at).toLocaleDateString('pt-BR')}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-4">KFRE ({kfreHistory.length})</h2>
      <ul className="space-y-2">
        {kfreHistory.map((assessment) => (
          <li key={assessment.id} className="border p-4 rounded">
            <p>Idade: {assessment.patient_age} | Risco 2 anos: {assessment.risk_2_year}%</p>
            <p className="text-sm text-gray-600">
              {new Date(assessment.created_at).toLocaleDateString('pt-BR')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Exemplo 4: Atualizar Perfil

Edite `app/profile/page.tsx`:

```typescript
// Adicione no topo
import { createUser, updateUser, getUserByEmail } from '@/lib/db'

// No handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  try {
    // Verificar se usuário já existe
    const existingUser = await getUserByEmail(formData.email)
    
    if (existingUser) {
      // Atualizar
      await updateUser(existingUser.id, {
        name: formData.name,
        crm: formData.crm,
        specialty: formData.specialty,
        institution: formData.institution,
        phone: formData.phone,
      })
      alert('✅ Perfil atualizado com sucesso!')
    } else {
      // Criar novo
      await createUser({
        email: formData.email,
        name: formData.name,
        crm: formData.crm,
        specialty: formData.specialty,
        institution: formData.institution,
        phone: formData.phone,
      })
      alert('✅ Perfil criado com sucesso!')
    }
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    alert('❌ Erro ao salvar perfil')
  }
}
```

---

## 🔍 Consultas Úteis

### Ver últimas 10 avaliações

```typescript
const recent = await supabase
  .from('prevent_assessments')
  .select('*')
  .order('created_at', { ascending: false })
  .limit(10)
```

### Filtrar por categoria de risco

```typescript
const highRisk = await supabase
  .from('prevent_assessments')
  .select('*')
  .eq('risk_category', 'Alto')
```

### Contar avaliações

```typescript
const { count } = await supabase
  .from('prevent_assessments')
  .select('*', { count: 'exact', head: true })
```

---

## 🎯 Próximos Passos

1. ✅ Configure as variáveis de ambiente (`.env.local`)
2. ✅ Execute o SQL no Supabase para criar as tabelas
3. ✅ Teste localmente
4. ✅ Adicione as variáveis na Vercel
5. ✅ Faça deploy!

---

**Tudo pronto para usar o Supabase!** 🚀
