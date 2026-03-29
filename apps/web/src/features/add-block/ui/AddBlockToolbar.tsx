"use client";
import { BlockAdded, saveHistory } from "@nebula/core";
import { registry } from "../../../shared/lib/plugins/registry";
import { useUnit } from "effector-react";

export const AddBlockToolbar = () => {
  const [onAdd, onSave] = useUnit([BlockAdded, saveHistory]);

  const availablePlugins = registry.getAll();

  const handleAddBlock = (pluginType: string, initialData: any) => {
    const finalData = { ...initialData };
    if (pluginType === "rect") {
      finalData.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    onAdd({
      id: Math.random().toString(36).substring(7),
      type: pluginType,
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      data: finalData,
    });
    onSave();
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-white border rounded-lg shadow-sm">
      <span className="text-xs font-semibold text-slate-400 px-2 uppercase tracking-wider">
        Инструменты
      </span>

      {availablePlugins.map((plugin) => (
        <button
          key={plugin.type}
          title={plugin.title}
          onClick={() => handleAddBlock(plugin.type, plugin.initialData)}
          className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-slate-100 transition-colors text-slate-600 hover:text-blue-600 border border-transparent hover:border-slate-200 shadow-sm active:scale-95"
        >
          {plugin.icon}
        </button>
      ))}
    </div>
  );
};
