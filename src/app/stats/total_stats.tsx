import byteSize from "byte-size";
import {Bars3BottomRightIcon, BoltIcon, CircleStackIcon, CodeBracketIcon} from '@heroicons/react/24/solid'
import {StatsOverTime, TotalStat} from "@/app/stats/stats";

export default function TotalStats({stats, lastMonth}: { stats: TotalStat, lastMonth: StatsOverTime }) {
  const total_hours_in_a_month = 24 * 30;
  const lines_per_second = lastMonth.total_lines / (total_hours_in_a_month * 60 * 60);
  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CodeBracketIcon className="inline-block w-8 h-8 stroke-current"/>
          </div>
          <div className="stat-title">Total files</div>
          <div className="stat-value text-primary">{(stats.total_files / 1000 / 1000 / 1000).toLocaleString(undefined, {maximumFractionDigits: 2})} Billion</div>
          <div className="stat-desc">{stats.unique_files.toLocaleString()} unique </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <Bars3BottomRightIcon className="inline-block w-8 h-8 stroke-current"/>
          </div>
          <div className="stat-title">Total lines of text</div>
          <div
            className="stat-value text-secondary">{(stats.total_lines / 1000 / 1000 / 1000).toLocaleString(undefined, {maximumFractionDigits: 1})} Billion
          </div>
          <div className="stat-desc">{stats.total_lines.toLocaleString()} to be precise</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <CircleStackIcon className="inline-block w-8 h-8 stroke-current"/>
          </div>
          <div className="stat-title">Total uncompressed size</div>
          <div className="stat-value text-secondary">{byteSize(stats.total_size, {
            units: 'iec',
            precision: 1
          }).toString()}</div>
          <div className="stat-desc">
            That is ~{(stats.total_size / (1468006)).toLocaleString()} floppy disks
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <BoltIcon className="inline-block w-8 h-8 stroke-current"/>
          </div>
          <div className="stat-title">Lines of code added per second</div>
          <div className="stat-value text-secondary">{lines_per_second.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          <div className="stat-desc">
            In the month {lastMonth.month}
          </div>
        </div>
      </div>
    </>
  )
}
