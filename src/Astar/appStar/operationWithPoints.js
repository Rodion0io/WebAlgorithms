export function findStart(matrix) {
    const height = matrix.length;
    const width = matrix[0].length;
    for (let i = 0; i < height; i++){
        for (let j = 0; j < width; j++){
            if (matrix[i][j] == 2) {
                return [i, j];
            }
        }
    }
    return null;
}

export function findEnd(matrix) {
    const height = matrix.length;
    const width = matrix[0].length;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (matrix[i][j] == 3) {
                return [i, j];
            }
        }
    }
    return null;
}