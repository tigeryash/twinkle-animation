import useControlStore from "./useControlStore";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Colors = () => {
  const controls = useControlStore();

  const [starFill, setStarFill] = useColor(controls.starFill);
  const [glowColor, setGlowColor] = useColor(controls.glowColor);
  return (
    <div className="flex flex-col gap-4 items-center border-t pt-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Star Color</label>
        <div className="flex items-center gap-2">
          <ColorPicker
            color={starFill}
            height={100}
            onChange={setStarFill}
            onChangeComplete={(color) => {
              controls.setStarFill(color.hex);
            }}
            hideInput={["hex", "hsv"]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm opacity-80">Glow Color</label>
        <div className="flex items-center gap-2">
          <ColorPicker
            color={glowColor}
            height={100}
            onChange={setGlowColor}
            onChangeComplete={(color) => {
              controls.setGlowColor(color.hex);
            }}
            hideInput={["hex", "hsv"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Colors;
