const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'https://ecnxaedmlalzcnplcxsr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI';

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔧 ADICIONANDO CAMPO patient_name VIA RPC\n');
console.log('='.repeat(60));

async function addPatientNameColumn() {
    console.log('\n📋 INSTRUÇÕES:');
    console.log('='.repeat(60));
    console.log('\nPara adicionar o campo patient_name, você precisa:');
    console.log('\n1. Acessar: https://supabase.com/dashboard/project/ecnxaedmlalzcnplcxsr/sql/new');
    console.log('\n2. Copiar e colar este SQL:\n');

    console.log('─'.repeat(60));
    console.log(`
-- Adicionar campo patient_name
ALTER TABLE prevent_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;

ALTER TABLE kfre_assessments 
ADD COLUMN IF NOT EXISTS patient_name TEXT;
`);
    console.log('─'.repeat(60));

    console.log('\n3. Clicar em "RUN" (ou Ctrl+Enter)');
    console.log('\n4. Aguardar mensagem: "Success. No rows returned"');
    console.log('\n5. Voltar aqui e pressionar ENTER para testar\n');

    // Aguardar input do usuário
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        readline.question('Pressione ENTER após executar o SQL no Supabase... ', async () => {
            readline.close();

            console.log('\n🧪 TESTANDO SE O CAMPO FOI ADICIONADO...\n');

            // Testar inserção com patient_name
            const testData = {
                patient_name: 'Teste Automático',
                patient_age: 50,
                patient_gender: 'male',
                systolic_bp: 120,
                total_cholesterol: 200,
                hdl_cholesterol: 50,
                has_diabetes: false,
                is_smoker: false,
                on_bp_medication: false,
                risk_score: 5.5,
                risk_category: 'Baixo'
            };

            const { data, error } = await supabase
                .from('prevent_assessments')
                .insert([testData])
                .select()
                .single();

            if (error) {
                console.log('❌ ERRO:', error.message);
                console.log('\n💡 O campo ainda não foi adicionado.');
                console.log('   Certifique-se de executar o SQL no Supabase.');
                resolve(false);
            } else {
                console.log('✅ SUCESSO! Campo patient_name adicionado!');
                console.log('\n📋 Registro de teste criado:');
                console.log(`   ID: ${data.id}`);
                console.log(`   Nome: ${data.patient_name}`);
                console.log('\n🎉 Tudo está funcionando perfeitamente!');
                resolve(true);
            }
        });
    });
}

addPatientNameColumn();
