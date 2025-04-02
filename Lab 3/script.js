class dataStorage {
    constructor() {
        this.storage = {};
    }

    Reset() {
        this.storage = {};
        console.log("Хранилище очищено.");
        this.updateOutput("Хранилище очищено.");
    }

    AddValue(key, value) {
        this.storage[key] = value;
        console.log(`Пара "${key}: ${value}" добавлена.`);
        this.updateOutput(`Добавлено: ${key} - ${value}`);
    }

    GetValue(key) {
        return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
    }

    DeleteValue(key) {
        if (this.storage.hasOwnProperty(key)) {
            delete this.storage[key];
            console.log(`Пара с ключом "${key}" удалена.`);
            this.updateOutput(`Удалено: ${key}`);
        } else {
            console.log(`Пара с ключом "${key}" не найдена.`);
            this.updateOutput(`Пара с ключом "${key}" не найдена.`);
        }
    }

    GetKeys() {
        return Object.keys(this.storage);
    }

    updateOutput(message) {
        const output = document.getElementById('output');
        output.innerHTML += `<p>${message}</p>`;
    }
}

// Класс для работы с localStorage
class TLocalStorage extends dataStorage {
    constructor() {
        super();
        this.storageKey = 'gamesStorage';
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem(this.storageKey);
        this.storage = data ? JSON.parse(data) : {};
    }

    saveToLocalStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.storage));
    }

    Reset() {
        super.Reset();
        localStorage.removeItem(this.storageKey);
    }

    AddValue(key, value) {
        super.AddValue(key, value);
        this.saveToLocalStorage();
    }

    DeleteValue(key) {
        super.DeleteValue(key);
        this.saveToLocalStorage();
    }
}

// Создаем экземпляры хранилищ
const memoryStorage = new dataStorage();
const localStorage = new TLocalStorage();

// Текущее хранилище (по умолчанию - memoryStorage)
let currentStorage = memoryStorage;
updateStorageTypeDisplay();

// Функции для работы с интерфейсом
function addGame() {
    const key = prompt("Введите название игры:");
    if (key === null || key.trim() === "") {
        alert("Вы отказались делать ввод информации об игре.");
        return;
    }

    let value = prompt("Введите описание игры:");
    if (value === null || value.trim() === "") {
        alert("Вы отказались делать ввод информации об игре.");
        return;
    }

    currentStorage.AddValue(key.trim(), value.trim());
}

function deleteGame() {
    const key = prompt("Введите название игры для удаления:");
    if (key === null || key.trim() === "") {
        alert("Вы отказались делать удаление информации об игре.");
        return;
    }
    currentStorage.DeleteValue(key.trim());
}

function getGameInfo() {
    const key = prompt("Введите название игры:");
    if (key === null || key.trim() === "") {
        alert("Вы отказались делать запрос информации об игре.");
        return;
    }
    const info = currentStorage.GetValue(key.trim());
    currentStorage.updateOutput(info !== undefined ? `${key}: ${info}` : "Нет информации");
}

function listAllGames() {
    const keys = currentStorage.GetKeys();
    const output = document.getElementById('output');
    output.innerHTML = '<h3>Список всех игр:</h3>';
    
    if (keys.length > 0) {
        keys.forEach(key => {
            const info = currentStorage.GetValue(key);
            output.innerHTML += `<p><strong>${key}:</strong> ${info}</p>`;
            console.log(`Игра: ${key}, Описание: ${info}`);
        });
    } else {
        output.innerHTML += '<p>Нет информации</p>';
        console.log("Нет информации");
    }
}

function resetStorage() {
    if (confirm("Вы уверены, что хотите очистить хранилище?")) {
        currentStorage.Reset();
    }
}

function switchStorage() {
    currentStorage = currentStorage instanceof TLocalStorage ? memoryStorage : localStorage;
    updateStorageTypeDisplay();
    currentStorage.updateOutput(`Используется хранилище: ${currentStorage instanceof TLocalStorage ? 'localStorage' : 'dataStorage'}`);
}

function updateStorageTypeDisplay() {
    document.getElementById('storageType').textContent = 
        currentStorage instanceof TLocalStorage ? 'localStorage' : 'dataStorage';
}