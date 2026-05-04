import React, { useRef, useState } from "react";
import "./ChildMode.css";

const ActivityView = ({ activity, zone, onClose }) => {
  const originalLabel = activity?.label || activity;
  const [overrideLabel, setOverrideLabel] = useState(null);
  const label = overrideLabel || originalLabel;

  const [step, setStep] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [color, setColor] = useState("#58D68D");
  const [drawing, setDrawing] = useState(false);
  const [showNeeds, setShowNeeds] = useState(false);

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [poppedBubbles, setPoppedBubbles] = useState([]);
  const [selectedNeed, setSelectedNeed] = useState(null);

  const [selectedFeeling, setSelectedFeeling] = useState(null);
  const [mazePosition, setMazePosition] = useState(0);
  const [blueEnergy, setBlueEnergy] = useState(0);
  const [starPosition, setStarPosition] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);

  const [gardenColors, setGardenColors] = useState({
    sun: "white",
    tree: "white",
    flowerOne: "white",
    flowerTwo: "white",
    grass: "white"
  });

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const themeClass =
    zone === "Red"
      ? "red"
      : zone === "Yellow"
      ? "yellow"
      : zone === "Blue"
      ? "blue"
      : "green";

  const currentCount = Math.max(10 - step, 0);

  const matchItems = ["🌟", "🌈", "🍃", "🌟", "🍃", "🌈"];


  const riddles = [
    {
      question: "I have keys but no locks. I have space but no rooms. What am I?",
      answer: "A keyboard"
    },
    {
      question: "What has hands but cannot clap?",
      answer: "A clock"
    },
    {
      question: "What gets wetter the more it dries?",
      answer: "A towel"
    },
    {
      question: "What has a face and two hands but no arms or legs?",
      answer: "A clock"
    },
    {
      question: "What can you catch but not throw?",
      answer: "A cold"
    }
  ];

  const currentRiddle = riddles[step % riddles.length];

  const startDraw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current = ctx;
    setDrawing(true);
  };

  const draw = (e) => {
    if (!drawing || !ctxRef.current) return;

    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const endDraw = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "calmigo-drawing.jpeg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  const handleBubbleClick = (index) => {
    if (poppedBubbles.includes(index)) return;
    setPoppedBubbles([...poppedBubbles, index]);
  };

  const resetBubbles = () => {
    setPoppedBubbles([]);
  };

  const handleMatchClick = (index, items = matchItems) => {
    if (flippedCards.includes(index) || matchedCards.includes(index)) return;
    if (flippedCards.length === 2) return;

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      const [first, second] = nextFlipped;

      if (items[first] === items[second]) {
        setMatchedCards([...matchedCards, first, second]);
        setTimeout(() => setFlippedCards([]), 400);
      } else {
        setTimeout(() => setFlippedCards([]), 700);
      }
    }
  };

  const resetMatchGame = () => {
    setFlippedCards([]);
    setMatchedCards([]);
  };

  const resetGarden = () => {
    setGardenColors({
      sun: "white",
      tree: "white",
      flowerOne: "white",
      flowerTwo: "white",
      grass: "white"
    });
  };

  const handleBack = () => {
    if (overrideLabel) {
      setOverrideLabel(null);
      setStep(0);
      return;
    }

    onClose();
  };

  const openHelpCard = () => {
    setOverrideLabel("Help Card");
    setStep(0);
  };

  const renderDrawTool = (title, subtitle) => (
    <>
      <h2>{title}</h2>
      <p className={`${themeClass}-tool-subtitle`}>{subtitle}</p>

      <canvas
        ref={canvasRef}
        width={700}
        height={360}
        className={`${themeClass}-draw-canvas`}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
      />

      <div className="color-picker">
        {["#58D68D", "#5DADE2", "#F4D03F", "#E74C3C", "#000000"].map((c) => (
          <button
            key={c}
            className="color-btn"
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
            aria-label="Choose color"
          />
        ))}
      </div>

      <div className="tool-actions">
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveImage}>Save</button>
      </div>
    </>
  );

  const renderActivity = () => {
    switch (label) {
      case "Sun Tap":
        return (
          <>
            <h2>Sun Tap</h2>
            <p className="blue-tool-subtitle">Tap the sun.</p>

            <button
              className="blue-sun-game"
              onClick={() => setTapCount(tapCount + 1)}
              aria-label="Tap sun"
            >
              ☀️
            </button>

            <p className="tool-instruction">
              {tapCount >= 10 ? "Ready body!" : `${10 - tapCount} taps to go.`}
            </p>
          </>
        );

      case "Energy Bubbles":
        return (
          <>
            <h2>Energy Bubbles</h2>
            <p className="blue-tool-subtitle">Pop the bubbles.</p>

            <div className="blue-bubble-area">
              {Array.from({ length: 12 }).map((_, index) => (
                <button
                  key={index}
                  className={`blue-wake-bubble ${
                    poppedBubbles.includes(index) ? "popped" : ""
                  }`}
                  onClick={() => handleBubbleClick(index)}
                  aria-label="Pop bubble"
                />
              ))}
            </div>

            {poppedBubbles.length >= 12 && (
              <p className="tool-instruction">Nice. Your body is waking up.</p>
            )}

            <button className="blue-next-btn" onClick={resetBubbles}>
              Reset
            </button>
          </>
        );

      case "Speed Tap":
        return (
          <>
            <h2>Speed Tap</h2>
            <p className="blue-tool-subtitle">Tap fast to wake up your energy.</p>

            <button
              className="blue-sun-game"
              onClick={() => setTapCount(tapCount + 1)}
              aria-label="Speed tap"
            >
              ⚡
            </button>

            <p className="tool-instruction">
              {tapCount >= 20 ? "Brilliant! Energy is up!" : `Taps: ${tapCount}/20`}
            </p>
          </>
        );

      case "Catch the Star":
        return (
          <>
            <h2>Catch the Star</h2>
            <p className="blue-tool-subtitle">Tap the star when it moves.</p>

            <div className="blue-star-catch-grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <button
                  key={index}
                  className={`blue-star-cell ${
                    index === starPosition ? "active" : ""
                  }`}
                  onClick={() => {
                    if (index === starPosition) {
                      setTapCount(tapCount + 1);
                      setStarPosition(Math.floor(Math.random() * 9));
                    }
                  }}
                  aria-label="Catch star"
                >
                  {index === starPosition ? "🌟" : ""}
                </button>
              ))}
            </div>

            <p className="tool-instruction">
              {tapCount >= 10 ? "You caught them all!" : `Stars caught: ${tapCount}/10`}
            </p>
          </>
        );

      case "Color Smash":
        return (
          <>
            <h2>Color Smash</h2>
            <p className="blue-tool-subtitle">Tap the bright colours.</p>

            <div className="blue-color-smash-grid">
              {["#5DADE2", "#F4D03F", "#58D68D", "#E74C3C", "#BB8FCE", "#FF9F43"].map(
                (c) => (
                  <button
                    key={c}
                    className="blue-color-smash-tile"
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setColor(c);
                      setTapCount(tapCount + 1);
                    }}
                    aria-label="Smash color"
                  />
                )
              )}
            </div>

            <p className="tool-instruction">
              {tapCount >= 12
                ? "Great colour energy!"
                : `Colours smashed: ${tapCount}/12`}
            </p>
          </>
        );

      

      case "Power Meter":
        return (
          <>
            <h2>Power Meter</h2>
            <p className="blue-tool-subtitle">Fill the meter.</p>

            <div className="blue-energy-meter">
              <div style={{ height: `${Math.min(blueEnergy, 100)}%` }} />
            </div>

            <button
              className="blue-next-btn"
              onClick={() => setBlueEnergy(Math.min(blueEnergy + 20, 100))}
            >
              Add Energy
            </button>

            {blueEnergy >= 100 && <p className="tool-instruction">Ready to go.</p>}
          </>
        );

      case "Calm Drawing":
        return renderDrawTool("Calm Drawing", "Draw slowly.");

      case "Soft Focus":
        return (
          <>
            <h2>Soft Focus</h2>
            <p className="green-tool-subtitle">Watch the circle.</p>

            <div className="green-focus-ring">
              <div className="green-focus-dot" />
            </div>

            <p className="tool-instruction">Nice and steady.</p>
          </>
        );

      case "Gentle Match":
        return (
          <>
            <h2>Gentle Match</h2>
            <p className="green-tool-subtitle">Match slowly.</p>

            <div className="green-match-grid">
              {matchItems.map((item, index) => {
                const isShowing =
                  flippedCards.includes(index) || matchedCards.includes(index);

                return (
                  <button
                    key={index}
                    className={`green-match-card ${
                      matchedCards.includes(index) ? "matched" : ""
                    }`}
                    onClick={() => handleMatchClick(index)}
                    aria-label="Match card"
                  >
                    {isShowing ? item : "?"}
                  </button>
                );
              })}
            </div>

            {matchedCards.length === matchItems.length && (
              <p className="tool-instruction">You matched them all.</p>
            )}

            <button className="green-next-btn" onClick={resetMatchGame}>
              Reset
            </button>
          </>
        );

      case "Color Garden":
        return (
          <>
            <h2>Color Garden</h2>
            <p className="green-tool-subtitle">Tap and color.</p>

            <div className="garden-coloring-page">
              <button
                className="garden-part garden-sun"
                style={{ backgroundColor: gardenColors.sun }}
                onClick={() => setGardenColors({ ...gardenColors, sun: color })}
                aria-label="Color sun"
              >
                ☀️
              </button>

              <button
                className="garden-part garden-tree"
                style={{ backgroundColor: gardenColors.tree }}
                onClick={() => setGardenColors({ ...gardenColors, tree: color })}
                aria-label="Color tree"
              >
                🌳
              </button>

              <button
                className="garden-part garden-flower-one"
                style={{ backgroundColor: gardenColors.flowerOne }}
                onClick={() =>
                  setGardenColors({ ...gardenColors, flowerOne: color })
                }
                aria-label="Color flower"
              >
                🌸
              </button>

              <button
                className="garden-part garden-flower-two"
                style={{ backgroundColor: gardenColors.flowerTwo }}
                onClick={() =>
                  setGardenColors({ ...gardenColors, flowerTwo: color })
                }
                aria-label="Color flower"
              >
                🌼
              </button>

              <button
                className="garden-part garden-grass"
                style={{ backgroundColor: gardenColors.grass }}
                onClick={() => setGardenColors({ ...gardenColors, grass: color })}
                aria-label="Color grass"
              >
                🌱
              </button>
            </div>

            <div className="garden-palette">
              {["#58D68D", "#5DADE2", "#F4D03F", "#F67280", "#BB8FCE", "#A67C52"].map(
                (c) => (
                  <button
                    key={c}
                    className={`garden-color-btn ${color === c ? "selected" : ""}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)}
                    aria-label="Choose garden color"
                  />
                )
              )}
            </div>

            <button className="green-next-btn" onClick={resetGarden}>
              Reset Garden
            </button>

            <p className="tool-instruction">No wrong colors.</p>
          </>
        );

      case "Slow Bubbles":
        return (
          <>
            <h2>Slow Bubbles</h2>
            <p className="green-tool-subtitle">Pop slowly.</p>

            <div className="green-bubble-area">
              {Array.from({ length: 10 }).map((_, index) => (
                <button
                  key={index}
                  className={`green-bubble ${
                    poppedBubbles.includes(index) ? "popped" : ""
                  }`}
                  onClick={() => handleBubbleClick(index)}
                  aria-label="Pop bubble"
                />
              ))}
            </div>

            {poppedBubbles.length === 10 && (
              <p className="tool-instruction">All popped. Still calm.</p>
            )}

            <button className="green-next-btn" onClick={resetBubbles}>
              Reset
            </button>
          </>
        );

      case "Riddle Cards":
      case "Kind Cards":
        return (
          <>
            <h2>Riddle Cards</h2>
            <p className="green-tool-subtitle">Think and guess.</p>

            <div className="riddle-card">
              <div className="riddle-question-mark">?</div>

              <p className="riddle-question">{currentRiddle.question}</p>

              {showRiddleAnswer && (
                <p className="riddle-answer">{currentRiddle.answer}</p>
              )}

              {!showRiddleAnswer ? (
                <button
                  className="green-next-btn"
                  onClick={() => setShowRiddleAnswer(true)}
                >
                  Show Answer
                </button>
              ) : (
                <button
                  className="green-next-btn"
                  onClick={() => {
                    setShowRiddleAnswer(false);
                    setStep(step + 1);
                  }}
                >
                  Next
                </button>
              )}
            </div>
          </>
        );

      case "Find Your Focus":
  return (
    <>
      <h2>Find Your Focus</h2>
      <p className="yellow-tool-subtitle">Watch the circle slowly.</p>

      <div className="yellow-focus-ring">
        <div className="yellow-focus-dot" />
      </div>

      <p className="tool-instruction">Look. Breathe. Stay here.</p>
    </>
  );

case "Show Your Feelings": {
  const feelings = [
    { emoji: "😊", label: "Happy", zone: "Green" },
    { emoji: "😌", label: "Calm", zone: "Green" },
    { emoji: "😄", label: "Proud", zone: "Green" },
    { emoji: "😢", label: "Sad", zone: "Blue" },
    { emoji: "😴", label: "Tired", zone: "Blue" },
    { emoji: "😞", label: "Lonely", zone: "Blue" },
    { emoji: "😟", label: "Worried", zone: "Yellow" },
    { emoji: "😣", label: "Frustrated", zone: "Yellow" },
    { emoji: "😬", label: "Nervous", zone: "Yellow" },
    { emoji: "😡", label: "Angry", zone: "Red" },
    { emoji: "😭", label: "Very Upset", zone: "Red" },
    { emoji: "😱", label: "Scared", zone: "Red" },
  ];

  const needsMap = {
    Happy: ["🎉 celebrate", "🗣 share", "👏 high five"],
    Calm: ["📖 story", "🎨 draw", "🙂 keep going"],
    Proud: ["👏 praise", "📸 show someone", "🎉 celebrate"],
    Sad: ["🤗 a hug", "🧸 comfort toy", "🗣 talk"],
    Tired: ["💤 rest", "🛏 lie down", "🤗 cuddle"],
    Lonely: ["👋 someone with me", "🤗 a hug", "🗣 talk"],
    Worried: ["🗣 reassurance", "✋ hold hands", "🧘 breathing"],
    Frustrated: ["💨 deep breaths", "🧍 space", "🧩 help"],
    Nervous: ["🗣 kind words", "✋ hold hands", "📋 a plan"],
    Angry: ["🧍 space", "💨 deep breaths", "🥊 squeeze something"],
    "Very Upset": ["🤗 a hug", "🧍 space", "🎧 calm music"],
    Scared: ["🗣 reassurance", "✋ hold hands", "🛡 feel safe"],
  };

  return (
    <>
      <h2>Show Your Feelings</h2>
      <p className="yellow-tool-subtitle">
        Slide sideways, tap a feeling, then choose what you need.
      </p>

      <div className="feeling-slider">
        {feelings.map((feeling) => (
          <button
            key={feeling.label}
            className={`slider-feeling-card zone-${feeling.zone.toLowerCase()} ${
              selectedFeeling?.label === feeling.label ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedFeeling(feeling);
              setSelectedNeed(null);
              setShowNeeds(true);
            }}
          >
            <span className="slider-emoji">{feeling.emoji}</span>
            <span className="slider-label">{feeling.label}</span>
          </button>
        ))}
      </div>

      {selectedFeeling && (
        <div className="communication-card">
          <h3>
            I am feeling{" "}
            <span className="communication-emoji">
              {selectedFeeling.emoji}
            </span>{" "}
            {selectedFeeling.label}
          </h3>

          <h3>I need...</h3>

          <div className="needs-slider">
            {(needsMap[selectedFeeling.label] || ["🤗 support"]).map((need) => (
              <button
                key={need}
                className={`need-card ${selectedNeed === need ? "selected" : ""}`}
                onClick={() => setSelectedNeed(need)}
              >
                {need}
              </button>
            ))}
          </div>

          {selectedNeed && (
            <div className="final-output">
              I am feeling {selectedFeeling.emoji} {selectedFeeling.label}. I need{" "}
              {selectedNeed}.
            </div>
          )}
        </div>
      )}
    </>
  );
}

