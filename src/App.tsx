import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { YieldInputForm } from '@/components/YieldInputForm';
import { YieldResults } from '@/components/YieldResults';
import { YieldChart } from '@/components/YieldChart';
import { 
  calculateYields, 
  generateChartData,
  type YieldInputs, 
  type YieldResults as YieldResultsType,
  type ChartData 
} from '@/lib/calculations';

function App() {
  const [inputs, setInputs] = useState<YieldInputs>({
    investment: '',
    dpr: '',
    wpr: '',
    tvl: '',
    weeklyRewards: ''
  });

  const [results, setResults] = useState<YieldResultsType>({
    dailyYield: 0,
    weeklyYield: 0,
    monthlyYield: 0,
    yearlyYield: 0,
    proportion: 0
  });

  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCalculate = () => {
    const newResults = calculateYields(inputs);
    setResults(newResults);
    
    // Generate chart data
    const investment = parseFloat(inputs.investment);
    const dpr = parseFloat(inputs.dpr);
    if (!isNaN(investment) && !isNaN(dpr)) {
      setChartData(generateChartData(investment, dpr));
    }
  };

  return (
    <div className="min-h-screen bg-black w-full">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Calculator className="w-12 h-12 text-[#00ff00]" />
          <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tight bg-gradient-to-r from-[#00ff00] via-[#ff00ff] to-[#00ffff] text-transparent bg-clip-text">
            YIELD FARM CALCULATOR
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <YieldInputForm 
            inputs={inputs}
            onInputChange={handleInputChange}
            onCalculate={handleCalculate}
          />
          <YieldResults results={results} />
          <YieldChart data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default App;