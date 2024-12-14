export interface YieldInputs {
  investment: string;
  dpr: string;
  wpr: string;
  tvl: string;
  weeklyRewards: string;
}

export interface YieldResults {
  dailyYield: number;
  weeklyYield: number;
  monthlyYield: number;
  yearlyYield: number;
  proportion: number;
}

export interface ChartData {
  month: string;
  yield: number;
}

export const calculateYields = (inputs: YieldInputs): YieldResults => {
  const investment = parseFloat(inputs.investment);
  const dpr = parseFloat(inputs.dpr);
  const wpr = parseFloat(inputs.wpr);
  const tvl = parseFloat(inputs.tvl);
  const weeklyRewards = parseFloat(inputs.weeklyRewards);

  return {
    dailyYield: investment * (dpr / 100),
    weeklyYield: investment * (wpr / 100),
    monthlyYield: investment * (Math.pow(1 + (dpr / 100), 30) - 1),
    yearlyYield: investment * (Math.pow(1 + (dpr / 100), 365) - 1),
    proportion: weeklyRewards * (investment / tvl)
  };
};

export const generateChartData = (investment: number, dpr: number): ChartData[] => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return months.map((month, index) => {
    const days = (index + 1) * 30;
    const yield_ = investment * (Math.pow(1 + (dpr / 100), days) - 1);
    return {
      month,
      yield: parseFloat(yield_.toFixed(2))
    };
  });
};