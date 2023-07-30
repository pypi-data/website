'use client'
import {useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useMemo, useState} from "react";
import Fuse from "fuse.js";
import {useDebounce} from "use-debounce";
import sampleSize from "lodash.samplesize";
import useSWRImmutable from 'swr/immutable'
import FuseIndex = Fuse.FuseIndex;

const ASSET_PATH = process.env.NEXT_PUBLIC_ASSET_PATH || '';

export default function ProjectsList() {
    const router = useRouter()
    const searchParams = useSearchParams()!;
    const searchParam = searchParams.get('search') || '';
    let [search, setSearch] = useState(searchParam);
    const [debouncedSearch] = useDebounce(search, 500);
    const [isClient, setIsClient] = useState(false)

    const {
        data,
        error,
        isLoading
    } = useSWRImmutable(`${ASSET_PATH}/data/fuse-index.json`);

    const fuse = useMemo(() => {
        if (error || isLoading || data == null) {
            return null
        }
        // @ts-ignore
        const idx: FuseIndex<string> = Fuse.parseIndex(data.json);
        // @ts-ignore
        return new Fuse(data.packages, {
            includeScore: false,
            threshold: 0.3,
            distance: 10,
            // ignoreLocation: true,
            useExtendedSearch: false
        }, idx)
    }, [data, error, isLoading]);

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!debouncedSearch) {
            return
        }
        // @ts-ignore
        const params = new URLSearchParams(searchParams)
        params.set('search', debouncedSearch)
        router.replace(`/projects/?${params}`);
    }, [debouncedSearch, router, searchParams]);

    const searchResults = useMemo(() => {
        if (debouncedSearch.length > 3 && fuse) {
            console.time(`search ${debouncedSearch}`);
            let result = fuse.search(debouncedSearch, {limit: 50});
            console.timeEnd(`search ${debouncedSearch}`);
            return result.map(({item}) => item)
        } else if (debouncedSearch.length == 0 && isClient) {
            // Select 10 random packages
            // @ts-ignore
            return sampleSize(data && data.packages || [], 10);
        }
        return []
    }, [fuse, data, debouncedSearch, isClient]);

    const randomName = useMemo(() => {
        if (isClient && data) {
            // @ts-ignore
            return sampleSize(data.packages, 1)[0]
        } else {
            return null
        }

    }, [data, isClient])

    if (isLoading) {
        return (
            <span className="loading loading-spinner loading-lg"></span>
        )
    } else if (error) {
        return (
            <div className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="stroke-current shrink-0 h-6 w-6" fill="none"
                     viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Error loading search index! {error.toString()}</span>
            </div>
        )
    }

    return (
        <>
            <article className="prose lg:prose-md mb-3">
                <h1>Projects List <small>{data.packages.length.toLocaleString()} projects</small></h1>
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
                            // @ts-ignore
                            const randomName = sampleSize(data.packages, 1)[0];
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
                                    <p><a href={`/website/projects/view/?name=${p}`}>{p}</a>
                                    </p>
                                </th>
                                <td>
                                    <a role={"button"} className={"btn btn-info btn-xs"}
                                       href={`/website/projects/view/?name=${p}`}>View</a>
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
