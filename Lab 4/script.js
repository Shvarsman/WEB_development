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

let storage = new dataStorage();

function addGame() {
    const key = prompt("Введите название игры:");
    if (key === null) {
        alert("Вы отказались делать ввод информации ою игре."); 
        return;
    }

    let value = prompt("Введите описание игры:");
    if (value === null) {
        alert("Вы отказались делать ввод информации об игре."); 
        return;
    }

    storage.AddValue(key, value);
    alert(`Добавлено: ${key} - ${value}`);
}


function deleteGame() {
    const key = prompt("Введите название игры для удаления:");
    if (key === null) {
        alert("Вы отказались делать удаление информации об игре."); 
        return;
    }
    storage.DeleteValue(key);
}

function getGameInfo() {
    const key = prompt("Введите название игры:");
    if (key === null) {
        alert("Вы отказались делать запрос информации об игре."); 
        return;
    }
    const info = storage.GetValue(key);
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

}