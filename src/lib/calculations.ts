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

export const generateChartData = (investment: number, dpr: number, viewType: 'daily' | 'weekly' | 'monthly' = 'daily'): ChartData[] => {
  let dataPoints: number[];
  let labels: string[];

  switch (viewType) {
    case 'daily':
      dataPoints = [1, 3, 6, 9];
      labels = dataPoints.map(day => `Day ${day}`);
      break;
    case 'weekly':
      dataPoints = [1, 2, 3, 4];
      labels = dataPoints.map(week => `Week ${week}`);
      break;
    case 'monthly':
      dataPoints = [1, 3, 6, 9, 12];
      labels = dataPoints.map(month => `Month ${month}`);
      break;
  }

  return labels.map((label, index) => {
    let days: number;
    switch (viewType) {
      case 'daily':
        days = dataPoints[index];
        break;
      case 'weekly':
        days = dataPoints[index] * 7;
        break;
      case 'monthly':
        days = dataPoints[index] * 30;
        break;
    }

    const yield_ = investment * (Math.pow(1 + (dpr / 100), days) - 1);
    return {
      month: label,
      yield: parseFloat(yield_.toFixed(2))
    };
  });
};