import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DiscountModal({ open, setOpen, data }) {
    const handleClose = () => setOpen(false);
    const [form, setForm] = useState([]);

    const handleSubmit = ()=>{
        setForm([])
        handleClose()
    }

    const handleChange = (e)=>{
        form[e.target.name] = [...form[e.target.name] , e.target.value]
    }

    console.log(form)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" className='text-center' variant="h6" component="h2">
                        Add discount to {data?.name}
                    </Typography>
                    <form className=''>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuponCode">
                            Coupon Code
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cuponCode" type="text" placeholder="Coupon Code"/>

                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPercentage">
                            Discount Percentage
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="discountPercentage" type="number" placeholder="Discount Percentage"/>

                        <button onClick={handleSubmit}>Add Discount</button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default DiscountModal