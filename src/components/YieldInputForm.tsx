import { DollarSign } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { YieldInputs } from '@/lib/calculations';

interface YieldInputFormProps {
  inputs: YieldInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
}

export function YieldInputForm({ inputs, onInputChange, onCalculate }: YieldInputFormProps) {
  return (
    <Card className="border-4 border-[#00ff00] bg-black text-[#00ff00] shadow-[4px_4px_0px_#00ff00]">
      <CardHeader>
        <CardTitle className="text-2xl font-mono">INPUT PARAMETERS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="investment" className="text-[#00ff00]">Investment Amount ($)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-[#00ff00]" />
            <Input
              id="investment"
              name="investment"
              type="number"
              className="pl-10 bg-black border-2 border-[#00ff00] text-[#00ff00] placeholder:text-[#00ff00]/50"
              value={inputs.investment}
              onChange={onInputChange}
            />
          </div>
        </div>

        {[
          { id: 'dpr', label: 'Daily Percentage Rate (%)', step: '0.01' },
          { id: 'wpr', label: 'Weekly Percentage Rate (%)', step: '0.01' },
          { id: 'tvl', label: 'Active TVL ($)' },
          { id: 'weeklyRewards', label: 'Weekly Rewards ($)' }
        ].map((field) => (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-[#00ff00]">{field.label}</Label>
            <Input
              id={field.id}
              name={field.id}
              type="number"
              step={field.step}
              className="bg-black border-2 border-[#00ff00] text-[#00ff00] placeholder:text-[#00ff00]/50"
              value={inputs[field.id as keyof YieldInputs]}
              onChange={onInputChange}
            />
          </div>
        ))}

        <Button 
          onClick={onCalculate}
          className="w-full bg-[#00ff00] text-black hover:bg-[#00cc00] text-lg h-12 font-mono"
        >
          CALCULATE YIELDS
        </Button>
      </CardContent>
    </Card>
  );
}