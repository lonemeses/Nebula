"use client";

import { useUnit } from "effector-react";
import {
  $blocks,
  $remoteCursor,
  blockDataChanged,
  BlockMoved,
  mouseMoved,
  saveHistory,
} from "@nebula/core";
import "@nebula/core";
import { MousePointer2 } from "lucide-react";
import { registry } from "../../../shared/lib/plugins/registry";
import React, { useCallback } from "react";
import { throttle } from "lodash";
import { BlockWrapper } from "./BlockWrapper";

export const Canvas = () => {
  const blocks = useUnit($blocks);
  const onMove = useUnit(BlockMoved);
  const onSave = useUnit(saveHistory);
  const remoteCursors = useUnit($remoteCursor);
  const onMouseMove = useUnit(mouseMoved);
  const onDataChange = useUnit(blockDataChanged);

  const throttledMove = React.useMemo(
    () =>
      throttle((id: string, x: number, y: number) => onMove({ id, x, y }), 16),
    [onMove],
  );

  const handleDataChange = useCallback(
    (id: string, data: any) => onDataChange({ id, data }),
    [onDataChange],
  );

  return (
    <div
      className="relative w-full h-full"
      onMouseMove={(e) => onMouseMove({ x: e.clientX, y: e.clientY })}
    >
      {Object.entries(remoteCursors).map(([id, cursor]: [string, any]) => (
        <div
          key={id}
          className="absolute pointer-events-none z-50 transition-all duration-75"
          style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        >
          <MousePointer2 color={cursor.color} />
          <span
            className="text-[10px] ml-4 px-1 rounded text-black"
            style={{ backgroundColor: cursor.color }}
          >
            User {id}
          </span>
        </div>
      ))}
      {blocks.map((block) => (
        <BlockWrapper
          key={block.id}
          block={block}
          onMove={throttledMove}
          onDataChange={handleDataChange}
          onSave={onSave}
        />
      ))}
    </div>
  );
};
