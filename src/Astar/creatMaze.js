const height = 55;
const width = 55;
const heightField = 550;
const widthField = 550;

function createMaze(width, height) {
    // Создаем пустой двумерный массив для карты лабиринта
    let map = [];
  
    // Заполняем карту стенами
    for (let h = 0; h < height; h++) {
      let row = [];
      for (let w = 0; w < width; w++) {
        row.push(1); // Стена
      }
      map.push(row);
    }
  
    // Выбираем случайную ячейку с нечетными координатами и очищаем ее
    let x = Math.floor(Math.random() * (width / 2)) * 2;
    let y = Math.floor(Math.random() * (height / 2)) * 2;
    map[y][x] = 0; // Пустая ячейка
  
    // Создаем массив и добавляем соседние ячейки, которые находятся на расстоянии двух клеток от выбранной
    let toCheck = [];
    if (y - 2 >= 0) {
      toCheck.push({ x: x, y: y - 2 });
    }
    if (y + 2 < height) {
      toCheck.push({ x: x, y: y + 2 });
    }
    if (x - 2 >= 0) {
      toCheck.push({ x: x - 2, y: y });
    }
    if (x + 2 < width) {
      toCheck.push({ x: x + 2, y: y });
    }
  
    while (toCheck.length > 0) {
      let randomIndex = Math.floor(Math.random() * toCheck.length);
      let currentCell = toCheck[randomIndex];
      x = currentCell.x;
      y = currentCell.y;
      map[y][x] = 0; // Очищаем текущую ячейку
  
      // Соединяем очищенную ячейку с другой пустой ячейкой
      let directions = ["N", "S", "E", "W"];
      while (directions.length > 0) {
        let dirIndex = Math.floor(Math.random() * directions.length);
        switch (directions[dirIndex]) {
          case "N":
            if (y - 2 >= 0 && map[y - 2][x] === 0) {
              map[y - 1][x] = 0;
              directions = [];
            }
            break;
          case "S":
            if (y + 2 < height && map[y + 2][x] === 0) {
              map[y + 1][x] = 0;
              directions = [];
            }
            break;
          case "E":
            if (x - 2 >= 0 && map[y][x - 2] === 0) {
              map[y][x - 1] = 0;
              directions = [];
            }
            break;
          case "W":
            if (x + 2 < width && map[y][x + 2] === 0) {
              map[y][x + 1] = 0;
              directions = [];
            }
            break;
        }
        directions.splice(dirIndex, 1);
      }
  
      // Добавляем соседние ячейки, которые являются стенами
      if (y - 2 >= 0 && map[y - 2][x] === 1) {
        toCheck.push({ x: x, y: y - 2 });
      }
      if (y + 2 < height && map[y + 2][x] === 1) {
        toCheck.push({ x: x, y: y + 2 });
      }
      if (x - 2 >= 0 && map[y][x - 2] === 1) {
        toCheck.push({ x: x - 2, y: y });
      }
      if (x + 2 < width && map[y][x + 2] === 1) {
        toCheck.push({ x: x + 2, y: y });
      }
  
      // Удаляем текущую ячейку из массива toCheck
      toCheck.splice(randomIndex, 1);
    }
  
    return map;
}
  
  // Пример использования функции

// for (let row of createMaze(height, width)){
//     console.log(row.join("\t"));
// }


var matrix = createMaze(height, width);

function visualizationMaze(matrix, height, width, heightField, widthField) {
    const heightItem = heightField / height;
    const widthItem = widthField / width;
    const field = document.querySelector('.field');

    for (let i = 0; i < height; i++) {
        const element = document.createElement('div');
        element.classList.add('block');
        element.style.display = 'flex';
        field.appendChild(element);
        for (let j = 0; j < width; j++) {
            const childElement = document.createElement('div');
            childElement.classList.add('block__item');
            childElement.style.backgroundColor = matrix[i][j] == 1 ? 'red' : 'blue';
            childElement.style.display = 'inline-block';
            childElement.style.width = `${widthItem}px`;
            childElement.style.height = `${heightItem}px`;
            element.appendChild(childElement);
        }
    }
}

visualizationMaze(matrix, height, width, heightField, widthField);