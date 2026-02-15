const { createClient } = require('@supabase/supabase-js');

console.log('🔍 DIAGNÓSTICO DETALHADO DE CONEXÃO SUPABASE\n');
console.log('='.repeat(60));

// 1. Verificar variáveis de ambiente
console.log('\n1️⃣ VERIFICANDO VARIÁVEIS DE AMBIENTE:');
console.log('-'.repeat(60));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ecnxaedmlalzcnplcxsr.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjbnhhZWRtbGFsemNucGxjeHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTc3NDksImV4cCI6MjA4NjY3Mzc0OX0.U4GvC-FX5GZTws7w5pImAnl4abmYdn70x_EtjpcVviI';

console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey.substring(0, 20)}...${supabaseKey.substring(supabaseKey.length - 10)}`);

if (supabaseUrl.includes('placeholder')) {
    console.log('❌ ERRO: URL do Supabase é um placeholder!');
    process.exit(1);
}

// 2. Criar cliente
console.log('\n2️⃣ CRIANDO CLIENTE SUPABASE:');
console.log('-'.repeat(60));

let supabase;
try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Cliente Supabase criado com sucesso');
} catch (error) {
    console.log('❌ ERRO ao criar cliente:', error.message);
    process.exit(1);
}

// 3. Testar conexão básica
async function testConnection() {
    console.log('\n3️⃣ TESTANDO CONEXÃO BÁSICA:');
    console.log('-'.repeat(60));

    try {
        // Teste simples: listar tabelas
        const { data, error } = await supabase
            .from('prevent_assessments')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.log('❌ ERRO na conexão:', error.message);
            console.log('Código:', error.code);
            console.log('Detalhes:', error.details);
            console.log('Hint:', error.hint);
            return false;
        }

        console.log('✅ Conexão estabelecida com sucesso!');
        return true;
    } catch (error) {
        console.log('❌ ERRO inesperado:', error.message);
        return false;
    }
}

// 4. Testar leitura de dados
async function testRead() {
    console.log('\n4️⃣ TESTANDO LEITURA DE DADOS:');
    console.log('-'.repeat(60));

    try {
        const { data, error } = await supabase
            .from('prevent_assessments')
            .select('*')
            .limit(5);

        if (error) {
            console.log('❌ ERRO ao ler dados:', error.message);
            console.log('Código:', error.code);

            if (error.code === 'PGRST116') {
                console.log('💡 A tabela existe mas está vazia');
            } else if (error.code === '42P01') {
                console.log('💡 A tabela não existe! Execute o SQL de criação.');
            }
            return false;
        }

        console.log(`✅ Leitura bem-sucedida! ${data.length} registro(s) encontrado(s)`);
        if (data.length > 0) {
            console.log('\n📋 Exemplo de registro:');
            console.log(JSON.stringify(data[0], null, 2));
        }
        return true;
    } catch (error) {
        console.log('❌ ERRO inesperado:', error.message);
        return false;
    }
}

// 5. Testar escrita de dados
async function testWrite() {
    console.log('\n5️⃣ TESTANDO ESCRITA DE DADOS:');
    console.log('-'.repeat(60));

    const testData = {
        patient_name: 'Teste Conexão',
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

    try {
        const { data, error } = await supabase
            .from('prevent_assessments')
            .insert([testData])
            .select()
            .single();

        if (error) {
            console.log('❌ ERRO ao escrever dados:', error.message);
            console.log('Código:', error.code);
            console.log('Detalhes:', error.details);

            if (error.code === '42501') {
                console.log('💡 Problema de permissão! Verifique as políticas RLS.');
            }
            return false;
        }

        console.log('✅ Escrita bem-sucedida!');
        console.log('ID do registro criado:', data.id);
        return true;
    } catch (error) {
        console.log('❌ ERRO inesperado:', error.message);
        return false;
    }
}

// 6. Executar todos os testes
async function runAllTests() {
    console.log('\n' + '='.repeat(60));
    console.log('INICIANDO TESTES...');
    console.log('='.repeat(60));

    const connectionOk = await testConnection();
    if (!connectionOk) {
        console.log('\n❌ FALHA: Não foi possível conectar ao Supabase');
        console.log('\n💡 POSSÍVEIS CAUSAS:');
        console.log('   1. URL ou Key incorretas');
        console.log('   2. Projeto Supabase pausado/deletado');
        console.log('   3. Problema de rede/firewall');
        process.exit(1);
    }

    const readOk = await testRead();
    if (!readOk) {
        console.log('\n⚠️ AVISO: Não foi possível ler dados');
        console.log('\n💡 POSSÍVEIS CAUSAS:');
        console.log('   1. Tabela não existe (execute o SQL de criação)');
        console.log('   2. Políticas RLS bloqueando leitura');
    }

    const writeOk = await testWrite();
    if (!writeOk) {
        console.log('\n⚠️ AVISO: Não foi possível escrever dados');
        console.log('\n💡 POSSÍVEIS CAUSAS:');
        console.log('   1. Políticas RLS bloqueando escrita');
        console.log('   2. Campos obrigatórios faltando');
        console.log('   3. Tipo de dados incorreto');
    }

    console.log('\n' + '='.repeat(60));
    console.log('RESUMO DOS TESTES:');
    console.log('='.repeat(60));
    console.log(`Conexão: ${connectionOk ? '✅' : '❌'}`);
    console.log(`Leitura: ${readOk ? '✅' : '❌'}`);
    console.log(`Escrita: ${writeOk ? '✅' : '❌'}`);
    console.log('='.repeat(60));

    if (connectionOk && readOk && writeOk) {
        console.log('\n🎉 SUCESSO! Tudo está funcionando perfeitamente!');
    } else {
        console.log('\n⚠️ Alguns testes falharam. Veja os detalhes acima.');
    }
}

runAllTests();
