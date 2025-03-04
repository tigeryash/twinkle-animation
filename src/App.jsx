import { useCallback, useEffect, useRef, useState } from "react";
import Star from "./Star";
// eslint-disable-next-line no-unused-vars
import gsap from "gsap";
import Controls from "./Controls";
import useControlStore from "./useControlStore";

function App() {
  const [stars, setStars] = useState([]);
  const starsRef = useRef(new Map());
  const controls = useControlStore();

  const animatedStars = useRef(new Set());

  const createStar = useCallback(() => {
    // Make randomness more pronounced
    const randomHeight =
      Math.floor(Math.random() * controls.maxHeight) + controls.minHeight; // 20-80px
    const randomWidth =
      Math.floor(Math.random() * controls.maxWidth) + controls.minWidth; // 20-80px
    const randomLeft =
      Math.floor(Math.random() * controls.maxLeft) + controls.minLeft; // 5-95%

    // More variance in fall distance
    const fallDistance =
      Math.floor(Math.random() * controls.maxFallDistance) +
      controls.minFallDistance; // 400-1000px
    const fallDuration =
      Math.floor(Math.random() * controls.maxFallDuration) +
      controls.minFallDuration; // 3-7 seconds

    return {
      id: Date.now() + Math.random(), // Truly unique ID
      height: randomHeight,
      width: randomWidth,
      left: randomLeft,
      fallDistance,
      fallDuration,
      visible: true,
    };
  }, [controls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars((prev) => {
        // Limit max stars to prevent performance issues
        if (prev.length > 50) {
          return [...prev.slice(-49), createStar()];
        }
        return [...prev, createStar()];
      });
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [createStar]);

  const animateStar = useCallback(
    (id, element) => {
      if (!element || animatedStars.current.has(id)) return;

      // Mark this star as animated so we don't re-animate it
      animatedStars.current.add(id);
      starsRef.current.set(id, element);

      // Find the star data in our state
      const star = stars.find((s) => s.id === id);
      if (!star) return;

      // Kill any existing animations on this element to be safe
      gsap.killTweensOf(element);

      // Create a single timeline for all animations
      const tl = gsap.timeline({
        onComplete: () => {
          // Clean up animations and refs when ALL animations are complete
          animatedStars.current.delete(id);
          starsRef.current.delete(id);
          setStars((prev) => prev.filter((s) => s.id !== id));
        },
      });

      // First animation: fall down
      tl.to(element, {
        y: star.fallDistance,
        duration: star.fallDuration,
        ease: "none",
      });

      // Second animation: fade out and scale down (starts immediately after the fall)
      tl.to(
        element,
        {
          opacity: 0,
          scale: 0,
          y: star.fallDistance + star.fallDistance / 4, // Continue moving a bit more
          duration: 0.7,
          ease: "none",
        },
        ">"
      ); // ">" means "start immediately after the previous animation"
    },
    [stars]
  );
  return (
    <main className="flex min-h-screen items-center justify-center bg-black relative overflow-hidden w-full">
      <Controls />
      <h1 className="text-6xl font-bold text-white  ">{controls.text}</h1>
      {stars.map((star) => (
        <div
          key={star.id}
          ref={(el) => animateStar(star.id, el)}
          style={{
            position: "absolute",
            left: `${star.left}%`,
            top: "0",
            willChange: "transform, opacity",
          }}
        >
          <Star
            fill={controls.starFill}
            style={{
              opacity: controls.opacity,
              width: `${star.width}px`,
              height: `${star.height}px`,
              filter: `drop-shadow(0 0 ${controls.glow}px ${controls.glowColor})`,
            }}
          />
        </div>
      ))}
    </main>
  );
}

export default App;
