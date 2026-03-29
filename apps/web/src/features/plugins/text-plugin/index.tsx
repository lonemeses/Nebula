"use client";

import { NebulaPlugin } from "../../../shared/lib/plugins/types";

export const TextPlugin: NebulaPlugin = {
  title: "Text",
  type: "text-block",
  initialData: { text: "Hello World", fontSize: 16 },
  icon: <span>T</span>,
  component: ({ data, onChange }) => (
    <div className="w-full h-full p-2 overflow-hidden">
      <textarea
        className="w-full h-full bg-transparent outline-none resize-none border-none focus:ring-0 text-black"
        value={data.text}
        style={{ fontSize: data.fontSize }}
        onChange={(e) => onChange({ text: e.target.value })}
      />
    </div>
  ),
};
