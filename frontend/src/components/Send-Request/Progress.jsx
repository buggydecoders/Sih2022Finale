import React from 'react'
import { BiDetail } from 'react-icons/bi';
import cls from 'classnames';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Confirmation', 'Sign Contract', 'Payment', 'Exchange duration'];
const isStepFailed = (step) => {
    return step === 1;
};

const getStatus = (status) => {
    switch (status) {
        case 'pending': return 1
        case 'await-sign': return 2
        case 'signed': return 3
        case 'approved': return 4
    }
}

const Progress = ({ status, cancelled }) => {
    return (
        <div>
            <div className='flex items-center relative w-full z-[100] top-[10px]'>
                <Stepper className='w-1/2' activeStep={getStatus(status)} alternativeLabel>
                    {steps.map((label, idx) => {
                        const labelProps = {};
                        if (isStepFailed(idx)) {
                            labelProps.optional = (
                                <Typography variant="caption" color="error">
                                    Alert message
                                </Typography>
                            );

                            labelProps.error = true;
                        }

                        <Step className='items-start' key={idx}>
                            <StepLabel className='w-full'>{label}</StepLabel>
                        </Step>
                    })}
                </Stepper>
            </div>
        </div>
    )
}

export default Progress

