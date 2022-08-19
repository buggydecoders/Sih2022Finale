import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AddResource, editResource } from "../../store/myresources/actions";
import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input, { TwoFields } from "../Input";
import { sendRequierement } from "../../store/requirements/actions";

const INITIAL_FORM_STATE = {
    isFeatured: true,
    category: null,
    name: '',
    description: '',
    durationFrom: '',
    durationTo: '',
    budget: "",
}

const AddRequestDrawer = ({ isOpen, setIsOpen, data, isEdit }) => {
    const handleClose = () => setIsOpen(false);
    const [form, setForm] = useState(data || INITIAL_FORM_STATE);
    const { loading } = useSelector(state => state.myResources);
    const handleChange = (e) => setForm(prev => ({ ...form, [e.target.name]: e.target.value }));
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();
        if (!form.category) return toast('Select a valid category');
        if (!form.name) return toast('Name is missing');
        if (!form.description) return toast('Description is missing');
        if (!form.budget) return toast('budget is missing');

        const sucessCallback = () => {
            handleClose()
            setForm(INITIAL_FORM_STATE)
        }
        if (isEdit) return dispatch(editResource({ ...form, state: 'available' }, sucessCallback()));

        dispatch(sendRequierement({ ...form }, sucessCallback()));
    }

    return (
        <Drawer open={isOpen} onClose={handleClose} anchor={"right"}>
            <div className="w-[50vw] p-4">
                <div className="flex justify-between font-open items-center">
                    <div className="text-lg font-semibold">{isEdit ? 'Edit Requirement' : 'Add Requirement'}</div>
                    <div className="" onClick={handleClose}>
                        <MdClear size={20} />
                    </div>
                </div>

                <div className="text-sm text-gray-400 font-open">
                    {isEdit ? `Edit request with id ${data._id}` : 'Add Requirement to share it with the world!'}
                </div>

                <form onSubmit={handleSave}>
                    <div className="mt-5 font-open">
                        <select
                            defaultValue={form.category || "selectCategory"}
                            name="category"
                            onChange={handleChange}
                            required={true}
                            className="w-full font-medium py-3 outline-none rounded-xl px-3 bg-gray-100"
                        >
                            <option disabled value="selectCategory" className="font-[600]">
                                Select Category
                            </option>
                            <option value="research">Research</option>
                            <option value="physical">Physical</option>
                            <option value="productDesign">Product Design</option>
                            <option value="virtual">Virtual</option>
                        </select>
                    </div>

                    <FormControlLabel control={<Switch checked={form.isActive} onChange={(e) => setForm(prev => ({ ...prev, isFeatured: e.target.checked }))} />} label="Featured" />

                    <div className="mt-6 space-y-6">
                        <Input
                            label="Resource Name"
                            required={true}
                            onChange={handleChange}

                            value={form?.name}
                            name="name"
                            note="Give your resource a short and clear name."
                        />
                        <Input
                            label="Description"
                            area={true}
                            required={true}
                            onChange={handleChange}
                            name="description"
                            value={form?.description}
                            note="Give your resource a short and clear description."
                        />
                        <Input required={true} value={form.budget} name="budget" onChange={handleChange} label="Budget" type="string" note="Give your budget for the resource" />

                        <TwoFields>
                            <Input required={true} value={form.durationFrom} onChange={handleChange} name="durationFrom" label="Available from" type="date" note="" />
                            <Input required={true} value={form.durationTo} onChange={handleChange} name="durationTo" label="Available to" type="date" note="Eg: Per/day, per/month" />
                        </TwoFields>
                    </div>
                    <div className="mt-4 flex gap-5 items-center justify-between">
                        <button type="submit" disabled={loading === 'SAVE'} className="px-7 disabled:opacity-40 rounded-md text-white font-open font-semibold bg-primary py-2" >{loading === 'SAVE' ? 'Loading..' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default AddRequestDrawer;