case "Slow Maze": {
  const mazePath = [0, 1, 2, 5, 8];
  const currentCell = mazePath[mazePosition];
  const finished = mazePosition === mazePath.length - 1;

  const moveMaze = () => {
    if (navigator.vibrate) navigator.vibrate(50);
    setMazePosition(Math.min(mazePosition + 1, mazePath.length - 1));
  };

  return (
    <>
      <h2>Slow Maze</h2>
      <p className="yellow-tool-subtitle">Help Turtle find the star.</p>

      <div className="adventure-maze">
        {Array.from({ length: 9 }).map((_, index) => {
          const isCurrent = index === currentCell;
          const isDone = mazePath.indexOf(index) < mazePosition;
          const isGoal = index === 8;
          const isPath = mazePath.includes(index);

          return (
            <button
              key={index}
              className={`adventure-cell
                ${isPath ? "adventure-path" : ""}
                ${isCurrent ? "adventure-current" : ""}
                ${isDone ? "adventure-done" : ""}
                ${isGoal ? "adventure-goal" : ""}
              `}
              onClick={isCurrent ? moveMaze : undefined}
            >
              {isCurrent ? "🐢" : isDone ? "🌼" : isGoal ? "⭐" : ["🌿", "🍄", "🪨"][index % 3]}
            </button>
          );
        })}
      </div>

      <button className="yellow-next-btn adventure-move-btn" onClick={moveMaze}>
        {finished ? "You did it!" : "Move Turtle"}
      </button>

      <p className="tool-instruction">
        {finished ? "Turtle found the star. Slow and steady!" : "Tap the glowing square."}
      </p>
    </>
  );
}

