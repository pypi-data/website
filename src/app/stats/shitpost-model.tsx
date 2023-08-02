import {cumulative_sum} from "@/app/stats/utils";

export default function extrapolate(years: number, values: {
    month: string,
    new_releases: number,
    total_files: number,
    total_size: number
}[]) {
    let releases_extrapolated = extrapolateSeries(years, values.map((el) => el.new_releases))
    let files_extrapolated = extrapolateSeries(years, values.map((el) => el.total_files))
    let size_extrapolated = extrapolateSeries(years, values.map((el) => el.total_size))

    let extrapolated = [];
    let date = new Date(values[values.length - 1].month);
    for (let i = 0; i < years * 12; i++) {
        let month = `${date.getFullYear()}-${(String(date.getMonth() + 1)).padStart(2, '0')}-01`;
        // increase by growth per month

        extrapolated.push({
            month,
            new_releases: releases_extrapolated[i],
            total_files: files_extrapolated[i],
            total_size: size_extrapolated[i]
        });

        date = new Date(date.setMonth(date.getMonth() + 1));
    }

    // console.log(extrapolated.slice(10))
    return [...values, ...extrapolated]
}

function extrapolateSeries(years: number, values: number[]) {
    let time_slice = cumulative_sum(values.slice((values.length - 12), values.length).map(x=>({x})), ["x"]).map(({x})=>x)
    let releases_diff = time_slice[time_slice.length - 1] - time_slice[0];
    let growth_percent = (releases_diff / time_slice[0]);
    let growth_per_month = growth_percent / time_slice.length;

    let last_value = values[values.length - 1];
    let extrapolated = []
    for (let i = 0; i < years * 12; i++) {
        // increase by growth per month
        // let increase = last_value * growth_per_month;
        last_value = last_value * growth_per_month;
        extrapolated.push(last_value);
    }
    return extrapolated
}
