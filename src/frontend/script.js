document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');
    const colorPicker = document.getElementById('colorPicker');
    const lineWidthInput = document.getElementById('lineWidth');
    const animationsDiv = document.getElementById('animations');

    let drawing = false;

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

        await fetch('https://flip.loca.lt/animations/', {
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

        const response = await fetch('https://flip.loca.lt/animations');
        const animations = await response.json();

        animations.forEach(animation => {
            const div = document.createElement('div');
            div.classList.add('animation');
            div.innerHTML = `<strong>${animation.name}</strong><img src="${animation.content}" width="200" />`;
            animationsDiv.appendChild(div);
        });
    }

    function startDrawing(e) {
        drawing = true;
        draw(e); // Draw immediately to avoid gaps
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath(); // Reset the path to avoid connecting lines
    }

    function draw(e) {
        if (!drawing) return;

        ctx.lineWidth = lineWidthInput.value; // Set line width from input
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value; // Set color from color picker

        // Draw line to the current mouse position
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath(); // Reset the path
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // Move to the current mouse position
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    }
});
