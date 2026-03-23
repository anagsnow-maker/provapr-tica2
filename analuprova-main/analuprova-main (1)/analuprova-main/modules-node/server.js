const express = require('express');
const app = express();
const PORT = 3000;

// Requisito 2.1: Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

// Requisito 2.2: Classe HardwareEngine
class HardwareEngine {
    gerarDados() {
        return {
            cpu: Math.floor(Math.random() * 101), // 0 a 100%
            ram: Math.floor(Math.random() * 17),  // 0 a 16GB
            temp: Math.floor(Math.random() * (90 - 30 + 1)) + 30 // 30°C a 90°C
        };
    }
}

const engine = new HardwareEngine();

// Requisito 2.3: Endpoint GET /api/status
app.get('/api/status', (req, res) => {
    const dados = engine.gerarDados();
    res.json(dados);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});