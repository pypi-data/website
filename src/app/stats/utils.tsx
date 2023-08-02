export function cumulative_sum(data: any[], valueNames: string[]) : any[] {
  const chartDataDeepCopy = JSON.parse(JSON.stringify(data));
  for (const valueName of valueNames) {
    let sum = 0;
    for (const value of chartDataDeepCopy) {
      sum += value[valueName] as number;
      value[valueName] = sum;
    }
  }
  return chartDataDeepCopy
}
