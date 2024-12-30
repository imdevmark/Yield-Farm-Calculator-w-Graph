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
  const [showChart, setShowChart] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(null);
  };

  const handleCalculate = () => {
    const { investment, dpr, wpr, tvl, weeklyRewards } = inputs;
    
    if (!investment || !dpr || !wpr || !tvl || !weeklyRewards) {
      setError('Please fill in all fields');
      return;
    }

    const investmentNum = parseFloat(investment);
    const dprNum = parseFloat(dpr);
    const wprNum = parseFloat(wpr);
    const tvlNum = parseFloat(tvl);
    const weeklyRewardsNum = parseFloat(weeklyRewards);

    if (isNaN(investmentNum) || isNaN(dprNum) || isNaN(wprNum) || 
        isNaN(tvlNum) || isNaN(weeklyRewardsNum)) {
      setError('Please enter valid numbers');
      return;
    }

    const newResults = calculateYields(inputs);
    setResults(newResults);
    
    const generatedChartData = generateChartData(investmentNum, dprNum);
    setChartData(generatedChartData);
    setShowChart(true);  // Show the chart after calculation
    
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <Calculator className="mr-4 text-cyan-500" size={48} />
          <h1 className="text-4xl font-bold text-cyan-500">Yield Farm Calculator</h1>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <YieldInputForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
            onCalculate={handleCalculate} 
          />
          <div>
            <YieldResults results={results} />
          </div>
        </div>

        {/* Separate section for chart */}
        {showChart && (
          <YieldChart 
            investment={parseFloat(inputs.investment)} 
            dpr={parseFloat(inputs.dpr)} 
            showChart={showChart} 
          />
        )}
      </div>
    </div>
  );
}

export default App;