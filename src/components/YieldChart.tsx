import { ChartContainer } from './charts/ChartContainer';
import { YieldLineChart } from './charts/YieldLineChart';
import type { ChartData } from '@/lib/calculations';

interface YieldChartProps {
  data: ChartData[];
}

export function YieldChart({ data }: YieldChartProps) {
  return (
    <ChartContainer title="YIELD GROWTH PROJECTION" borderColor="#00ffff">
      <YieldLineChart data={data} />
    </ChartContainer>
  );
}