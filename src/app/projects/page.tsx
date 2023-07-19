'use client'
// import packageList from '@/../public/data/pages.json';
import fuseIndex from '@/../public/data/fuse-index.json';
import Link from 'next/link';
import {useSearchParams, useRouter, usePathname} from 'next/navigation'
import {useEffect, useMemo, useState} from "react";
import Fuse from "fuse.js";
import FuseIndex = Fuse.FuseIndex;
import {useDebounce} from "use-debounce";
import sampleSize from "lodash.samplesize";

// @ts-ignore
const {packages, json: indexJson}: {
  packages: string[],
  json: object
} = fuseIndex;
const idx: FuseIndex<string> = Fuse.parseIndex(indexJson);
const fuse = new Fuse(packages, {
  includeScore: true,
  threshold: 0.3,
  distance: 10,
  // ignoreLocation: true,
  useExtendedSearch: false
}, idx);

export default function ProjectsList() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!;
  const searchParam = searchParams.get('search') || '';
  let [search, setSearch] = useState(searchParam);
  const [debouncedSearch] = useDebounce(search, 500);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    const params = new URLSearchParams(searchParams)
    params.set('search', debouncedSearch)
    router.replace(pathname + '?' + params.toString());
  }, [debouncedSearch, pathname, router, searchParams]);

  const searchResults = useMemo(() => {
    if (debouncedSearch.length > 3) {
      console.time(`search ${debouncedSearch}`);
      let result = fuse.search(debouncedSearch, {limit: 50});
      console.timeEnd(`search ${debouncedSearch}`);
      return result.map(({item}) => item)
    } else if (debouncedSearch.length == 0 && isClient) {
      // Select 10 random packages
      return sampleSize(packages, 10);
    }
    return []
  }, [debouncedSearch, isClient]);

  const randomName = useMemo(() => {
    if (isClient) {
      return sampleSize(packages, 1)[0]
    } else {
      return null
    }

  }, [isClient])

  return (
    <>
      <article className="prose lg:prose-md mb-3">
        <h1>Projects List</h1>
      </article>
      <form className="w-full">
        <div className="flex items-center w-full">
          <input type="text"
                 placeholder={`Search for a project. ${randomName && 'i.e ' + randomName || ''}`}
                 className="input input-bordered w-full leading-tight"
                 onChange={(e) => {
                   setSearch(e.target.value)
                 }}
                 value={search}/>
          <button
            className="flex-shrink-0 ml-5 py-1 px-6 rounded btn"
            onClick={(e) => {
              const randomName = sampleSize(packages, 1)[0];
              router.push(`/projects/view?name=${randomName}`)
            }}
            type="button">
            Random project
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
          {searchResults.map((p) => {
            return (
              <tr key={p}>
                <th>
                  <p><Link
                    href={`/projects/view/?name=${p}`}>{p}</Link>
                  </p>
                </th>
                <td>
                  <button className="btn btn-info btn-xs">
                    <Link href={`/projects/view/?name=${p}`}>View</Link>
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}
