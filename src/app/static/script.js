const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let painting = false;
let brushColor = 'black'; // Color por defecto
let lineWidth = 2; // Ancho por defecto

document.addEventListener("DOMContentLoaded", function() {
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const lineWidthInput = document.getElementById('lineWidth');
    const animationsDiv = document.getElementById('animations');

    // Event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    // Clear canvas functionality
    clearButton.addEventListener('click', clearCanvas);

    // Save animation functionality
    saveButton.addEventListener('click', async function() {
        const name = document.getElementById('name').value;
        const content = canvas.toDataURL(); // Convert canvas to image data URL

        await fetch('/animations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, content })
        });

        loadAnimations();
    });

    async function loadAnimations() {
        animationsDiv.innerHTML = '';

        const response = await fetch('/animations/');
        const animations = await response.json();

        animations.forEach(animation => {
            const div = document.createElement('div');
            div.classList.add('animation');
            div.innerHTML = `<strong>${animation.name}</strong><img src="${animation.content}" width="200" />`;
            animationsDiv.appendChild(div);
        });
    }

    function startDrawing(e) {
        painting = true;
        draw(e); // Draw immediately to avoid gaps
    }

    function stopDrawing() {
        painting = false;
        ctx.beginPath(); // Reset the path to avoid connecting lines
    }

    function draw(e) {
        if (!painting) return;

        ctx.lineWidth = lineWidth; // Set line width from input
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor; // Set color from brushColor variable

        // Draw line to the current mouse position
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath(); // Reset the path
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Move to the current mouse position
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    }

    // Selector de tamaño de línea
    lineWidthInput.addEventListener('input', (e) => {
        lineWidth = e.target.value; // Actualiza el ancho del trazo
    });

    // Seleccionar color de la lista de colores
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            // Remover selección previa
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            // Añadir selección actual
            e.target.classList.add('selected');
            // Cambiar color del pincel
            brushColor = e.target.getAttribute('data-color'); // Actualiza brushColor
        });
    });
});
