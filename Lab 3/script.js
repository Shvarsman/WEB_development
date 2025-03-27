let gameRoomHash = {};

function AddValue(key, value) {
    gameRoomHash[key] = value;
    console.log(`Игра "${key}" добавлена.`);
}

function DeleteValue(key) {
    if (gameRoomHash.hasOwnProperty(key)) {
        delete gameRoomHash[key];
        console.log(`Игра "${key}" удалена.`);
    } else {
        console.log(`Игра "${key}" не найдена.`);
    }
}

function GetValueInfo(key) {
    if (gameRoomHash.hasOwnProperty(key)) {
        return `Игра: ${key}, Описание: ${gameRoomHash[key]}`;
    } else {
        return "Нет информации";
    }
}

function ListValues() {
    let result = "";
    for (let key in gameRoomHash) {
        result += `Игра: ${key}, Описание: ${gameRoomHash[key]}\n`;
    }
    return result || "Нет информации";
}

function AddGame() {
    let key = prompt("Введите название игры:");
    let value = prompt("Введите описание игры:");
    AddValue(key, value);
}

function DeleteGame() {
    let key = prompt("Введите название игры для удаления:");
    DeleteValue(key);
}

function GetGameInfo() {
    let key = prompt("Введите название игры для получения информации:");
    console.log(GetValueInfo(key));
}

function ListAllGames() {
    console.log(ListValues());
}


