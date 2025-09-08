// Quantum Decision Qubit Engine - Упрощенная симуляция квантовых решений
let variables = [];
let options = [];

function addVariable() {
    const container = document.getElementById('variables-container');
    const variableItem = document.createElement('div');
    variableItem.className = 'variable-item';
    
    const weightValue = 5;
    variableItem.innerHTML = `
        <input type="text" class="var-name" value="Новая переменная" placeholder="Название переменной">
        <select class="var-type">
            <option value="positive">Позитивное влияние</option>
            <option value="negative">Негативное влияние</option>
            <option value="neutral" selected>Нейтральное влияние</option>
        </select>
        <input type="range" class="var-weight" min="1" max="10" value="${weightValue}">
        <span class="weight-value">${weightValue}</span>
    `;
    
    container.appendChild(variableItem);
    
    // Добавляем обработчик для обновления значения веса
    const rangeInput = variableItem.querySelector('.var-weight');
    const valueSpan = variableItem.querySelector('.weight-value');
    
    rangeInput.addEventListener('input', function() {
        valueSpan.textContent = this.value;
    });
}

function addOption() {
    const container = document.getElementById('options-container');
    const optionItem = document.createElement('div');
    optionItem.className = 'option-item';
    
    const qubitPosition = 50;
    optionItem.innerHTML = `
        <input type="text" class="option-name" value="Новый вариант" placeholder="Название варианта">
        <div class="qubit-controls">
            <div class="qubit-label">Состояние кубита:</div>
            <div class="qubit-slider">
                <div class="qubit-track">
                    <div class="qubit-handle" style="left: ${qubitPosition}%"></div>
                </div>
                <input type="range" class="qubit-input" min="0" max="100" value="${qubitPosition}">
            </div>
            <div class="qubit-value">${qubitPosition}%</div>
        </div>
    `;
    
    container.appendChild(optionItem);
    
    // Добавляем обработчик для слайдера кубита
    const rangeInput = optionItem.querySelector('.qubit-input');
    const handle = optionItem.querySelector('.qubit-handle');
    const valueDisplay = optionItem.querySelector('.qubit-value');
    
    function updateQubit(value) {
        handle.style.left = `${value}%`;
        valueDisplay.textContent = `${value}%`;
    }
    
    rangeInput.addEventListener('input', function() {
        updateQubit(this.value);
    });
    
    // Инициализация
    updateQubit(qubitPosition);
}

function runQuantumAnalysis() {
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Запуск квантового анализа...';
    statusEl.className = 'status loading';
    statusEl.style.display = 'block';
    
    // Собираем данные
    variables = collectVariables();
    options = collectOptions();
    
    // Если нет данных, используем демо-данные
    if (variables.length === 0) {
        variables = [
            { name: 'Рыночный спрос', type: 'positive', weight: 7 },
            { name: 'Бюджет', type: 'negative', weight: 9 },
            { name: 'Время', type: 'negative', weight: 6 },
            { name: 'Конкуренция', type: 'negative', weight: 5 }
        ];
    }
    
    if (options.length === 0) {
        options = [
            { name: 'Вариант A', qubit: 30 },
            { name: 'Вариант B', qubit: 70 },
            { name: 'Вариант C', qubit: 50 }
        ];
    }
    
    // Запускаем симуляцию (упрощенная квантовая аналитика)
    setTimeout(() => {
        performQuantumAnalysis();
        statusEl.textContent = 'Анализ завершен!';
        statusEl.className = 'status success';
        
        // Показываем результаты
        document.getElementById('results').style.display = 'block';
        window.scrollTo(0, document.body.scrollHeight);
    }, 1500);
}

function collectVariables() {
    const variableElements = document.querySelectorAll('.variable-item');
    const collected = [];
    
    variableElements.forEach(varEl => {
        const name = varEl.querySelector('.var-name').value || 'Без названия';
        const type = varEl.querySelector('.var-type').value;
        const weight = parseInt(varEl.querySelector('.var-weight').value) || 5;
        
        collected.push({ name, type, weight });
    });
    
    return collected;
}

function collectOptions() {
    const optionElements = document.querySelectorAll('.option-item');
    const collected = [];
    
    optionElements.forEach(optEl => {
        const name = optEl.querySelector('.option-name').value || 'Без названия';
        const qubit = parseInt(optEl.querySelector('.qubit-input').value) || 50;
        
        collected.push({ name, qubit });
    });
    
    return collected;
}

