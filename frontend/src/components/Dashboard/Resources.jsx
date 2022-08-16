import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDashboardResources } from '../../store/resources/actions'
import ResourceCard from './ResourceCard'

const Resources = () => {
  const resources = useSelector(state=>state.resources.list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDashboardResources())
  }, []);

  return (
    <div className='space-y-3'>
        {
          resources?.map((resource)=>{
           return <ResourceCard data={resource}/>
          })
        }
    </div>
  )
}

export default Resources