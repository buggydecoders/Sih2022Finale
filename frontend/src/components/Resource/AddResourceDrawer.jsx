import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import ToggleComponent from "../ToggleComponent";
import { BsImage, BsImages } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { AddResource } from "../../store/myresources/actions";
import { getFileLink } from "../../utils/generateImageLink";
import {toast} from 'react-toastify';
const Input = ({ label, required, area, note, cols, ...props }) => {
  return (
    <div className="font-open">
      <div className="font-semibold text-sm">
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </div>
      <div className="mt-2 flex flex-col">
        {!area && (
          <input
            {...props}
            className="w-full focus:border-primary py-1 px-3 rounded-xl outline-none shadow-sm border-[1px] border-gray-200"
          />
        )}
        {area && (
          <textarea
            cols={cols || 3}
            {...props}
            className="w-full py-2 focus:border-primary outline-none px-3 rounded-xl shadow-sm border-[1px] border-gray-200"
          />
        )}
        {note && <div className="text-xs text-gray-400 mt-1">{note}</div>}
      </div>
    </div>
  );
};


const UploadedFiles = ({images,handleRemoveImage})=>{
  const UploadedFile = ({imgData})=>{
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center relative gap-3">
          <div className="w-[70px] relative h-[50px] rounded-md" style={{background : `url(${imgData?.url}) center center/cover`}}>
            <div className="absolute -top-1 -right-1 bg-secondary rounded-full h-[15px] w-[15px]"></div>
          </div>
          <div className="text-sm font-open">
            <div className="font-medium">{imgData?.name}</div>
            <div className="text-xs text-gray-400">{imgData?.size}</div>
          </div>
        </div>
        <div className="text-red-600"><MdClear size={19}/></div>
      </div>
    )
  }
  
  return (
    <div className="space-y-3 mt-3">
      {images.map((img,idx)=><UploadedFile imgData={img} key={idx}/>)}
    </div>
  )

}

const TwoFields = ({ children }) => {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
};

const AddResourceDrawer = ({ isOpen, setIsOpen, productData }) => {
  const handleClose = () => setIsOpen(false);
  const [form,setForm] = useState({
    isActive : true,
    category : null,
    name : '',
    description : '',
    durationFrom : '',
    durationTo : '',
    images : [],
    price : 0,
    conditions : '',
    instructions : '',
    state : 'draft'
  })

  const handleChange = (e)=>setForm(prev=>({...form,[e.target.name] : e.target.value}));
  const dispatch = useDispatch(); 
  const [uploadedFiles,setUploadedFiles] = useState([]);
  const [uploadLoading,setUploadLoading] = useState(false);

  const handleSave = ()=>{
    dispatch(AddResource({...form,state : 'available'}, handleClose));
  }

  const handleMediaChange = (e)=>{
    console.log(e.target.files);
    if (e.target.files.length>0) {
      setUploadedFiles(e.target.files);
    }
    else {
      setUploadedFiles([]);
    }
  }

  const handleAddImages = async()=>{
    const imageUrls = [];
    try{
      setUploadLoading(true);
      for(let i=0; i<uploadedFiles.length; ++i) {
        let url = await getFileLink(uploadedFiles[i]);
        imageUrls.push({url,name : uploadedFiles[i].name,size : uploadedFiles[i].size});
      }
    }catch(err) {
      console.log(err);
      toast(err?.response?.data?.message || 'Some images were not added please try again!');
    }finally{
      setForm(prev=>({...prev,images : [...prev.images,...imageUrls]}));
      setUploadedFiles([]);
      setUploadLoading(false);

    }
  }
  return (
    <Drawer open={isOpen} onClose={handleClose} anchor={"right"}>
      <div className="w-[50vw] p-4">
        <div className="flex justify-between font-open items-center">
          <div className="text-lg font-semibold">Add Resource</div>
          <div className="" onClick={handleClose}>
            <MdClear size={20} />
          </div>
        </div>
        <div className="text-sm text-gray-400 font-open">
          Add Resource to share it with the world!
        </div>
        <div className="flex gap-5 font-open mt-8">
          <ToggleComponent label="Is Active" />
        </div>
        <div className="mt-5 font-open">
          <select
            defaultValue="selectCategory"
            name="category"
            onChange={handleChange}
            className="w-full font-medium py-3 outline-none rounded-xl px-3 bg-gray-100"
          >
            <option disabled value="selectCategory" className="font-[600]">
              Select Category
            </option>
            <option value="research">Research</option>
            <option value="physical">Physical</option>
            <option value="productDesign">Product Design</option>
          </select>
        </div>

        <div className="mt-6 space-y-6">
          <Input
            label="Resource Name"
            required={true}
            onChange={handleChange}
            name="name"
            note="Give your resource a short and clear name."
          />
          <Input
            label="Description"
            area={true}
            required={true}
            onChange={handleChange}
            name="description"
            note="Give your resource a short and clear description."
          />
          <TwoFields>
            <Input name="price" onChange={handleChange} label="Price" required={true} type="number" note="" />
            <Input label="per" type="number" note="Eg: Per/day, per/month" />
          </TwoFields>
          <TwoFields>
            <Input onChange={handleChange} name="durationFrom" label="Available from" type="date" required={true}  note="" />
            <Input onChange={handleChange} name="durationTo" label="Available to" type="date" note="Eg: Per/day, per/month" />
          </TwoFields>
          <Input
            cols={7}
            note="These conditions will be followed by the institute"
            required={true}
            area={true}
            label="Conditions Of Use"
            name="conditions"
            onChange={handleChange}
          />
          <div className="">
            <div className="text-sm relative font-semibold font-open">Media</div>
            <div className="mt-2 relative cursor-pointer space-y-1 w-full h-[90px] flex-col font-open border-dashed border-gray-300 border-[2px] rounded-xl flex items-center justify-center">
              {uploadedFiles.length!==0?<>
              <div>{uploadedFiles.length} Files Selected</div>
              <div className="flex items-center gap-3">
              <button disabled={uploadLoading} onClick={handleAddImages} className="px-3 py-1 border-primary border-[1px] text-primary rounded-md font-open">{uploadLoading?'Uploading..':'Add'}</button>
              <button disabled={uploadLoading} onClick={()=>setUploadedFiles([])} className="px-3 py-1 text-white border-[1px] bg-primary rounded-md font-open">Remove</button>
              </div>
              </>:<>
              <BsImage />
              <input type='file' onChange={handleMediaChange} multiple={true} className="absolute opacity-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"/>
              <div className="text-sm mt-2 text-gray-600">
                Drop your images here or{" "}
                <span className="text-primary">click to browse</span>
              </div>
              <div className=" text-xs text-gray-400">
                1400x1200 recommeded, up to 2MB each.
              </div>
              </>}
            </div>
            <div className="mt-1 font-open text-xs text-gray-400">
              Add upto 4 images to your resource. Used to represet your resource
              on portal
            </div>
          </div>
          <div className="">
          <div className="text-sm font-semibold font-open">Uploads:</div>
          <UploadedFiles images={form.images} handleRemoveImage={()=>{}}/>
          </div>
        </div>
        <div className="mt-12 flex gap-5 items-center justify-between">
          <button className="px-7 rounded-md text-white font-open font-semibold bg-primary py-2" onClick={handleSave}>Save</button>
          <ToggleComponent label={'Is Active'}/>
        </div>
      </div>
    </Drawer>
  );
};

// AddResourceDrawer.defaultProps = {
//   isOpen: false,
//   productData: {},
// };

export default AddResourceDrawer;