case "Sensory Screen":
  return (
    <>
      <h2>Sensory Screen</h2>
      <p className="yellow-tool-subtitle">Watch the food bounce and float.</p>

      <div className="sensory-watch-box sensory-food-party">
        {[
          "🍓", "🍌", "🍊", "🍎", "🍉", "🍇",
          "🍒", "🥝", "🍍", "🥕", "🌽", "🫐"
        ].map((food, index) => (
          <span
            key={index}
            className={`sensory-food food-${index + 1}`}
          >
            {food}
          </span>
        ))}
      </div>

      <p className="tool-instruction">Just watch. No tapping needed.</p>
    </>
  );

case "Bubble Pop":
  return (
    <>
      <h2>Bubble Pop</h2>
      <p className="yellow-tool-subtitle">Pop slowly.</p>

      <div className="yellow-bubble-area">
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index}
            className={`yellow-slow-bubble ${
              poppedBubbles.includes(index) ? "popped" : ""
            }`}
            onClick={() => handleBubbleClick(index)}
          />
        ))}
      </div>

      {poppedBubbles.length === 10 && (
        <p className="tool-instruction">All done. Nice and calm.</p>
      )}

      <button className="yellow-next-btn" onClick={resetBubbles}>
        Reset
      </button>
    </>
  );

