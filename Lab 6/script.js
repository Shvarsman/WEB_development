class dataStorage {
    constructor() {
        this.storage = {};
    }

    Reset() {
        this.storage = {};
        console.log("Хранилище очищено.");
    }

    AddValue(key, value) {
        this.storage[key] = value;
        console.log(`Пара "${key}: ${value}" добавлена.`);
    }

    GetValue(key) {
        return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
    }

    DeleteValue(key) {
        if (this.storage.hasOwnProperty(key)) {
            delete this.storage[key];
            console.log(`Пара с ключом "${key}" удалена.`);
        } else {
            console.log(`Пара с ключом "${key}" не найдена.`);
        }
    }

    GetKeys() {
        return Object.keys(this.storage);
    }
}

class TLocalStorage {
    AddValue(key, value) {
        localStorage.setItem(key, value);
        console.log(`Пара "${key}: ${value}" добавлена в локальное хранилище.`);
    }

    GetValue(key) {
        return localStorage.getItem(key);
    }

    DeleteValue(key) {
        localStorage.removeItem(key);
        console.log(`Пара с ключом "${key}" удалена из локального хранилища.`);
    }

    Reset() {
        localStorage.clear();
        console.log("Локальное хранилище очищено.");
    }

    GetKeys() {
        return Object.keys(localStorage);
    }
}

let storage = new dataStorage();
let localStorageHandler = new TLocalStorage();

function addGame() {
    const key = prompt("Введите название игры:");
    if (key === null) {
        alert("Вы отказались делать ввод информации об игре.");
        return;
    }

    let value = prompt("Введите описание игры:");
    if (value === null) {
        alert("Вы отказались делать ввод информации об игре.");
        return;
    }

    storage.AddValue(key, value);
    localStorageHandler.AddValue(key, value); // Сохраняем в локальное хранилище
    alert(`Добавлено: ${key} - ${value}`);
}

function deleteGame() {
    const key = prompt("Введите название игры для удаления:");
    if (key === null) {
        alert("Вы отказались делать удаление информации об игре.");
        return;
    }
    storage.DeleteValue(key);
    localStorageHandler.DeleteValue(key); // Удаляем из локального хранилища
}

function getGameInfo() {
    const key = prompt("Введите название игры:");
    if (key === null) {
        alert("Вы отказались делать запрос информации об игре.");
        return;
    }
    const info = storage.GetValue(key);
    const localInfo = localStorageHandler.GetValue(key);
    alert(info !== undefined ? `${key}: ${info}` : "Нет информации");
}

function listAllGames() {
    const keys = storage.GetKeys();
    if (keys.length > 0) {
        keys.forEach(key => {
            console.log(`Игра: ${key}, Описание: ${storage.GetValue(key)}`);
        });
    } else {
        console.log("Нет информации");
    }

    // Перечисляем все игры из локального хранилища
    const localKeys = localStorageHandler.GetKeys();
    if (localKeys.length > 0) {
        localKeys.forEach(key => {
            console.log(`Локальное хранилище - Игра: ${key}, Описание: ${localStorageHandler.GetValue(key)}`);
        });
    } else {
        console.log("Нет информации в локальном хранилище");
    }
}
