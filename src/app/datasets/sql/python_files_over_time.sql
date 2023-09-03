SELECT toYear(uploaded_on) as year,
       count(*) as python_files,
       count(distinct hash) as unique_files,
       sum(lines) as total_lines,
       round((unique_files/python_files) * 100) as unique_percent

       FROM pypi
where endsWith(path, '.py')
group by 1
order by 1 desc
limit 25;
