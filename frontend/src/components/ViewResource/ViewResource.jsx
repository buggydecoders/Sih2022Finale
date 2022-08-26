import React from 'react'
import FileViewer from 'react-file-viewer';
import Layout from '../Layout';
const ViewResource = () => {
  return (
    <Layout>
    <FileViewer
    fileType='png'
    filePath='https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/800px-Google_Images_2015_logo.svg.png'
    />
    </Layout>
  )
}

export default ViewResource