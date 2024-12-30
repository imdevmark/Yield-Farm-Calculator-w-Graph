import { useState } from 'react';
import { ChartContainer } from './charts/ChartContainer';
import { YieldLineChart } from './charts/YieldLineChart';
import { generateChartData } from '@/lib/calculations';
import type { ChartData } from '@/lib/calculations';

type ViewType = 'daily' | 'weekly' | 'monthly';

interface YieldChartProps {
  investment: number;
  dpr: number;
  showChart: boolean;
}

export function YieldChart({ investment, dpr, showChart }: YieldChartProps) {
  const [viewType, setViewType] = useState<ViewType>('daily');

  if (!showChart || !investment || !dpr) {
    return null;
  }

  const chartData = generateChartData(investment, dpr, viewType);

  return (
    <section className="w-full mt-12 px-4">
      <div className="bg-[#111] border border-[#00ffff] rounded-lg">
        <div className="px-4 py-2 border-b border-[#00ffff] flex justify-between items-center">
          <h2 className="text-[#00ffff] text-xl font-bold">YIELD GROWTH PROJECTION</h2>
        </div>
        
        <div className="p-4">
          <div className="h-[400px] mb-4">
            <YieldLineChart data={chartData} />
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setViewType('daily')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                viewType === 'daily' 
                  ? 'bg-[#00ffff] text-black' 
                  : 'border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/20'
              }`}
            >
              Daily Yield
            </button>
            <button
              onClick={() => setViewType('weekly')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                viewType === 'weekly' 
                  ? 'bg-[#00ffff] text-black' 
                  : 'border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/20'
              }`}
            >
              Weekly Yield
            </button>
            <button
              onClick={() => setViewType('monthly')}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                viewType === 'monthly' 
                  ? 'bg-[#00ffff] text-black' 
                  : 'border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/20'
              }`}
            >
              Monthly Yield
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}