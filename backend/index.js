// Conexão Backend
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const aplicacao = express();
const port = 4000;

aplicacao.use(cors());
aplicacao.use(bodyParser.json())

// Conexão com BD
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'senha123',
    port: 5432,
});

// Constantes de Moeda para chamada pelo Frontend
const valoresConversao = {
    BRLEUR: { cotacao: 0.19, simbolo: "R$" },
    BRLUSD: { cotacao: 0.20, simbolo: "R$" },
    USDBRL: { cotacao: 4.99, simbolo: "US$" },
    USDEUR: { cotacao: 0.92, simbolo: "US$" },
    EURBRL: { cotacao: 5.40, simbolo: "€" },
    EURUSD: { cotacao: 1.08, simbolo: "€" }
}

// Salvamento local
let historico = []

aplicacao.get('/', (req, res) => {
    res.send("Chamei o backend com sucesso");
});

aplicacao.post('/', (req, res) => {
    res.send("Chamei o backend com sucesso usando post");
});

aplicacao.get('/moedas', (req, res) => {
    const moedas = { BRL: "real", USD: "dolar", EUR: "euro" }
    res.status(200).json(moedas);
});

aplicacao.post('/moedas', (req, res) => {
    const moedas = { BRL: "real", USD: "dolar", EUR: "euro" }
    res.status(200).json(moedas);
});

aplicacao.get('/info', (req, res) => {
    const informacoes = {
        version: "1.0",
        author: "Obama",
        update: "May 2024",
        price: "Free",
        license: "Pipipopo"
    }
    res.status(200).json(informacoes);
});

aplicacao.get('/conversao/:moedas', (req, res) => {
    // Processo de conversão
    let moedas = req.params.moedas.split("-");
    let moeda1 = moedas[0];
    let moeda2 = moedas[1];
    conversao = valoresConversao[moeda1 + moeda2];

    if (conversao) {
        res.status(200).json(conversao)
    } else {
        res.status(400).json({ error: "Invalid currency conversion request" })
    };
});

aplicacao.get('/historico', (req, res) => {
    res.status(200).json(historico);
})

aplicacao.post('/historico', (req, res) => {
    console.log('Request body:', req.body);

    const { valorDoUsuario, valorMoeda1, valorMoeda2, cotacao, valorResultado } = req.body.data;

    console.log('Values extracted:', valorDoUsuario, valorMoeda1, valorMoeda2, cotacao, valorResultado);

    // Generate a timestamp for the current time
    const registro = new Date();
    console.log('Timestamp:', registro);

    // Execute SQL INSERT statement to insert data into historico-conversao table
    const query = `
        INSERT INTO historico_conversao (valor_usuario, moeda_entrada, moeda_saida, conversao, resultado, registro)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
    `;

    pool.query(query, [valorDoUsuario, valorMoeda1, valorMoeda2, cotacao, valorResultado, registro], (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            const id = result.rows[0].id;
            res.status(201).json({ id });
        }
    });
});


// Close the connection pool when the application exits
process.on('SIGINT', () => {
    pool.end(() => {
        console.log('Pool has ended');
        process.exit(0);
    });
});

// Handle 404 for undefined routes
aplicacao.use((req, res) => {
    res.status(404).json({ error: "Resource not found" });
});

// Handle 500 for unexpected errors
aplicacao.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

// Aplicação ouvindo a porta 4000
aplicacao.listen(port, () => {
    console.log("Escutando na porta 4000");
});
