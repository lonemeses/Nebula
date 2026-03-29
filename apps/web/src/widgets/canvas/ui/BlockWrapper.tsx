"use client";

import { memo } from "react";
import { registry } from "../../../shared/lib/plugins/registry";

interface Props {
  block: any;
  onMove: (id: string, x: number, y: number) => void;
  onDataChange: (id: string, data: any) => void;
  onSave: () => void;
}

export const BlockWrapper = memo(
  ({ block, onMove, onDataChange, onSave }: Props) => {
    const plugin = registry.get(block.type);

    console.log(`---Рендер блока: ${block.id}---`);

    return (
      <div
        key={block.id}
        className="absolute bg-white shadow-md border rounded group"
        style={{
          transform: `translate3d(${block.x}px, ${block.y}px, 0px)`,
          willChange: "transform",
          left: 0,
          top: 0,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX - block.x;
          const startY = e.clientY - block.y;

          const handleMouseMove = (mouseEvent: MouseEvent) => {
            onMove(
              block.id,
              mouseEvent.clientX - startX,
              mouseEvent.clientY - startY,
            );
          };
          const handleMouseUp = () => {
            onSave();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };

          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      >
        {plugin ? (
          <plugin.component
            data={block.data}
            isEditing
            onChange={(newData) => onDataChange(block.id, newData)}
          />
        ) : (
          <div className="p-4 text-red-400">Плагин {block.type} не найден</div>
        )}
      </div>
    );
  },
);

BlockWrapper.displayName = "BlockWrapper";
