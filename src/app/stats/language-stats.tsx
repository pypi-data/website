export default async function getLanguageStats(): Promise<LanguageStats[]> {
  const res = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/stats/language_stats.json");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const json_res = await res.text();
  let data = [];
  for (const line of json_res.split("\n")) {
    if (line !== "") {
      data.push(JSON.parse(line));
    }
  }

  return data as LanguageStats[];
}

export type LanguageStats = {
  month: string;
  total: number;
  has_async: number;
  has_async_comp: number;

  has_fstring: number;
  has_annotations: number;

  has_try_star: number;
  has_match: number;
  has_walrus: number;

  has_dataclasses: number;

  has_generator_expression: number;
  has_list_comp: number;
  has_dict_comp: number;
  has_set_comp: number;
};
