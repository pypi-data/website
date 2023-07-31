// @ts-ignore
import ARIMA from 'arima';

export default function extrapolate(values: { month: string, new_projects: number, new_project_versions: number, new_releases: number }[]) {
    const extra = extrapolateSeries(values.map((el) => el.new_releases))
    // return
        // ...values.map((el, idx) => ({...el, month: idx.toString()})),
    let date = new Date(values[0].month);
    return extra.map((el, idx) => {
        let x = {month: `${date.getFullYear()}-${(String(date.getMonth() + 1)).padStart(2, '0')}-01`, new_releases: el};
        date = new Date(date.setMonth(date.getMonth() + 1));
        return x
    });

}

function extrapolateSeries(values: number[]) {
    let cumulativeSum = values.map((c, i, a) => (
        c + (a.slice(0, i).reduce((acc, v) => acc + v, 0) || 0)
    ));
    const autoarima = new ARIMA({auto: true}).fit(cumulativeSum);
    const [pred, errors] = autoarima.predict(12 * 25)
    // console.log(pred, errors.map());
    // console.log(pred, errors, errors.map((e, idx) => pred[idx] + (Math.sqrt(e) * 2)))

    // @ts-ignore
    return [...cumulativeSum, ...errors.map((e, idx) => Math.round(pred[idx] + (Math.sqrt(e) ** (1.3 + (idx / 500)))))]

    // pred.forEach((value: number) => {
    //     cumulativeSum.push(value)
    // })
}