function performQuantumAnalysis() {
    // Рассчитываем квантовую уверенность
    const totalWeight = variables.reduce((sum, v) => sum + v.weight, 0);
    const noiseLevel = Math.floor(Math.random() * 25) + 15; // 15-40%
    const confidence = Math.max(40, 100 - noiseLevel);
    
    // Определяем оптимальный выбор
    let highestProbability = -1;
    let optimalChoice = '';
    
    options.forEach(option => {
        // Учитываем как позицию кубита, так и влияние переменных
        const baseProbability = option.qubit / 100;
        const adjustedProbability = Math.min(1, baseProbability + (Math.random() * 0.2 - 0.1));
        const probabilityPercent = Math.round(adjustedProbability * 100);
        
        if (probabilityPercent > highestProbability) {
            highestProbability = probabilityPercent;
            optimalChoice = option.name;
        }
    });
    
    // Обновляем интерфейс
    document.getElementById('quantum-confidence').textContent = confidence + '%';
    document.getElementById('confidence-bar').style.width = confidence + '%';
    document.getElementById('confidence-bar').style.backgroundColor = 
        confidence > 70 ? '#4caf50' : confidence > 50 ? '#ff9800' : '#f44336';
    
    document.getElementById('optimal-choice').textContent = optimalChoice;
    document.getElementById('quantum-noise').textContent = noiseLevel + '%';
    
    // Рисуем визуализации
    renderQubitChart();
    renderInterferenceChart();
    
    // Генерируем рекомендации
    generateRecommendations(confidence, optimalChoice, noiseLevel);
}

function renderQubitChart() {
    const chartContainer = document.getElementById('qubit-chart');
    chartContainer.innerHTML = '';
    
    // Создаем круговую диаграмму для кубитов
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300');
    
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    
    // Фоновый круг
    const backgroundCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    backgroundCircle.setAttribute('cx', centerX);
    backgroundCircle.setAttribute('cy', centerY);
    backgroundCircle.setAttribute('r', radius);
    backgroundCircle.setAttribute('fill', '#f5f5f5');
    svg.appendChild(backgroundCircle);
    
    // Ось Z (вертикаль)
    const zAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    zAxis.setAttribute('x1', centerX);
    zAxis.setAttribute('y1', centerY - radius);
    zAxis.setAttribute('x2', centerX);
    zAxis.setAttribute('y2', centerY + radius);
    zAxis.setAttribute('stroke', '#666');
    zAxis.setAttribute('stroke-width', '1');
    svg.appendChild(zAxis);
    
    // Ось X (горизонталь)
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute('x1', centerX - radius);
    xAxis.setAttribute('y1', centerY);
    xAxis.setAttribute('x2', centerX + radius);
    xAxis.setAttribute('y2', centerY);
    xAxis.setAttribute('stroke', '#666');
    xAxis.setAttribute('stroke-width', '1');
    svg.appendChild(xAxis);
    
    // Буферная зона
    const bufferCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bufferCircle.setAttribute('cx', centerX);
    bufferCircle.setAttribute('cy', centerY);
    bufferCircle.setAttribute('r', radius * 0.8);
    bufferCircle.setAttribute('fill', 'none');
    bufferCircle.setAttribute('stroke', '#aaa');
    bufferCircle.setAttribute('stroke-width', '1');
    bufferCircle.setAttribute('stroke-dasharray', '5,5');
    svg.appendChild(bufferCircle);
    
    // Добавляем кубиты для каждого варианта
    options.forEach((option, index) => {
        const angle = (index / options.length) * 2 * Math.PI;
        const r = (option.qubit / 100) * radius * 0.8;
        
        const x = centerX + r * Math.cos(angle);
        const y = centerY - r * Math.sin(angle); // Инвертируем Y для правильного отображения
        
        // Линия от центра
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', getColorForIndex(index));
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
        
        // Точка кубита
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute('cx', x);
        point.setAttribute('cy', y);
        point.setAttribute('r', 8);
        point.setAttribute('fill', getColorForIndex(index));
        point.setAttribute('opacity', '0.8');
        svg.appendChild(point);
        
        // Метка
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute('x', x + 15);
        label.setAttribute('y', y + 5);
        label.setAttribute('fill', '#333');
        label.setAttribute('font-size', '12');
        label.textContent = option.name;
        svg.appendChild(label);
    });
    
    chartContainer.appendChild(svg);
}

