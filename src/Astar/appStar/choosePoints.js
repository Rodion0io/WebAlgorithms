import { checkSuccsessStartPoint, checkSuccsessEndPoint, checkFaildStartPoint, checkFaildEndPoint, deleteBadItems } from "./checkers.js";

// Выбор стартовой координаты
export function chooseStartPoint(matrix) {
    const field = document.querySelector('.field');
    const height = matrix.length;
    const width = matrix[0].length;
    checkSuccsessStartPoint(matrix, height, width);
    deleteBadItems(matrix)
    field.addEventListener('click', eventChoosePoint);
    function eventChoosePoint(event) {
        const clickedBlock = event.target;
        if (clickedBlock.classList.contains('block__item')) {
            const clickedBlockId = clickedBlock.id.split('-');
            const row = parseInt(clickedBlockId[0]);
            const column = parseInt(clickedBlockId[1]);
            if (matrix[row][column] !== 0){
                clickedBlock.style.backgroundColor = 'yellow';
                matrix[row][column] = 2;
                // for (let row of matrix){
                //     console.log(row.join('\t'));
                // }
                field.removeEventListener('click', eventChoosePoint);
            }
            else{
                alert("Сюда нельзя ставить точку");
                clickedBlock.style.backgroundColor = 'red';
                matrix[row][column] = 2;
                checkFaildStartPoint(matrix, height, width)
                field.removeEventListener('click', eventChoosePoint);
            }
        }
    }
}


// Выбор конечной координаты
export function chooseEndPoint(matrix) {
    const field = document.querySelector('.field');
    const height = matrix.length;
    const width = matrix[0].length;
    checkSuccsessEndPoint(matrix, height, width);
    deleteBadItems(matrix)
    field.addEventListener('click', eventChoosePoint);
    function eventChoosePoint(event) {
        const clickedBlock = event.target;
        if (clickedBlock.classList.contains('block__item')) {
            const clickedBlockId = clickedBlock.id.split('-');
            const row = parseInt(clickedBlockId[0]);
            const column = parseInt(clickedBlockId[1]);
            if (matrix[row][column] !== 0){
                clickedBlock.style.backgroundColor = 'green';
                matrix[row][column] = 3;
                // for (let row of matrix){
                //     console.log(row.join('\t'));
                // }
                field.removeEventListener('click', eventChoosePoint);
            }
            else{
                alert("Сюда нельзя ставить точку");
                clickedBlock.style.backgroundColor = 'red';
                matrix[row][column] = 3;
                checkFaildEndPoint(matrix, height, width);
                field.removeEventListener('click', eventChoosePoint);
            }
        }
    }
}