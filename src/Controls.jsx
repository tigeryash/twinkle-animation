import { useState } from "react";
import useControlStore from "./useControlStore";
import { ColorPicker, useColor } from "react-color-palette";

const Controls = () => {
  const [open, setOpen] = useState(false);
  const controls = useControlStore();
  const [starFill, setStarFill] = useColor(controls.starFill);
  const [glowColor, setGlowColor] = useColor(controls.glowColor);

  const handleChange = (e, setter) => {
    const value =
      e.target.type === "range" ? parseFloat(e.target.value) : e.target.value;
    setter(value);
  };

  return (
    <div className="absolute bottom-4 right-4 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="text-lg text-white bg-black border mr-4 mb-4 border-white rounded-lg px-4 py-2
           hover:bg-white hover:text-black transition duration-300 ease-in-out"
        >
          Settings
        </button>
      ) : (
        <div className="flex flex-col gap-4 bg-gray-800 w-[350px] max-h-[80vh] overflow-y-auto rounded-lg transition duration-300 ease-in-out p-6 text-white">
          <h2 className="text-xl font-semibold border-b pb-2">
            Twinkle Settings
          </h2>
          <div className="flex flex-col gap-4 overflow-scroll">
            {/* Text Setting */}
            <div className="flex flex-col gap-1">
              <label className="text-sm opacity-80">Text</label>
              <input
                type="text"
                value={controls.text}
                onChange={(e) => handleChange(e, controls.setText)}
                className="bg-gray-700 rounded px-3 py-1.5 border border-gray-600"
              />
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-80">Star Color</label>
                <div className="flex items-center gap-2">
                  <ColorPicker
                    color={starFill}
                    width={100}
                    onChange={setStarFill}
                    onChangeComplete={(color) => {
                      controls.setStarFill(color.hex);
                    }}
                    hideHSV
                    hideHEX
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-80">Glow Color</label>
                <div className="flex items-center gap-2">
                  <ColorPicker
                    color={glowColor}
                    width={100}
                    onChange={setGlowColor}
                    onChangeComplete={(color) => {
                      controls.setGlowColor(color.hex);
                    }}
                    hideHSV
                    hideHEX
                  />
                </div>
              </div>
            </div>

            {/* Star Size Controls */}
            <div className="border-t border-gray-600 pt-3 mt-2">
              <h3 className="font-medium mb-2">Star Size</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Min Width */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Min Width: {controls.minWidth}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={controls.minWidth}
                    onChange={(e) => handleChange(e, controls.setMinWidth)}
                    className="w-full"
                  />
                </div>

                {/* Max Width */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Max Width: {controls.maxWidth}px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={controls.maxWidth}
                    onChange={(e) => handleChange(e, controls.setMaxWidth)}
                    className="w-full"
                  />
                </div>

                {/* Min Height */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Min Height: {controls.minHeight}px
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={controls.minHeight}
                    onChange={(e) => handleChange(e, controls.setMinHeight)}
                    className="w-full"
                  />
                </div>

                {/* Max Height */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Max Height: {controls.maxHeight}px
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={controls.maxHeight}
                    onChange={(e) => handleChange(e, controls.setMaxHeight)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="border-t border-gray-600 pt-3 mt-2">
              <h3 className="font-medium mb-2">Animation</h3>

              {/* Fall Distance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Min Fall: {controls.minFallDistance}px
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={controls.minFallDistance}
                    onChange={(e) =>
                      handleChange(e, controls.setMinFallDistance)
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Max Fall: {controls.maxFallDistance}px
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    value={controls.maxFallDistance}
                    onChange={(e) =>
                      handleChange(e, controls.setMaxFallDistance)
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Fall Duration */}
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Min Duration: {controls.minFallDuration}s
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={controls.minFallDuration}
                    onChange={(e) =>
                      handleChange(e, controls.setMinFallDuration)
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm opacity-80">
                    Max Duration: {controls.maxFallDuration}s
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="0.5"
                    value={controls.maxFallDuration}
                    onChange={(e) =>
                      handleChange(e, controls.setMaxFallDuration)
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Visual Effects */}
            <div className="border-t border-gray-600 pt-3 mt-2">
              <h3 className="font-medium mb-2">Visual Effects</h3>

              {/* Glow Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-80">
                  Glow Amount: {controls.glow}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={controls.glow}
                  onChange={(e) => handleChange(e, controls.setGlow)}
                  className="w-full"
                />
              </div>

              {/* Opacity */}
              <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm opacity-80">
                  Opacity: {controls.opacity}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={controls.opacity}
                  onChange={(e) => handleChange(e, controls.setOpacity)}
                  className="w-full"
                />
              </div>

              {/* Fade Time */}
              <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm opacity-80">
                  Fade Time: {controls.falltime}s
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={controls.falltime}
                  onChange={(e) => handleChange(e, controls.setFallTime)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Star Position */}
            <div className="border-t border-gray-600 pt-3 mt-2">
              <h3 className="font-medium mb-2">Star Position</h3>
              <div className="flex flex-col gap-1">
                <label className="text-sm opacity-80">
                  Min Left: {controls.minLeft}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={controls.minLeft}
                  onChange={(e) => handleChange(e, controls.setMinLeft)}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label className="text-sm opacity-80">
                  Max Left: {controls.maxLeft}%
                </label>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={controls.maxLeft}
                  onChange={(e) => handleChange(e, controls.setMaxLeft)}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-lg text-white bg-indigo-600 rounded-lg px-4 py-2 mt-4
            hover:bg-indigo-700 transition duration-300 ease-in-out self-end"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Controls;
