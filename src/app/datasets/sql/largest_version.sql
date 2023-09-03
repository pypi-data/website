SELECT project_name,
       project_version,
       formatReadableSize(sum(size)) as total_size,
       count(*) as files
FROM pypi
group by 1, 2
order by sum(size) desc
