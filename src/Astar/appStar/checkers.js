export function checkSuccsessStartPoint(matrix, height, width) {
    let randomValue = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (matrix[i][j] == 2) {
                matrix[i][j] = 0;
                let block = document.getElementById(`${i}-${j}`);
                block.style.backgroundColor = 'blue';
            }
        }
    }
}

export function checkSuccsessEndPoint(matrix, height, width) {
    let randomValue = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (matrix[i][j] == 3) {
                matrix[i][j] = 0;
                let block = document.getElementById(`${i}-${j}`);
                block.style.backgroundColor = 'blue';
            }
        }
    }
}

export function checkFaildStartPoint(matrix, height, width) {
    let randomValue = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (matrix[i][j] == 2) {
                matrix[i][j] = 1;
                let block = document.getElementById(`${i}-${j}`);
                block.style.backgroundColor = 'red';
            }
        }
    }
}

export function checkFaildEndPoint(matrix, height, width) {
    let randomValue = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (matrix[i][j] == 3) {
                matrix[i][j] = 1;
                let block = document.getElementById(`${i}-${j}`);
                block.style.backgroundColor = 'red';
            }
        }
    }
}

export function deleteBadItems(matrix){
    const length = matrix.length;
    const width = matrix[0].length; 
    for (let i = 0; i < length; i++){ 
        for (let j = 0; j < width; j++){ 
            if (matrix[i][j] == 10 || matrix[i][j] == 11){
                const blockId = `${i}-${j}`;
                const block = document.getElementById(blockId);
                matrix[i][j] = 0;
                block.style.backgroundColor = 'blue';
            }
        }
    }
}