// Quantum Decision Qubit Engine
// Квантово-вдохновленный движок принятия решений

class QuantumDecisionEngine {
    constructor() {
        this.decisionName = "Новое решение";
        this.variables = [];
        this.options = [];
        this.analysisResults = null;
    }
    
    setDecisionName(name) {
        this.decisionName = name || "Новое решение";
        return this;
    }
    
    addVariable(name, type, weight) {
        this.variables.push({
            id: this.variables.length + 1,
            name: name || "Переменная " + (this.variables.length + 1),
            type: type || "cost",
            weight: weight || 5
        });
        return this;
    }
    
    addOption(name, values) {
        this.options.push({
            id: this.options.length + 1,
            name: name || "Вариант " + (String.fromCharCode(65 + this.options.length)),
            values: values || this.variables.map(v => ({
                variableId: v.id,
                value: 5
            }))
        });
        return this;
    }
    
    runAnalysis() {
        if (this.variables.length === 0 || this.options.length === 0) {
            throw new Error("Недостаточно данных для анализа");
        }
        
        // Показываем индикатор загрузки
        const statusPanel = document.getElementById('status');
        statusPanel.innerHTML = `
            <div class="loading">
                <div class="quantum-spinner"></div>
                <p>Квантовый анализ решения... Симуляция 15+ переменных в суперпозиции</p>
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
            </div>
        `;
        
        // Имитация квантового анализа
        return new Promise((resolve) => {
            let progress = 0;
            const progressBar = statusPanel.querySelector('.progress');
            
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Генерируем реалистичные результаты
                    const uncertaintyLevel = Math.floor(Math.random() * 30);
                    const sensitivity = Math.min(3, Math.floor(this.variables.length * 0.4) + 1);
                    
                    // Вычисляем вероятности для каждого варианта
                    const probabilities = this.options.map(option => {
                        let score = 0;
                        let totalWeight = 0;
                        
                        option.values.forEach(value => {
                            const variable = this.variables.find(v => v.id === value.variableId);
                            if (variable) {
                                score += value.value * variable.weight;
                                totalWeight += variable.weight;
                            }
                        });
                        
                        return score / totalWeight;
                    });
                    
                    // Нормализуем вероятности
                    const maxProb = Math.max(...probabilities);
                    const minProb = Math.min(...probabilities);
                    const normalizedProbs = probabilities.map(p => 
                        ((p - minProb) / (maxProb - minProb || 1)) * 100);
                    
                    // Находим оптимальный выбор
                    const optimalIndex = probabilities.indexOf(maxProb);
                    const optimalChoice = this.options[optimalIndex].name;
                    const confidence = Math.min(95, 70 + Math.floor(maxProb * 25));
                    
                    this.analysisResults = {
                        uncertaintyLevel: uncertaintyLevel,
                        sensitivity: sensitivity,
                        optimalChoice: optimalChoice,
                        confidence: confidence,
                        probabilities: normalizedProbs,
                        quantumState: this.generateQuantumState(),
                        recommendations: this.generateRecommendations(
                            optimalIndex, confidence, uncertaintyLevel, sensitivity)
                    };
                    
                    setTimeout(() => {
                        statusPanel.innerHTML = `
                            <div class="success">
                                <div class="checkmark">✓</div>
                                <p>Анализ завершен! Оптимальный выбор: ${optimalChoice} (${confidence}% уверенности)</p>
                            </div>
                        `;
                        resolve(this.analysisResults);
                    }, 300);
                }
                progressBar.style.width = `${Math.min(100, progress)}%`;
            }, 150);
        });
    }
    
    generateQuantumState() {
        // Генерируем квантовое состояние для визуализации
        const theta = Math.random() * Math.PI;
        const phi = Math.random() * 2 * Math.PI;
        
        return {
            theta: theta,
            phi: phi,
            x: Math.sin(theta) * Math.cos(phi),
            y: Math.sin(theta) * Math.sin(phi),
            z: Math.cos(theta)
        };
    }
    
    generateRecommendations(optimalIndex, confidence, uncertainty, sensitivity) {
        const recommendations = [];
        
        // Рекомендации на основе уверенности
        if (confidence > 85) {
            recommendations.push({
                priority: 'low',
                title: 'Высокая уверенность в решении',
                description: `Вероятность успеха выбранного варианта (${confidence}%) очень высока. Можно приступать к реализации.`
            });
        } else if (confidence > 70) {
            recommendations.push({
                priority: 'medium',
                title: 'Умеренная уверенность',
                description: `Вероятность успеха выбранного варианта (${confidence}%) удовлетворительна. Рекомендуется провести дополнительный анализ ключевых переменных.`
            });
        } else {
            recommendations.push({
                priority: 'high',
                title: 'Низкая уверенность',
                description: `Вероятность успеха выбранного варианта (${confidence}%) ниже оптимального уровня. Необходимо уточнить данные по ключевым переменным.`
            });
        }
        
        // Рекомендации на основе неопределенности
        if (uncertainty > 25) {
            recommendations.push({
                priority: 'high',
                title: 'Высокая неопределенность',
                description: `Уровень неопределенности (${uncertainty}%) слишком высок. Сфокусируйтесь на сборе данных по ключевым переменным.`
            });
        } else if (uncertainty > 15) {
            recommendations.push({
                priority: 'medium',
                title: 'Умеренная неопределенность',
                description: `Уровень неопределенности (${uncertainty}%) требует внимания к ключевым переменным решения.`
            });
        }
        
        // Рекомендации по чувствительности
        recommendations.push({
            priority: 'medium',
            title: `Чувствительность к ${sensitivity} переменным`,
            description: 'Решение особенно чувствительно к изменениям в ключевых переменных. Регулярно пересматривайте данные по этим параметрам.'
        });
        
        // Конкретные рекомендации
        recommendations.push({
            priority: 'low',
            title: 'Мониторинг',
            description: 'Проводите повторный анализ каждые 2 недели или при значительных изменениях в проекте.'
        });
        
        return recommendations;
    }
    
    getResults() {
        return this.analysisResults;
    }
}

