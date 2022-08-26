import React from 'react'
import Layout from '../../components/Layout'
import FileViewer from 'react-file-viewer';
const ViewResource = () => {
  return (
    <Layout>
    <FileViewer
    fileType='mp4'
    filePath='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    />
    </Layout>
  )
}

export default ViewResource