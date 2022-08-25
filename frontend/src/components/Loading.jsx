import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
    return (
        <div className='flex items-center justify-center h-full w-full'>
            <CircularProgress/>
        </div>
    )
}

export default Loading