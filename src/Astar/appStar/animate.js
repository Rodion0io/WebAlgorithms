export let flag = 0;

export function animateSearchAndPath(exploredNodes, path, matrix){
    let index = 0;
    const intervalId = setInterval(function() {
        if (index < exploredNodes.length) {
            flag = 1;
            const { x, y } = exploredNodes[index];
            const blockId = `${x}-${y}`;
            const block = document.getElementById(blockId);
            matrix[x][y] = 10;  
            block.style.backgroundColor = 'gray';
            index++;
        } else {
            clearInterval(intervalId);
            animatePath(matrix, path);
        }
    }, 5);
}

export function animatePath(matrix, path){
    let index = 0;
    const animateStep = () => {
        if (index < path.length) {
            const [x, y] = path[index];
            const blockId = `${x}-${y}`;
            const block = document.getElementById(blockId);
            matrix[x][y] = 11;
            block.style.backgroundColor = 'white';
            index++;
            setTimeout(animateStep, 10);
        }
        else{
            clearTimeout(animateStep);
            flag = 0;
        }
    };
    animateStep();
}