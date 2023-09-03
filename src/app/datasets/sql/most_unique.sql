with project_files as (SELECT project_name,
                              count(*)                      as files,
                              count(distinct hash)          as unique,
                              round((unique / files) * 100) as percent_unique,
                              formatReadableSize(sum(size)) as total_size
                       FROM pypi
                       where endsWith(path, '.py')
                       group by 1)
select *
from project_files
where files > (select quantile(0.995)(files) from project_files)
order by 4 desc
limit 10
