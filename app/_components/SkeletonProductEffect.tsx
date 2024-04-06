import React from 'react'

const SkeletonProductEffect = () => {
  return (
    <div className="flex flex-col gap-5">
    <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse " />
    <div className="h-[20px] w-[120px] bg-slate-200 animate-pulse " />
    <div className="h-[200px] w-[400px] bg-slate-200 animate-pulse " />
    <div className="h-[20px] w-[400px] bg-slate-200 animate-pulse " />
    <div className="h-[50px] w-[100px] bg-slate-200 animate-pulse " />
  </div>
  )
}

export default SkeletonProductEffect