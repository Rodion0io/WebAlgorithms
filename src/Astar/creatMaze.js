const height = 5;
const width = 5;

function creatMaze(height, width){
    let matrix = [];
    for (i = 0; i < height; i++){
        matrix[i] = [];
        for (j = 0; j < width; j++){
            matrix[i][j] = 0;
        }
    }
    let x = Math.floor(Math.random() * (width / 2)) * 2 + 1;
    let y = Math.floor(Math.random() * (height / 2)) * 2 + 1;
    matrix[x][y] = 1;

    let array = [];
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
        const index = Math.floor(Math.random() * (array.length));
        const cell = array[index];
        x = cell.x;
        y = cell.y;
        matrix[x][y] = 10;
        matrix.splice(index,1);
    }

    let directions = ['north', 'south', 'east', 'west'];
    while (directions.length > 0){
        let directionsIndex = Math.floor(Math.random() * (directions.length));
        switch (directions[directionsIndex]){
            case 'north':
                if (y - 2 >= 0 && matrix[x][y - 2] == 10){
                    matrix[x][y - 1] = 10;
                    directions = [];
                }
                break;
            case 'south':
                if (y + 2 >= 0 && matrix[x][y + 2] == 10){
                    matrix[x][y + 1] = 10;
                    directions = [];
                }
                break;
            case 'east':
                if (x - 2 >= 0 && matrix[x - 2][y] == 10){
                    matrix[x - 1][y] = 10;
                    directions = [];
                }
                break;
            case 'west':
                if (x + 2 >= 0 && matrix[x + 2][y] == 10){
                    matrix[x + 1][y] = 10;
                    directions = [];
                }
                break;
        }
        directions.splice(directionsIndex,1);
    }
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

