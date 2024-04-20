let heightField;
let widthField;
let matrix;

function updateDimensions() {
    if (window.innerWidth < 576){
        heightField = 410;
        widthField = 410;
    } 
    else {
        heightField = 552;
        widthField = 552;
    }
}


updateDimensions();

window.addEventListener('resize', () => {
    updateDimensions();
});

export {heightField, widthField, matrix};