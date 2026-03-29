import { AddBlockToolbar } from "../features/add-block";
import { HistoryControls } from "../features/history-controls";
import { Canvas } from "../widgets/canvas";

export default function HomePage() {
  return (
    <main className="h-screen w-screen bg-slate-100 flex flex-col p-6 space-y-4">
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-xl font-bold text-slate-800 italic">
          Nebula Engine
        </h1>
        <AddBlockToolbar />
        <HistoryControls />
      </header>

      <section className="flex-1 bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden">
        <Canvas />
      </section>
    </main>
  );
}
