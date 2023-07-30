'use client';
import {SWRConfig} from 'swr'
// @ts-ignore
export const SWRProvider = ({children}) => {
  return <SWRConfig value={{fetcher: (url) => fetch(url).then(res => res.json())}}>{children}</SWRConfig>
};
