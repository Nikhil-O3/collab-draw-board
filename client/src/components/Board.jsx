import { useRef, useEffect, useState } from "react";
import { setupCanvas, redraw } from "../utils/canvahelper.js";

export default function Board() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    
    // central state (IMPORTANT)
    const [elements, setElements] = useState([]);

    const WIDTH = 600;
    const HEIGHT = 400;

    useEffect(() => {
        const canvas = canvasRef.current;

        ctxRef.current = setupCanvas(canvas, WIDTH, HEIGHT);
    }, []);

    // redraw whenever state changes
    useEffect(() => {
        if (!ctxRef.current) return;
        redraw(ctxRef.current, elements);
    }, [elements]);

    function handleClick(e) {
        const rect = canvasRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newCircle = {
            id: crypto.randomUUID(),
            x,
            y,
            radius: 5,
            color: "black",
        };

        // update state (immutable)
        setElements(prev => [...prev, newCircle]);
    }

    return (
        <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            onClick={handleClick}
            style={{
                border: "1px solid black",
                display: "block",
                margin: "20px auto"
            }}
        />
    );
}