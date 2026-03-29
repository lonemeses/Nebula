"use client";

import { useUnit } from "effector-react";
import { $cursor, $history, redo, undo } from "@nebula/core";

export const HistoryControls = () => {
  const [doUndo, doRedo, cursor, history] = useUnit([
    undo,
    redo,
    $cursor,
    $history,
  ]);
  const canUndo = cursor > 0;
  const canRedo = cursor < history.length - 1;

  return (
    <div className="flex gap-2 border-1 pl-4 ml-4">
      <button
        onClick={doUndo}
        disabled={!canUndo}
        className="p-2 text-black bg-slate-100 rounded disabled:opacity-30 hover:bg-slate-200"
      >
        Undo ({cursor})
      </button>
      <button
        onClick={doRedo}
        disabled={!canRedo}
        className="p-2 text-black bg-slate-100 rounded disabled:opacity-30 hover:bg-slate-200"
      >
        Redo
      </button>
    </div>
  );
};
