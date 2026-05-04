import React, { useState, useRef } from "react";
import "./ChildMode.css";

const ToolPlayer = ({ tool, onBack }) => {
  const [step, setStep] = useState(0);

  // # DRAW TOOL STATE
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current = ctx;
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const endDraw = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "calmigo-drawing.jpeg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  // # BREATHING STEPS
  const breathingSteps = [
    "Breathe in slowly...",
    "Hold...",
    "Breathe out slowly...",
  ];

  // # DIGITAL TOOL SWITCH
  const renderTool = () => {
    switch (tool) {
      case "Draw":
        return (
          <>
            <h2>Draw</h2>

            <canvas
              ref={canvasRef}
              width={700}
              height={400}
              className="draw-canvas"
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
            />

            <div className="color-picker">
              {["#000000", "#E74C3C", "#3498DB", "#2ECC71", "#F1C40F"].map(
                (c) => (
                  <button
                    key={c}
                    className="color-btn"
                    style={{ background: c }}
                    onClick={() => setColor(c)}
                  />
                )
              )}
            </div>

            <div className="tool-actions">
              <button onClick={clearCanvas}>Clear</button>
              <button onClick={saveImage}>Save</button>
            </div>
          </>
        );

      case "Deep breaths":
        return (
          <>
            <h2>Breathing</h2>

            <div className="breathing-circle"></div>

            <p className="tool-instruction">
              {breathingSteps[step % breathingSteps.length]}
            </p>

            <button onClick={() => setStep(step + 1)}>Next</button>
          </>
        );

      case "Read":
        return (
          <>
            <h2>Look Around</h2>
            <p className="tool-instruction">
              Find 3 things you can see
            </p>
            <button onClick={() => setStep(step + 1)}>Next</button>

            {step > 0 && (
              <>
                <p className="tool-instruction">
                  Find 2 things you can hear
                </p>
                <button onClick={() => setStep(step + 1)}>Next</button>
              </>
            )}

            {step > 1 && (
              <>
                <p className="tool-instruction">
                  Find 1 thing you can feel
                </p>
              </>
            )}
          </>
        );

      case "Task":
        return (
          <>
            <h2>Small Task</h2>
            <p className="tool-instruction">
              Let’s do one small job together
            </p>
            <button>Start</button>
          </>
        );

      case "Focus":
        return (
          <>
            <h2>Focus</h2>
            <p className="tool-instruction">
              Look at the dot and stay still
            </p>
            <div className="focus-dot"></div>
          </>
        );

      case "Build":
        return (
          <>
            <h2>Build</h2>
            <p className="tool-instruction">
              Build something with blocks or toys
            </p>
          </>
        );

      case "Choice":
        return (
          <>
            <h2>Choose</h2>
            <div className="choice-grid">
              <button>Draw</button>
              <button>Read</button>
              <button>Rest</button>
            </div>
          </>
        );

      default:
        return (
          <>
            <h2>{tool}</h2>
            <p className="tool-instruction">
              Try this calmly with support
            </p>
          </>
        );
    }
  };

  return (
    <div className="tool-screen">
      {renderTool()}

      {/* # back */}
      <button className="back-btn" onClick={onBack}>
        Back
      </button>
    </div>
  );
};

export default ToolPlayer;