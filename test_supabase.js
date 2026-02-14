
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecnxaedmlalzcnplcxsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
    console.log('--- TESTE SUPABASE ---');
    try {
        const { data, error } = await supabase.from('prevent_assessments').select('*').limit(1);
        if (error) {
            console.log('❌ ERRO:', error.message);
            if (error.message.includes('relation "prevent_assessments" does not exist')) {
                console.log('💡 DICA: As tabelas não foram criadas. Você executou o SQL no dashboard do Supabase?');
            }
        } else {
            console.log('✅ SUCESSO: Tabela prevent_assessments encontrada!');
        }
    } catch (e) {
        console.log('🚫 FALHA CATASTRÓFICA:', e.message);
    }
}

test();