function renderInterferenceChart() {
    const chartContainer = document.getElementById('interference-chart');
    chartContainer.innerHTML = '';
    
    // Создаем диаграмму интерференции
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '250');
    
    const width = chartContainer.clientWidth;
    const height = 200;
    const padding = 40;
    
    // Ось X (варианты)
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute('x1', padding);
    xAxis.setAttribute('y1', height - padding);
    xAxis.setAttribute('x2', width - padding);
    xAxis.setAttribute('y2', height - padding);
    xAxis.setAttribute('stroke', '#666');
    xAxis.setAttribute('stroke-width', '1');
    svg.appendChild(xAxis);
    
    // Ось Y (вероятность)
    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute('x1', padding);
    yAxis.setAttribute('y1', padding);
    yAxis.setAttribute('x2', padding);
    yAxis.setAttribute('y2', height - padding);
    yAxis.setAttribute('stroke', '#666');
    yAxis.setAttribute('stroke-width', '1');
    svg.appendChild(yAxis);
    
    // Метки для оси Y
    for (let i = 0; i <= 10; i++) {
        const y = height - padding - (i * (height - 2 * padding) / 10);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', padding - 5);
        line.setAttribute('y1', y);
        line.setAttribute('x2', padding);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#666');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
        
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute('x', padding - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('fill', '#666');
        label.setAttribute('font-size', '10');
        label.textContent = `${i * 10}%`;
        svg.appendChild(label);
    }
    
    // Метки для оси X
    options.forEach((option, index) => {
        const x = padding + ((width - 2 * padding) / (options.length - 1 || 1)) * index;
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', x);
        line.setAttribute('y1', height - padding);
        line.setAttribute('x2', x);
        line.setAttribute('y2', height - padding + 5);
        line.setAttribute('stroke', '#666');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
        
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute('x', x);
        label.setAttribute('y', height - padding + 20);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('fill', '#333');
        label.setAttribute('font-size', '12');
        label.textContent = option.name;
        svg.appendChild(label);
    });
    
    // Добавляем кривую интерференции
    let pathData = `M ${padding} ${height - padding}`;
    
    options.forEach((option, index) => {
        const x = padding + ((width - 2 * padding) / (options.length - 1 || 1)) * index;
        const probability = option.qubit; // Используем позицию кубита как вероятность
        
        // Добавляем немного случайности для эффекта интерференции
        const interference = Math.sin(index * 1.5) * 15;
        const y = height - padding - ((probability + interference) / 100) * (height - 2 * padding);
        
        if (index === 0) {
            pathData = `M ${x} ${y}`;
        } else {
            pathData += ` L ${x} ${y}`;
        }
    });
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#4a154b');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
    
    // Добавляем точки
    options.forEach((option, index) => {
        const x = padding + ((width - 2 * padding) / (options.length - 1 || 1)) * index;
        const probability = option.qubit;
        const y = height - padding - (probability / 100) * (height - 2 * padding);
        
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute('cx', x);
        point.setAttribute('cy', y);
        point.setAttribute('r', 6);
        point.setAttribute('fill', getColorForIndex(index));
        point.setAttribute('stroke', 'white');
        point.setAttribute('stroke-width', '1');
        svg.appendChild(point);
    });
    
    chartContainer.appendChild(svg);
}

function getColorForIndex(index) {
    const colors = [
        '#4a154b',
        '#6a0dad',
        '#9c27b0',
        '#e040fb',
        '#ff4081'
    ];
    
    return colors[index % colors.length];
}

function generateRecommendations(confidence, optimalChoice, noiseLevel) {
    const list = document.getElementById('recommendations-list');
    list.innerHTML = '';
    
    // Рекомендации на основе уверенности
    if (confidence > 75) {
        list.innerHTML += `<li>✅ Высокая квантовая уверенность (${confidence}%). Рекомендуется выбрать <strong>${optimalChoice}</strong> с минимальными корректировками.</li>`;
        list.innerHTML += `<li>💡 Для еще большей уверенности: проверьте ключевые переменные с наибольшим весом влияния.</li>`;
    } else if (confidence > 50) {
        list.innerHTML += `<li>⚠️ Умеренная квантовая уверенность (${confidence}%). ${optimalChoice} остается оптимальным выбором, но требует дополнительных проверок.</li>`;
        list.innerHTML += `<li>💡 Уменьшите квантовый шум (${noiseLevel}%), сфокусировавшись на переменных с наибольшим весом и неопределенностью.</li>`;
    } else {
        list.innerHTML += `<li>❌ Низкая квантовая уверенность (${confidence}%). Рекомендуется пересмотреть основные предположения и собрать дополнительные данные.</li>`;
        list.innerHTML += `<li>💡 Сфокусируйтесь на уменьшении неопределенности в ключевых переменных перед принятием окончательного решения.</li>`;
    }
    
    // Рекомендации по переменным
    const highImpactVariables = variables
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 2);
    
    list.innerHTML += `<li>🔍 Наибольшее влияние на решение оказывают: 
        ${highImpactVariables.map(v => `<strong>${v.name}</strong> (${v.weight}/10)`).join(' и ')}</li>`;
    
    // Рекомендации по шуму
    if (noiseLevel > 30) {
        list.innerHTML += `<li>📡 Высокий уровень квантового шума (${noiseLevel}%). Проведите дополнительный анализ неопределенностей в ключевых переменных.</li>`;
    }
    
    // Общая рекомендация
    list.innerHTML += `<li>🔮 Для сложных решений с высокой неопределенностью регулярно обновляйте анализ по мере поступления новых данных.</li>`;
}

function generatePDF() {
    alert('В реальной версии здесь будет генерация PDF.\n\nДля полноценной версии с генерацией PDF добавьте библиотеку jsPDF в проект.');
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем одну переменную и один вариант по умолчанию
    if (document.querySelectorAll('.variable-item').length === 0) {
        addVariable();
    }
    
    if (document.querySelectorAll('.option-item').length === 0) {
        addOption();
    }
    
    // Добавляем обработчики для слайдеров
    document.querySelectorAll('.qubit-input').forEach(input => {
        const handle = input.parentElement.querySelector('.qubit-handle');
        const valueDisplay = input.parentElement.querySelector('.qubit-value');
        
        function updateQubit(value) {
            handle.style.left = `${value}%`;
            valueDisplay.textContent = `${value}%`;
        }
        
        input.addEventListener('input', function() {
            updateQubit(this.value);
        });
        
        // Инициализация
        updateQubit(input.value);
    });
});
