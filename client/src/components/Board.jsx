import { useRef, useEffect, useState } from "react";
import { setupCanvas, redraw } from "../utils/canvahelper.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Board() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [elements, setElements] = useState([]);//array of all drawn object 

    const WIDTH = 600;
    const HEIGHT = 400;

    useEffect(() => {
        const canvas = canvasRef.current;
        ctxRef.current = setupCanvas(canvas, WIDTH, HEIGHT);
    }, []);

    // 🔁 initial sync from server
    useEffect(() => {
        socket.on("init", (serverElements) => {
            setElements(serverElements);
        });

        socket.on("update-elements", (serverElements) => {
            setElements(serverElements);
            console.log(serverElements)
        });

        return () => {
            socket.off("init");
            socket.off("update-elements");
        };
    }, []);

    // redraw
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

        // ❗ DO NOT update local state directly
        // send to server instead
        socket.emit("add-element", newCircle);
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