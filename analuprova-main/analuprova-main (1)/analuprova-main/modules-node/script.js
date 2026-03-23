// Requisito 4.1: Classe Base para componentes de UI
class UIComponent {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
        this.display = this.container.querySelector('.display');
    }
}

// Requisito 4.2 e 4.3: Herança e Especialização
class HardwareCard extends UIComponent {
    constructor(elementId, unit) {
        super(elementId);
        this.unit = unit;
    }

    // Requisito 4.4: Lógica de atualização e Alerta Crítico
    render(value, isCritical = false) {
        this.display.textContent = `${value} ${this.unit}`;
        
        if (isCritical) {
            this.container.classList.add('alerta-critico');
        } else {
            this.container.classList.remove('alerta-critico');
        }
    }
}

// Inicialização dos objetos de hardware
const cpuCard = new HardwareCard('cpu-monitor', '%');
const ramCard = new HardwareCard('ram-monitor', 'GB');
const tempCard = new HardwareCard('temp-monitor', '°C');

// Requisito 4.5: Consumo da API via Fetch
async function updateDashboard() {
    try {
        const res = await fetch('/api/status');
        const data = await res.json();

        // Regras de negócio para alertas
        const cpuAlarm = data.cpu > 90;
        const tempAlarm = data.temp > 75;

        cpuCard.render(data.cpu, cpuAlarm);
        ramCard.render(data.ram);
        tempCard.render(data.temp, tempAlarm);

        document.getElementById('clock').textContent = data.timestamp;
    } catch (err) {
        console.error("Falha na conexão com o servidor.");
    }
}

// Atualização em tempo real (2 segundos)
setInterval(updateDashboard, 2000);
updateDashboard();