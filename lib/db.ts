import { supabase, type PreventAssessment, type KfreAssessment, type User } from './supabase'

// ===== PREVENT ASSESSMENTS =====

export async function savePreventAssessment(data: Omit<PreventAssessment, 'id' | 'created_at'>) {
    const { data: assessment, error } = await supabase
        .from('prevent_assessments')
        .insert([data])
        .select()
        .single()

    if (error) {
        console.error('Error saving PREVENT assessment:', error)
        throw error
    }

    return assessment
}

export async function getPreventAssessments(userId?: string) {
    let query = supabase
        .from('prevent_assessments')
        .select('*')
        .order('created_at', { ascending: false })

    if (userId) {
        query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching PREVENT assessments:', error)
        throw error
    }

    return data as PreventAssessment[]
}

export async function getPreventAssessmentById(id: string) {
    const { data, error } = await supabase
        .from('prevent_assessments')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching PREVENT assessment:', error)
        throw error
    }

    return data as PreventAssessment
}

// ===== KFRE ASSESSMENTS =====

export async function saveKfreAssessment(data: Omit<KfreAssessment, 'id' | 'created_at'>) {
    const { data: assessment, error } = await supabase
        .from('kfre_assessments')
        .insert([data])
        .select()
        .single()

    if (error) {
        console.error('Error saving KFRE assessment:', error)
        throw error
    }

    return assessment
}

export async function getKfreAssessments(userId?: string) {
    let query = supabase
        .from('kfre_assessments')
        .select('*')
        .order('created_at', { ascending: false })

    if (userId) {
        query = query.eq('user_id', userId)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching KFRE assessments:', error)
        throw error
    }

    return data as KfreAssessment[]
}

export async function getKfreAssessmentById(id: string) {
    const { data, error } = await supabase
        .from('kfre_assessments')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching KFRE assessment:', error)
        throw error
    }

    return data as KfreAssessment
}

// ===== USERS =====

export async function createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data: user, error } = await supabase
        .from('users')
        .insert([data])
        .select()
        .single()

    if (error) {
        console.error('Error creating user:', error)
        throw error
    }

    return user as User
}

export async function updateUser(id: string, data: Partial<User>) {
    const { data: user, error } = await supabase
        .from('users')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating user:', error)
        throw error
    }

    return user as User
}

export async function getUserByEmail(email: string) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching user:', error)
        throw error
    }

    return data as User | null
}

// ===== STATISTICS =====

export async function getUserStatistics(userId?: string) {
    const [preventAssessments, kfreAssessments] = await Promise.all([
        getPreventAssessments(userId),
        getKfreAssessments(userId),
    ])

    return {
        preventCount: preventAssessments.length,
        kfreCount: kfreAssessments.length,
        totalCount: preventAssessments.length + kfreAssessments.length,
        lastAssessment: [...preventAssessments, ...kfreAssessments]
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0],
    }
}
