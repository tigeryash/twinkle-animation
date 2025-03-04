import { create } from "zustand";

const useControlStore = create((set) => ({
  // Size constraints
  maxHeight: 100,
  maxWidth: 100,
  maxLeft: 100,
  minHeight: 20,
  minWidth: 20,
  minLeft: 0,

  // Animation timing (in seconds)
  maxFallDistance: 100,
  maxFallDuration: 7, // Changed from 300 to 7 seconds
  minFallDistance: 100,
  minFallDuration: 3, // Changed from 300 to 3 seconds

  // Visual properties
  text: "Bakaaa bakaaaa",
  opacity: 0.9,
  falltime: 0.7,
  starFill: "white",
  glow: 4,
  glowColor: "rgba(255, 255, 255, 1)",
  backgroundColor: "black",
  setGlowColor: (glowColor) => set({ glowColor }),
  setStarFill: (starFill) => set({ starFill }),
  setMinHeight: (minHeight) => set({ minHeight }),
  setMinWidth: (minWidth) => set({ minWidth }),
  setMinLeft: (minLeft) => set({ minLeft }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setGlow: (glow) => set({ glow }),
  setFallTime: (falltime) => set({ falltime }),
  setOpacity: (opacity) => set({ opacity }),
  setText: (text) => set({ text }),
  setMaxFallDistance: (maxFallDistance) => set({ maxFallDistance }),
  setMaxFallDuration: (maxFallDuration) => set({ maxFallDuration }),
  setMaxHeight: (maxHeight) => set({ maxHeight }),
  setMaxWidth: (maxWidth) => set({ maxWidth }),
  setMaxLeft: (maxLeft) => set({ maxLeft }),
  setMinFallDistance: (minFallDistance) => set({ minFallDistance }),
  setMinFallDuration: (minFallDuration) => set({ minFallDuration }),
}));

export default useControlStore;
