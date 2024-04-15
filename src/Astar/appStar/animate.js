export function animateSearchAndPath(exploredNodes, path, matrix) {
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
            animatePath(path);
        }
    }, 50);
}

function animatePath(path) {
    let index = 0;
    const animateStep = () => {
        flag = 1;
        if (index < path.length) {
            const [x, y] = path[index];
            const blockId = `${x}-${y}`;
            const block = document.getElementById(blockId);
            matrix[x][y] = 11;
            block.style.backgroundColor = 'white';
            index++;
            setTimeout(animateStep, 100);
        }
        else{
            flag = 0;
        }
    };
    animateStep();
}
