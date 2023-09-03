select arrayElement(splitByChar('.', arrayElement(splitByChar('/', path), -1)), -1) as extension,
       count(*)                                         as total_files,
       formatReadableSize(sum(size))                    as total_size
from pypi
where skip_reason = ''
group by 1
order by sum(size) desc
limit 10;
