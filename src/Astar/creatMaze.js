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

    var x = Math.floor(Math.random() * (width / 2)) * 2 + 1;
    var y = Math.floor(Math.random() * (height / 2)) * 2 + 1;
    matrix[x][y] =  1;

    var array = [];
    if (y - 2 >= 0){
        array.push({x: x, y: y - 2});
    }
    if (y + 2 < height){
        array.push({x: x, y: y + 2});
    }
    if (x - 2 >= 0){
        array.push({x: x - 2, y: y});
    }
    if (x + 2 < width){
        array.push({x: x + 2, y: y});
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
                if (y - 2 >= 0 && matrix[x][y - 2] == 1){
                    matrix[x][y - 1] = 1;
                    directions = [];
                }
                break;
            case 'south':
                if (y + 2 < height && matrix[x][y + 2] == 1){
                    matrix[x][y + 1] = 1;
                    directions = [];
                }
                break;
            case 'east':
                if (x + 2 < width && matrix[x + 2][y] == 1){
                    matrix[x + 1][y] = 1;
                    directions = [];
                }
                break;
            case 'west':
                if (x - 2 >= 0 && matrix[x - 2][y] == 1){
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
}

var matrix = createMaze(height, width);

function visualizationMatrix(matrix, height, width){
    const matrixContainer = document.getElementById('matrixContaienr');

    for (let i = 0; i < height; i++){
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        for (let j = 0; j < widt; j++) {
            // Create a cell element
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (matrix[i][j] === 1) {
                cellElement.style.backgroundColor = 'red';
            } else {
                cellElement.style.backgroundColor = 'green';
            }

            // Append the cell to the row
            rowElement.appendChild(cellElement);
        }
        matrixContainer.appendChild(rowElement);
    }
}
visualizationMatrix(matrix);