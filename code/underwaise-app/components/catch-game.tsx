"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  color: string;
  value: number;
  rotation: number;
  logoType: "pax" | "baselhack" | "customer1" | "customer2" | "customer3" | "customer4" | "customer5" | "customer6" | "customer7";
}

const GAME_DURATION = 30; // 30 seconds
const SPAWN_INTERVAL = 800; // milliseconds
const ITEM_SIZE = 60;

const funFacts = [
  "You're covered! CHF 100k secured!",
  "Nice catch! That's worth CHF 50k!",
  "Boom! CHF 200k protection unlocked!",
  "You're on fire! CHF 150k saved!",
  "Legendary! CHF 300k coverage!",
  "Pro move! CHF 75k protected!",
  "Insured AF! CHF 125k caught!",
  "Beast mode! CHF 250k secured!",
];

const missFacts = [
  "Oops! You just missed CHF 50k!",
  "That was worth CHF 100k!",
  "There goes CHF 75k...",
  "Yikes! CHF 200k slipped away!",
];

export function CatchGame({ onClose }: { onClose: () => void }) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const itemIdCounter = useRef(0);

  // Spawn falling items with increasing difficulty
  useEffect(() => {
    if (gameOver || timeLeft <= 0) return;

    // Calculate difficulty multiplier based on time elapsed
    const timeElapsed = GAME_DURATION - timeLeft;
    const difficultyMultiplier = 1 + (timeElapsed / GAME_DURATION) * 1.5; // Speed increases up to 2.5x
    const spawnRate = Math.max(400, SPAWN_INTERVAL - (timeElapsed * 15)); // Spawn faster over time

    const spawnInterval = setInterval(() => {
      const colors = ["#8ccd0f", "#1a5ab8", "#7cb50d", "#1548a0"];
      const logoTypes: Array<"pax" | "baselhack" | "customer1" | "customer2" | "customer3" | "customer4" | "customer5" | "customer6" | "customer7"> =
        ["pax", "baselhack", "customer1", "customer2", "customer3", "customer4", "customer5", "customer6", "customer7"];
      const selectedLogoType = logoTypes[Math.floor(Math.random() * logoTypes.length)];

      let itemColor;
      if (selectedLogoType === "baselhack") {
        itemColor = "#FFFFFF"; // White logo on black background
      } else {
        itemColor = colors[Math.floor(Math.random() * colors.length)];
      }

      const newItem: FallingItem = {
        id: itemIdCounter.current++,
        x: Math.random() * (window.innerWidth - ITEM_SIZE),
        y: -ITEM_SIZE,
        speed: (2 + Math.random() * 2) * difficultyMultiplier,
        color: itemColor,
        value: Math.floor(Math.random() * 20) + 10,
        rotation: Math.random() * 360,
        logoType: selectedLogoType,
      };
      setItems((prev) => [...prev, newItem]);
    }, spawnRate);

    return () => clearInterval(spawnInterval);
  }, [gameOver, timeLeft]);

  // Move items down
  useEffect(() => {
    if (gameOver || timeLeft <= 0) return;

    const moveInterval = setInterval(() => {
      setItems((prev) => {
        const updated = prev.map((item) => ({
          ...item,
          y: item.y + item.speed,
        }));

        // Remove items that went off screen and reset combo
        const filtered = updated.filter((item) => {
          if (item.y > window.innerHeight) {
            // Reset combo on miss
            setCombo(0);
            // Show miss message occasionally
            if (Math.random() > 0.7) {
              setMessage(missFacts[Math.floor(Math.random() * missFacts.length)]);
              setTimeout(() => setMessage(""), 1500);
            }
            return false;
          }
          return true;
        });

        return filtered;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(moveInterval);
  }, [gameOver, timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      triggerEndConfetti();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const triggerEndConfetti = () => {
    const paxTextShape = confetti.shapeFromPath({
      path: 'M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z',
    });

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000, scalar: 4 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 30;
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
        shapes: [paxTextShape],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
        shapes: [paxTextShape],
      });
    }, 250);
  };

  const handleCatch = useCallback((item: FallingItem) => {
    const newCombo = combo + 1;
    setCombo(newCombo);
    if (newCombo > maxCombo) {
      setMaxCombo(newCombo);
    }

    // Bonus points for combos
    const comboMultiplier = Math.min(1 + (newCombo * 0.1), 3); // Up to 3x multiplier
    const points = Math.floor(item.value * comboMultiplier);

    setScore((prev) => prev + points);
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    // Show combo message if combo is high
    if (newCombo >= 5) {
      setMessage(`${newCombo}x COMBO! +${points} points!`);
    } else {
      setMessage(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }
    setTimeout(() => setMessage(""), 1500);

    // Mini confetti on catch with PAX shapes
    const paxTextShape = confetti.shapeFromPath({
      path: 'M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z',
    });

    // Calculate origin position
    const originX = (item.x + ITEM_SIZE / 2) / window.innerWidth;
    const originY = (item.y + ITEM_SIZE / 2) / window.innerHeight;

    // Explosion with regular particles (more visible)
    confetti({
      particleCount: 20,
      spread: 70,
      startVelocity: 30,
      decay: 0.9,
      origin: { x: originX, y: originY },
      colors: ["#8ccd0f", "#1a5ab8", "#7cb50d", "#1548a0"],
      shapes: ["circle", "square"],
      scalar: 0.8,
      gravity: 1,
      ticks: 100,
      zIndex: 1000,
    });

    // PAX logo particles (subtle overlay)
    confetti({
      particleCount: 8 + Math.floor(newCombo / 2),
      spread: 80,
      startVelocity: 25,
      decay: 0.88,
      origin: { x: originX, y: originY },
      colors: ["#8ccd0f", "#1a5ab8", "#7cb50d"],
      shapes: [paxTextShape],
      scalar: 4.5, // Much larger for visibility
      gravity: 1.2,
      drift: 0.2,
      ticks: 150,
      zIndex: 1000,
    });
  }, [combo, maxCombo]);

  // PAX Logo SVG Component
  const PaxLogo = ({ color }: { color: string }) => (
    <svg viewBox="0 0 500 150" className="w-full h-full p-2 pointer-events-none">
      <path
        d="M313.288 144.806l44.794-58.06-44.365-57.495h43.368l25.82 34.954 26.11-34.954h38.802L403.309 86.46l45.79 58.347h-44.936l-25.391-33.952-25.968 33.952h-39.516zm-43.082-35.092V92.31c-4.992.71-9.416 1.425-22.111 3.566-13.41 2.283-17.835 7.418-17.835 13.84 0 7.131 3.995 12.266 14.269 12.266 7.704 0 18.402-5.278 25.677-12.267m4.99 35.092l-2.712-11.842c-12.266 9.988-23.965 14.698-39.368 14.698-22.974 0-39.092-13.124-39.092-34.382 0-21.543 14.55-33.528 43.94-38.09 16.69-2.57 25.11-3.853 31.383-4.563V66.77c0-10.412-5.277-15.122-17.114-15.122-13.13 0-17.835 5.282-18.407 14.126h-34.81c2.569-29.529 24.966-39.373 55.782-39.373 37.518 0 50.786 16.118 50.786 47.787v39.092c0 12.839.286 18.545 3.137 31.526h-33.524zM125.69 73.478c17.978 0 24.251-7.418 24.251-19.975 0-12.553-6.273-19.97-24.251-19.97h-18.83v39.945h18.83zm-56.207 71.328V5h59.344c41.233 0 59.348 20.256 59.348 48.503 0 28.251-18.115 48.507-59.348 48.507h-21.968v42.796H69.482z"
        fill={color}
      />
    </svg>
  );

  // Baselhack Logo Component (PNG)
  const BaselhackLogo = () => (
    <img
      src="/baselhack.png"
      alt="baselhack"
      className="w-full h-full object-contain pointer-events-none p-1 brightness-0 invert"
    />
  );

  // Customer Images Components
  const Customer1 = () => (
    <img
      src="/customer1.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer2 = () => (
    <img
      src="/customer2.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer3 = () => (
    <img
      src="/customer3.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer4 = () => (
    <img
      src="/customer4.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer5 = () => (
    <img
      src="/customer5.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer6 = () => (
    <img
      src="/customer6.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  const Customer7 = () => (
    <img
      src="/customer7.webp"
      alt="Customer"
      className="w-full h-full object-cover pointer-events-none rounded-full"
    />
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-gray-900/95 backdrop-blur-sm z-50 overflow-hidden">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-40 px-4 gap-2">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
          <div className="text-white/70 text-xs">Score</div>
          <div className="text-white text-xl font-bold">{score}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
          <div className="text-white/70 text-xs">Combo</div>
          <div className="text-white text-xl font-bold">
            {combo > 0 ? `${combo}x` : '-'}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
          <div className="text-white/70 text-xs">Time</div>
          <div className="text-white text-xl font-bold">{timeLeft}s</div>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-[#7cb50d] text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-bounce">
          {message}
        </div>
      )}

      {/* Game Area */}
      <div ref={gameAreaRef} className="w-full h-full relative">
        {!gameOver && (
          <>
            {/* Instructions */}
            {timeLeft === GAME_DURATION && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-30 animate-pulse">
                <div className="text-white text-3xl font-bold mb-2">Catch the logos!</div>
                <div className="text-white/70 text-xl">Click or tap to catch</div>
              </div>
            )}

            {/* Falling Items */}
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleCatch(item)}
                className="absolute rounded-xl shadow-2xl transform hover:scale-110 transition-transform cursor-pointer border-2 border-white/50 flex items-center justify-center backdrop-blur-sm"
                style={{
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  width: `${ITEM_SIZE}px`,
                  height: `${ITEM_SIZE}px`,
                  transform: `rotate(${item.rotation}deg)`,
                  backgroundColor:
                    item.logoType === "baselhack" ? "#000000" :
                    item.logoType.startsWith("customer") ? "transparent" :
                    `${item.color}20`,
                  borderRadius: item.logoType.startsWith("customer") ? "50%" : "0.75rem",
                }}
              >
                {item.logoType === "pax" && <PaxLogo color={item.color} />}
                {item.logoType === "baselhack" && <BaselhackLogo />}
                {item.logoType === "customer1" && <Customer1 />}
                {item.logoType === "customer2" && <Customer2 />}
                {item.logoType === "customer3" && <Customer3 />}
                {item.logoType === "customer4" && <Customer4 />}
                {item.logoType === "customer5" && <Customer5 />}
                {item.logoType === "customer6" && <Customer6 />}
                {item.logoType === "customer7" && <Customer7 />}
              </button>
            ))}
          </>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="bg-white rounded-3xl p-12 max-w-md mx-4 text-center shadow-2xl">
              <Trophy className="w-20 h-20 text-[#7cb50d] mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Game Over!</h2>
              <div className="text-6xl font-bold text-[#1a5ab8] mb-4">{score}</div>
              {maxCombo > 0 && (
                <div className="text-2xl font-semibold text-[#7cb50d] mb-6">
                  Max Combo: {maxCombo}x
                </div>
              )}
              <p className="text-gray-600 text-lg mb-8">
                {score > 150 ? "Legendary! You're insured against everything!" :
                 score > 100 ? "Great job! You're well protected!" :
                 score > 50 ? "Not bad! Keep practicing!" :
                 "Better luck next time!"}
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    setScore(0);
                    setTimeLeft(GAME_DURATION);
                    setGameOver(false);
                    setItems([]);
                    setMessage("");
                    setCombo(0);
                    setMaxCombo(0);
                  }}
                  className="flex-1 bg-[#1a5ab8] hover:bg-[#1548a0] text-white"
                >
                  Play Again
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