// Глобальные переменные
let qde = new QuantumDecisionEngine();
let sampleDecisions = {
    productLaunch: {
        name: "Запуск нового продукта",
        variables: [
            {id: 1, name: "Рыночный спрос", type: "market", weight: 8},
            {id: 2, name: "Бюджет", type: "cost", weight: 7},
            {id: 3, name: "Сроки", type: "time", weight: 6},
            {id: 4, name: "Конкуренция", type: "market", weight: 7},
            {id: 5, name: "Качество", type: "quality", weight: 8}
        ],
        options: [
            {
                id: 1,
                name: "Вариант A: Премиум-сегмент",
                values: [
                    {variableId: 1, value: 9},
                    {variableId: 2, value: 4},
                    {variableId: 3, value: 7},
                    {variableId: 4, value: 3},
                    {variableId: 5, value: 9}
                ]
            },
            {
                id: 2,
                name: "Вариант B: Массовый рынок",
                values: [
                    {variableId: 1, value: 8},
                    {variableId: 2, value: 7},
                    {variableId: 3, value: 5},
                    {variableId: 4, value: 6},
                    {variableId: 5, value: 6}
                ]
            },
            {
                id: 3,
                name: "Вариант C: Нишевый продукт",
                values: [
                    {variableId: 1, value: 6},
                    {variableId: 2, value: 8},
                    {variableId: 3, value: 9},
                    {variableId: 4, value: 2},
                    {variableId: 5, value: 8}
                ]
            }
        ]
    },
    teamStructure: {
        name: "Оптимизация структуры команды",
        variables: [
            {id: 1, name: "Бюджет", type: "cost", weight: 9},
            {id: 2, name: "Сроки", type: "time", weight: 7},
            {id: 3, name: "Качество", type: "quality", weight: 8},
            {id: 4, name: "Гибкость", type: "resource", weight: 6}
        ],
        options: [
            {
                id: 1,
                name: "Вариант A: Найм новых сотрудников",
                values: [
                    {variableId: 1, value: 3},
                    {variableId: 2, value: 9},
                    {variableId: 3, value: 8},
                    {variableId: 4, value: 4}
                ]
            },
            {
                id: 2,
                name: "Вариант B: Аутсорсинг",
                values: [
                    {variableId: 1, value: 6},
                    {variableId: 2, value: 7},
                    {variableId: 3, value: 6},
                    {variableId: 4, value: 8}
                ]
            },
            {
                id: 3,
                name: "Вариант C: Перераспределение текущих ресурсов",
                values: [
                    {variableId: 1, value: 9},
                    {variableId: 2, value: 5},
                    {variableId: 3, value: 7},
                    {variableId: 4, value: 6}
                ]
            }
        ]
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем демо-переменные
    addVariable();
    addVariable();
    addVariable();
    
    // Добавляем демо-варианты
    addOption();
    addOption();
    addOption();
    
    // Обновление названия решения
    document.getElementById('decisionName').addEventListener('input', function() {
        qde.setDecisionName(this.value);
    });
    
    // Запуск анализа
    document.getElementById('runAnalysis').addEventListener('click', function() {
        // Собираем данные
        qde = new QuantumDecisionEngine();
        
        qde.setDecisionName(document.getElementById('decisionName').value || "Мое решение");
        
        // Собираем переменные
        document.querySelectorAll('.variable-item').forEach(item => {
            const name = item.querySelector('.variable-name').value || "Без названия";
            const type = item.querySelector('.variable-type').value;
            const weight = parseInt(item.querySelector('.variable-weight').value) || 5;
            
            qde.addVariable(name, type, weight);
        });
        
        // Собираем варианты
        document.querySelectorAll('.option-item').forEach(optionItem => {
            const name = optionItem.querySelector('.option-name').value || "Вариант";
            const values = [];
            
            // Собираем значения для каждой переменной
            optionItem.querySelectorAll('.variable-value').forEach(valueItem => {
                const variableId = parseInt(valueItem.dataset.variableId);
                const value = parseInt(valueItem.value) || 5;
                values.push({variableId, value});
            });
            
            qde.addOption(name, values);
        });
        
        // Запуск анализа
        qde.runAnalysis()
            .then(results => {
                // Отображение результатов
                document.getElementById('optimalChoice').textContent = results.optimalChoice;
                document.getElementById('uncertaintyLevel').textContent = results.uncertaintyLevel + '%';
                document.getElementById('sensitivity').textContent = results.sensitivity;
                
                // Отображение рекомендаций
                const recommendationsList = document.getElementById('recommendationsList');
                recommendationsList.innerHTML = '';
                
                results.recommendations.forEach(rec => {
                    const recElement = document.createElement('div');
                    recElement.className = `recommendation-item priority-${rec.priority}`;
                    recElement.innerHTML = `
                        <div class="rec-header">
                            <span class="priority-badge ${rec.priority}">${rec.priority}</span>
                            <h4>${rec.title}</h4>
                        </div>
                        <p>${rec.description}</p>
                    `;
                    recommendationsList.appendChild(recElement);
                });
                
                // Отображение результатов
                document.getElementById('resultsPanel').style.display = 'block';
                
                // Визуализация
                renderBlochSphere(results.quantumState);
                renderProbabilityChart(qde.options, results.probabilities);
            })
            .catch(error => {
                document.getElementById('status').innerHTML = `
                    <div class="error">
                        <div class="error-icon">!</div>
                        <p>Ошибка анализа: ${error.message}</p>
                    </div>
                `;
            });
    });
    
    // Переключение вкладок
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс со всех кнопок и вкладок
           
