
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecnxaedmlalzcnplcxsr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRows() {
    console.log('--- CONTAGEM DE REGISTROS NO SUPABASE ---');

    const { count: preventCount, error: error1 } = await supabase
        .from('prevent_assessments')
        .select('*', { count: 'exact', head: true });

    const { count: kfreCount, error: error2 } = await supabase
        .from('kfre_assessments')
        .select('*', { count: 'exact', head: true });

    if (error1) console.log('❌ Erro PREVENT:', error1.message);
    else console.log('📊 PREVENT Assessments:', preventCount);

    if (error2) console.log('❌ Erro KFRE:', error2.message);
    else console.log('📊 KFRE Assessments:', kfreCount);
}

checkRows();
