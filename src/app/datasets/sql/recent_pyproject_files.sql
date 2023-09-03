SELECT uploaded_on,
       path,
       FROM pypi
where path LIKE '%/pyproject.toml'
order by uploaded_on desc
limit 10;
