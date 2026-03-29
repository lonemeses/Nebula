import { fork, allSettled } from "effector";
import { describe, it, expect } from "vitest";
import {
  $blocks,
  $cursor,
  Block,
  BlockAdded,
  undo,
  saveHistory,
} from "./model";

describe("Nebula Core Logic", () => {
  it("добавляет блок и делает undo", async () => {
    const scope = fork();
    await allSettled(saveHistory, { scope });

    const newBlock: Block = { id: "test", x: 0, y: 0, data: {}, type: "rect" };
    await allSettled(BlockAdded, { scope, params: newBlock });
    await allSettled(saveHistory, { scope });

    console.log("Блоков после добавления:", scope.getState($blocks).length);
    console.log("Курсор истории:", scope.getState($cursor));

    expect(scope.getState($blocks)).toHaveLength(2);

    await allSettled(undo, { scope });

    console.log("Блоков после undo:", scope.getState($blocks).length);
    console.log("Курсор истории после undo:", scope.getState($cursor));

    expect(scope.getState($blocks)).toHaveLength(1);
  });
});
