import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import FileViewer from 'react-file-viewer';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
const ViewResource = () => {
  const {token} = useParams();
  const [resourceType,setResourceType] = useState('png');
  const [resourceURL,setResourceURL] = useState('')
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchVerification = async()=>{
    try {
    const result = await axios.post('/request/verify-token', {token});
    setResourceType(result.data.resourceType);
    setResourceURL(result.data.resourceURL);
    }catch(err){
      console.log(err);
      navigate('/not-found');
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchVerification();
  }, [])
  if (loading) return <Layout><div className='w-full min-h-[60vh]'><Loading/></div></Layout>
  return (
    <Layout>
      
    <FileViewer
    fileType={resourceType}
    filePath={resourceURL}
    />
    </Layout>
  )
}

export default ViewResource