import { WebrtcConn } from "y-webrtc";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import {
  BlockAdded,
  blockDataChanged,
  BlockMoved,
  rebaseBlocks,
} from "./model";
import { createEvent, createStore } from "effector";
import { create } from "domain";

export let ydoc: Y.Doc;

export let provider: WebrtcProvider;
//awareness logic
export const $remoteCursor = createStore<
  Record<string, { x: number; y: number; color: string }>
>({});
const cursorChanged = createEvent();

$remoteCursor.on(cursorChanged, () => {
  const states = provider.awareness.getStates();
  const remote: any = {};

  states.forEach((state, clientId) => {
    if (clientId === ydoc.clientID) return;
    if (state.cursor) {
      remote[clientId] = { ...state.cursor, color: state.userColor };
    }
  });
  return remote;
});

export const mouseMoved = createEvent<{ x: number; y: number }>();

mouseMoved.watch(({ x, y }) => {
  provider.awareness.setLocalStateField("cursor", { x, y });
  provider.awareness.setLocalStateField(
    "userColor",
    "#" + Math.floor(Math.random() * 16777215).toString(16),
  );
});

if (typeof window !== "undefined") {
  ydoc = new Y.Doc();

  const signalingServers = ["ws://localhost:4444"];

  provider = new WebrtcProvider("nebula-project", ydoc, {
    signaling: signalingServers,
  });

  const yblocks = ydoc.getMap("blocks");
  // sync logic
  yblocks.observe(() => {
    console.log("--- blocks changed ---");
    const blocksArray = Array.from(yblocks.values()) as any[];
    rebaseBlocks(blocksArray);
  });

  BlockMoved.watch(({ id, x, y }) => {
    const block = yblocks.get(id) as any;
    if (block) {
      yblocks.set(id, { ...block, x, y });
    }
  });

  BlockAdded.watch((block) => {
    yblocks.set(block.id, block);
  });

  blockDataChanged.watch(({ id, data }) => {
    const block = yblocks.get(id) as any;
    if (block) {
      yblocks.set(id, { ...block, data: { ...block.data, ...data } });
    }
  });

  provider.on("peers", (event: any) => {
    console.log("Peers updated:", event.WebrtcConn); // logs the current list of peers
  });
  provider.awareness.on("change", () => cursorChanged());
}

//
