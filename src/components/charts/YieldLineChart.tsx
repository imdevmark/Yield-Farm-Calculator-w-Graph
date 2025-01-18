import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import type { ChartData } from '@/lib/calculations';

interface YieldLineChartProps {
  data: ChartData[];
}

export function YieldLineChart({ data }: YieldLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 40,
          left: 40,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis 
          dataKey="month" 
          stroke="#00ffff"
          tick={{ fill: '#00ffff' }}
          allowDecimals={false}
          axisLine={{ strokeWidth: 2 }}
        />
        <YAxis 
          stroke="#00ffff"
          tick={{ fill: '#00ffff' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
          axisLine={{ strokeWidth: 2 }}
          width={100}
          domain={[0, 'dataMax * 1.2']} // Ensures all data points are visible with padding
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="yield"
          stroke="#00ff00"
          strokeWidth={3}
          dot={{
            stroke: '#00ff00',
            strokeWidth: 2,
            r: 6,
            fill: '#000'
          }}
          activeDot={{
            stroke: '#00ff00',
            strokeWidth: 2,
            r: 8,
            fill: '#000'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
