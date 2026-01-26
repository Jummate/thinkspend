import { BrainCircuit, Moon } from "lucide-react";

const SimpleHeader = () => {
  return (
    <header className="flex bg-white items-center justify-center shadow-xs">
      <div className="flex flex-1 justify-between items-center p-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-1">
          <div className="bg-primary p-1 rounded-full">
            <BrainCircuit className="text-white" />
          </div>
          <h1 className="font-bold">ThinkSpend</h1>
        </div>

        <div>
          <Moon />
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
