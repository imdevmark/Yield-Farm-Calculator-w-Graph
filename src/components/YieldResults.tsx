import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { YieldResults as YieldResultsType } from '@/lib/calculations';

interface YieldResultsProps {
  results: YieldResultsType;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const RESULT_ITEMS = [
  { label: 'Daily Yield', key: 'dailyYield', color: '#FF3366' },
  { label: 'Weekly Yield', key: 'weeklyYield', color: '#33FF57' },
  { label: 'Monthly Yield (Compounded)', key: 'monthlyYield', color: '#FF33FF' },
  { label: 'Yearly Yield (Compounded)', key: 'yearlyYield', color: '#33FFFF' },
  { label: 'Proportion of Weekly Rewards', key: 'proportion', color: '#FFFF33' }
];

export function YieldResults({ results }: YieldResultsProps) {
  return (
    <Card className="border-4 border-[#ff00ff] bg-black text-white shadow-[4px_4px_0px_#ff00ff]">
      <CardHeader>
        <CardTitle className="text-2xl font-mono text-[#ff00ff]">YIELD RESULTS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {RESULT_ITEMS.map((item, index) => (
            <div key={item.key}>
              <Label className="text-sm" style={{ color: item.color }}>
                {item.label}
              </Label>
              <p className="text-3xl font-mono" style={{ color: item.color }}>
                {formatCurrency(results[item.key as keyof YieldResultsType])}
              </p>
              {index < RESULT_ITEMS.length - 1 && (
                <Separator className="bg-white/20 my-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}