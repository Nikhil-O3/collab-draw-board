// setup canvas context
export function setupCanvas(canvas, width, height) {//used once on first render to setup ctx.current
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    return ctx;
}

// draw a single circle
export function drawCircle(ctx, { x, y, radius, color }) {//destrucuter each circle's parameter // simple drawing function
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 1.5);
    ctx.fillStyle = color;
    ctx.fill();
}

// redraw everything (important for React state updates)
export function redraw(ctx, elements) {//runs on every change of element
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let el of elements) {
        drawCircle(ctx, el);
    }
}