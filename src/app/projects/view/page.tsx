'use client'
import {useSearchParams} from 'next/navigation'
import ProjectInfo from './project_info'

export default function Page() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name');
  if (name == null) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg"
             className="stroke-current shrink-0 h-6 w-6" fill="none"
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Error! No project given</span>
      </div>
    )
  }
  return <ProjectInfo name={name}/>
}
