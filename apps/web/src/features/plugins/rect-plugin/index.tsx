import { NebulaPlugin } from "../../../shared/lib/plugins/types";
import { Square } from "lucide-react";

export const RectPlugin: NebulaPlugin = {
  title: "Rectangle",
  type: "rect",
  icon: <Square />,
  initialData: {
    width: 100,
    height: 100,
    color: "#" + Math.floor(Math.random() * 16777215).toString(16),
  },
  component: ({ data, onChange }) => (
    <div
      className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        backgroundColor: data.color,
        width: data.width,
        height: data.height,
      }}
      onClick={() => {}}
    />
  ),
};
