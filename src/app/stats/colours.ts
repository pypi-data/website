import chroma from "chroma-js";

// chroma.scale('RdYlBu').domain(myValues, 7, 'quantiles');
let colors = ["orange", "skyblue", "red"];

export function genColours(value: number): string[] {
  return chroma.scale(colors).colors(value);
}
