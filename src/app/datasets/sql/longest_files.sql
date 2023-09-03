SELECT project_release,
       path,
       lines
FROM pypi
order by lines desc
limit 10;
