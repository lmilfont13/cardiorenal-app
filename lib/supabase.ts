import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types para TypeScript
export type User = {
    id: string
    email: string
    name?: string
    crm?: string
    specialty?: string
    institution?: string
    phone?: string
    created_at: string
    updated_at: string
}

export type PreventAssessment = {
    id: string
    user_id?: string
    patient_age: number
    patient_gender: string
    systolic_bp: number
    total_cholesterol: number
    hdl_cholesterol: number
    has_diabetes: boolean
    is_smoker: boolean
    on_bp_medication: boolean
    risk_score: number
    risk_category: string
    created_at: string
}

export type KfreAssessment = {
    id: string
    user_id?: string
    patient_age: number
    patient_gender: string
    egfr: number
    acr: number
    risk_2_year: number
    risk_5_year: number
    kidney_stage: string
    risk_category: string
    created_at: string
}
