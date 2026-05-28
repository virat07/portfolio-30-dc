import React from "react";
import { motion } from "framer-motion";

const DriverStandings = () => {
  return (
    <div className="mt-6 p-6 rounded-2xl glass-panel border border-gray-800 font-mono text-xs">
      <h3 className="text-white font-bold mb-4 uppercase tracking-wider">
        Driver Standings Points (2026 Season Simulation)
      </h3>

      {/* SVG Line Chart */}
      <div className="relative h-48 w-full mt-4">
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-gray-500 pr-1 border-r border-gray-800/40">
          <span>250</span>
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Chart Content Area */}
        <div className="absolute left-9 right-2 top-2 bottom-6">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full border-t border-slate-800/30"></div>
            ))}
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Verstappen line (Green Neon) */}
            <motion.path
              d="M 0,90 Q 20,40 40,25 T 80,18 T 100,15"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 4px rgba(16, 185, 129, 0.4))" }}
            />
            {/* Norris line (Teal Neon) */}
            <motion.path
              d="M 0,90 Q 25,60 50,35 T 85,25 T 100,22"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
              style={{ filter: "drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))" }}
            />
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="absolute left-9 right-2 bottom-0 h-5 flex justify-between text-[10px] text-gray-500 pt-1.5 border-t border-gray-800/40">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-2 pt-2 border-t border-slate-900/60">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-0.5 bg-emerald-500 inline-block shadow-emerald"></span>
          <span className="text-[10px] text-gray-400">Verstappen (Forecast)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-0.5 bg-cyan-500 inline-block shadow-cyan"></span>
          <span className="text-[10px] text-gray-400">Norris (Forecast)</span>
        </div>
      </div>
    </div>
  );
};

export default DriverStandings;
