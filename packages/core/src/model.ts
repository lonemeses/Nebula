import { createEvent, createStore, sample } from "effector";

export interface Block {
  id: string;
  type: string;
  x: number;
  y: number;
  data: any;
}
// basic events
export const BlockMoved = createEvent<{ id: string; x: number; y: number }>();
export const BlockAdded = createEvent<Block>();
export const rebaseBlocks = createEvent<Block[]>();
export const blockDataChanged = createEvent<{ id: string; data: any }>();

//history events
export const undo = createEvent();
export const redo = createEvent();
export const saveHistory = createEvent();
export const stateRestored = createEvent<{ blocks: Block[]; cursor: number }>();

// main store with blocks
export const $blocks = createStore<Block[]>([
  {
    id: "1",
    type: "rect",
    x: 100,
    y: 100,
    data: { width: 100, height: 100, color: "red" },
  },
]);

//history store
export const $history = createStore<Block[][]>([]);
export const $cursor = createStore<number>(-1);

//blocks update logic
$blocks
  .on(BlockAdded, (state, block) => [...state, block])
  .on(BlockMoved, (state, { id, x, y }) =>
    state.map((b) => (b.id === id ? { ...b, x, y } : b)),
  )
  .on(rebaseBlocks, (_, payload) => payload)
  .on(blockDataChanged, (state, { id, data }) =>
    state.map((b) =>
      b.id === id ? { ...b, data: { ...b.data, ...data } } : b,
    ),
  );

//history logic
sample({
  clock: saveHistory,
  source: { blocks: $blocks, history: $history, cursor: $cursor },
  fn: ({ blocks, history, cursor }) => {
    const newHistory = history.slice(0, cursor + 1);
    return [...newHistory, [...blocks]].slice(-50);
  },
  target: $history,
});

sample({
  clock: saveHistory,
  source: $cursor,
  fn: (cursor) => (cursor < 49 ? cursor + 1 : cursor),
  target: $cursor,
});

sample({
  clock: undo,
  source: { history: $history, cursor: $cursor },
  filter: ({ cursor }) => cursor > 0,
  fn: ({ history, cursor }) => ({
    blocks: history[cursor - 1],
    cursor: cursor - 1,
  }),
  target: stateRestored,
});

sample({
  clock: redo,
  source: { history: $history, cursor: $cursor },
  filter: ({ history, cursor }) => cursor < history.length - 1,
  fn: ({ history, cursor }) => ({
    blocks: history[cursor + 1],
    cursor: cursor + 1,
  }),
  target: stateRestored,
});

$blocks.on(stateRestored, (_, { blocks }) => blocks);
$cursor.on(stateRestored, (_, { cursor }) => cursor);
