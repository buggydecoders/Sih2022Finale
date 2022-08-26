import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading({minH}) {
    return (
        <div style={{minHeight : minH}} className='flex items-center justify-center h-full w-full'>
            <CircularProgress/>
        </div>
    )
}

export default Loading