case "Tap & Breathe":
  return (
    <>
      <h2>Tap & Breathe</h2>
      <p className="yellow-tool-subtitle">Tap slowly with your breath.</p>

      <button
      className={`yellow-tap-button breathing-tap ${
        tapCount > 0 ? "is-breathing" : ""
      }`}
      onClick={() => setTapCount(tapCount + 1)}
    >
      <div className="tap-inner">
        <span className="main-star">⭐</span>
        <span className="spark spark-1">✨</span>
        <span className="spark spark-2">✨</span>
      </div>
    </button>
      <p className="tool-instruction">
        {tapCount >= 8 ? "Great slow tapping." : `${8 - tapCount} slow taps.`}
      </p>
    </>
  );

     case "Emergency Focus":
      return (
        <>
          <h2>Focus</h2>
          <p className="red-tool-subtitle">Look at the circle. You are safe.</p>

          <div className="emergency-focus-circle">
            <span>{step % 2 === 0 ? "In" : "Out"}</span>
          </div>

          <p className="tool-instruction">
            {
              [
                "Breathe in slowly.",
                "Hold gently.",
                "Breathe out slowly.",
                "You are safe."
              ][step % 4]
            }
          </p>

          <button
            className="red-next-btn"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        </>
      );

      case "Safe Count":
        return (
          <>
            <h2>Safe Count</h2>
            <p className="red-tool-subtitle">Count down.</p>

            <div className="red-count-circle">
              <span>{currentCount === 0 ? "Done" : currentCount}</span>
            </div>

            {currentCount > 0 && (
              <button className="red-next-btn" onClick={() => setStep(step + 1)}>
                Next
              </button>
            )}
          </>
        );

      case "Safe Place":
        return (
          <>
            <h2>Safe Place</h2>
            <p className="red-tool-subtitle">Picture safe.</p>

            <div className="red-visual-card">
              <span>🌈</span>
            </div>

            <p className="tool-instruction">
              {["Look at the rainbow.", "Think of somewhere safe.", "Take one slow breath.", "You are safe."][step % 4]}
            </p>

            <button className="red-next-btn" onClick={() => setStep(step + 1)}>
              Next
            </button>
          </>
        );

      case "Big Tap":
        return (
          <>
            <h2>Big Tap</h2>
            <p className="red-tool-subtitle">Tap slowly.</p>

            <button
              className="red-tap-button"
              onClick={() => setTapCount(tapCount + 1)}
            >
              {tapCount}
            </button>

            <p className="tool-instruction">
              {tapCount >= 10 ? "Good job." : "Slow taps."}
            </p>
          </>
        );

      case "Scribble":
        return renderDrawTool("Scribble", "Scribble it out.");

      case "Help Card":
        return (
          <>
            <h2>Help Card</h2>
            <p className="red-tool-subtitle">Show a grown up.</p>

            <div className="help-card">
              {
                [
                  "I need help.",
                  "I need space.",
                  "Calm voice please.",
                  "Big feelings."
                ][step % 4]
              }
            </div>

            <button className="red-next-btn" onClick={() => setStep(step + 1)}>
              Next
            </button>
          </>
        );

      default:
        return (
          <>
            <h2>{label}</h2>
            <p className="tool-instruction">Try this slowly with support.</p>
          </>
        );
    }
  };

  return (
    <div className={`activity-view ${themeClass}`}>
      <button className={`${themeClass}-back-arrow`} onClick={handleBack}>
        ←
      </button>

      <button className={`${themeClass}-done-btn`} onClick={onClose}>
        Done
      </button>

      {label !== "Help Card" && (
        <button className="help-btn" onClick={openHelpCard}>
          Help
        </button>
      )}

      <div className="activity-content">{renderActivity()}</div>
    </div>
  );
};

export default ActivityView;