
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecnxaedmlalzcnplcxsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
    console.log('--- TESTE DE INSERÇÃO NO SUPABASE ---');
    try {
        const dummyData = {
            patient_age: 40,
            patient_gender: 'male',
            systolic_bp: 120,
            total_cholesterol: 180,
            hdl_cholesterol: 45,
            has_diabetes: false,
            is_smoker: false,
            on_bp_medication: false,
            risk_score: 5.5,
            risk_category: 'low'
        };

        const { data, error } = await supabase
            .from('prevent_assessments')
            .insert([dummyData])
            .select();

        if (error) {
            console.log('❌ ERRO AO INSERIR:', error.message);
            console.log('Detalhes:', error.details);
            console.log('Dica:', error.hint);
        } else {
            console.log('✅ SUCESSO! Registro inserido:', data[0].id);
        }
    } catch (e) {
        console.log('🚫 FALHA EXCEPCIONAL:', e.message);
    }
}

testInsert();
