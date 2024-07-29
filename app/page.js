"use client";

import useDraw from "@/hooks/useDraw";
import { HexColorPicker } from "react-colorful";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState("#000");

  const { canvasRef, onMouseDown, clearCanvas } = useDraw(drawonCanvas);

  function drawonCanvas({ prevPoint, currentPoint, ctx }) {
    const { currX, currY } = currentPoint;
    console.log(currX, currY);

    const lineWidth = 5;

    let startPoint = prevPoint ? prevPoint : currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;

    ctx.strokeStyle = color;

    ctx.moveTo(startPoint.currX, startPoint.currY);

    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);

    ctx.fill();
  }
  return (
    <main className="flex min-h-screen w-full  items-center justify-between p-24">
      <div className="flex flex-col gap-10 pr-10">
        <HexColorPicker color={color} onChange={setColor} />;
        <button
          type="button"
          className="p-2  rounded-md border border-black"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        width={600}
        height={600}
        className="border border-black rounded-md"
      />
    </main>
  );
}
