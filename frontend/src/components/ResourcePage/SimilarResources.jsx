import React from 'react'
import ResourceCard from "../ResourceCard";

function SimilarResources({similar}) {
  return (
    <div className='w-full px-10'>
        <h2 className='border-b-2 py-2 font-bold text-xl'>Similar Resources</h2>
        <div className="my-4 grid grid-cols-4">
            {
                similar?.map((resource, idx)=>{
                    return <ResourceCard data={resource} key={idx}/>
                })
            }
        </div>
    </div>
  )
}

export default SimilarResources