
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecnxaedmlalzcnplcxsr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verify() {
    console.log('Verificando tabelas no Supabase...')

    const { data: prevent, error: preventError } = await supabase
        .from('prevent_assessments')
        .select('*')
        .limit(1)

    if (preventError) {
        console.error('❌ Erro ao acessar prevent_assessments:', preventError.message)
    } else {
        console.log('✅ Tabela prevent_assessments acessível!')
    }

    const { data: kfre, error: kfreError } = await supabase
        .from('kfre_assessments')
        .select('*')
        .limit(1)

    if (kfreError) {
        console.error('❌ Erro ao acessar kfre_assessments:', kfreError.message)
    } else {
        console.log('✅ Tabela kfre_assessments acessível!')
    }
}

verify()
