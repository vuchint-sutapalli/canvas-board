"use client";

import { useEffect, useState, useRef } from "react";

export default function useDraw(onDraw) {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);

  const prevPoint = useRef(null);

  const onMouseDown = () => setMouseDown(true);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // ctx.clearCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleMouseMove = (e) => {
    const currentPoint = computerelativePosition(e);

    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx || !currentPoint) return;

    if (mouseDown) {
      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
    }

    prevPoint.current = currentPoint;
  };

  const computerelativePosition = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    const x = e.clientX - canvasRect.left;

    const y = e.clientY - canvasRect.top;
    return {
      currX: x,
      currY: y,
    };
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  useEffect(() => {
    canvasRef.current?.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    let canvasRefHandle = canvasRef.current;

    return () => {
      canvasRefHandle?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onDraw]);

  return { canvasRef, onMouseDown, clearCanvas };
}
