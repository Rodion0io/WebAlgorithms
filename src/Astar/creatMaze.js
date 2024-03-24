const height = 5;
const width = 5;
const heightField = 550;
const widthField = 550;

function createMaze(height, width){
    var matrix = [];
    for (let i = 0; i < height; i++){
        matrix[i] = [];
        for (let j = 0; j < width; j++){
            matrix[i][j] = 0;
        }
    }

    // Выберите случайную ячейку с нечетными x и y координатами и очистите ее.
    var x = Math.floor(Math.random() * (width / 2)) * 2;
    var y = Math.floor(Math.random() * (height / 2)) * 2;
    matrix[x][y] = 1;

    // Создайте массив и добавьте в него допустимые ячейки, находящиеся на два ортогональных пространства от ячейки, которую вы только что очистили.
    var array = [];
    if (y - 2 >= 0) {
        array.push({ x: x, y: y - 2});
    }
    if (y + 2 < height) {
        array.push({ x: x, y: y + 2});
    }
    if (x - 2 >= 0) {
        array.push({ x: x - 2, y: y });
    }
    if (x + 2 < width) {
        array.push({ x: x + 2, y: y });
    }

    while (array.length > 0){
        var index = Math.floor(Math.random() * array.length);
        var cell = array[index];
        x = cell.x;
        y = cell.y;
        matrix[x][y] = 1;
        array.splice(index, 1);

    }

    var directions = ['north', 'south', 'east', 'west'];
    while (directions.length > 0){
        var directionsIndex = Math.floor(Math.random() * (directions.length));
        switch (directions[directionsIndex]){
            case 'north':
                if (y - 2 >= 0 && matrix[x][y - 2] == 0){
                    matrix[x][y - 1] = 1;
                    directions = [];
                }
                break;
            case 'south':
                if (y + 2 < height && matrix[x][y + 2] == 0){
                    matrix[x][y + 1] = 1;
                    directions = [];
                }
                break;
            case 'east':
                if (x + 2 < width && matrix[x + 2][y] == 0){
                    matrix[x + 1][y] = 1;
                    directions = [];
                }
                break;
            case 'west':
                if (x - 2 >= 0 && matrix[x - 2][y] == 0){
                    matrix[x - 1][y] = 1;
                    directions = [];
                }
                break;
        }
        directions.splice(directionsIndex,1);
    }

    var to_check = [];
    if (y - 2 >= 0 && matrix[x][y - 2] == 0){
        to_check.push({ x: x, y: y - 2 });
    }
    if (y + 2 < height && matrix[x][y + 2] == 0){
        to_check.push({ x: x, y: y + 2 });
    }
    if (x - 2 >= 0 && matrix[x - 2][y] == 0){
        to_check.push({ x: x - 2, y: y });
    }
    if (x + 2 < width && matrix[x + 2][y] == 0){
        to_check.push({ x: x + 2, y: y });
    }   
    return matrix;
}

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