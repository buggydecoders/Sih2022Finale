import React, { useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import DummyLogo from "../../assets/icons/dummyLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getFileLink } from "../../utils/generateImageLink";
import { toast } from "react-toastify";
import { updateUser } from "../../store/auth/actions";
import Input, { TwoFields } from "../Input";


const DEFAULT_LOGO='https://res.cloudinary.com/unesco-admin/image/upload/v1660597704/_company-frontend_scmp_images_themes_katy_ghosts_company_ghost_company_200x200_v1_fa0fnj.png'

function OrganizationDetails() {
  const { user,loading } = useSelector((state) => state.auth);

  const [form,setForm] = useState({
    instituteName : user?.instituteName || '',
    email : user?.email || '',
    phone : user?.phone || '',
    website : user?.website || '',
    socialLinks : user?.socialLinks || {
      instagram : '',
      facebook : '',
      linkedin : ''
    },
    address : user?.address || {
      pincode : '',
      state : '',
      city : '',
      street : ''
    }
  })




  const [logoFile, setLogoFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [logo, setLogo] = useState(user?.logo || DEFAULT_LOGO);
  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      setLogoFile(e.target.files[0]);
      setUploadLoading(true);
      let link = await getFileLink(e.target.files[0]);
      setUploadLoading(false);
      setLogo(link);
    } else {
      setLogoFile(null);
    }
  };

  const dispatch = useDispatch();

  const handleChange = (e,parent)=>{
    if (!parent) return setForm(prev=>({...prev,[e.target.name] : e.target.value}));
    return setForm(prev=>({
      ...prev, [parent] : {
        ...prev[parent], [e.target.name] : e.target.value
      } 
    }))
  }
  const handleSaveSubmit = (e)=>{
    e.preventDefault();
    dispatch(updateUser({...form, logo}));
  }
  return (
    <div className="py-4 px-10 flex flex-col font-open">
      <h1 className="text-2xl font-semibold">Organization Detail</h1>
      <div className="mt-8">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-7 items-center ">
            <div className="relative">
              <img
                src={logo}
                className="rounded-full w-[110px] h-[110px]"
                alt=""
              />
              {uploadLoading && (
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  Loading..
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button disabled={uploadLoading}  className="text-sm bg-primary relative text-white py-1 px-3 rounded-md">
                Update Logo
                <input
                onChange={handleFileChange}
                type="file"
                className="absolute opacity-0 top-[50%] left-[50%] -translate-x-[30%] -translate-y-[50%]"
              />
              </button>
              <button onClick={()=>setLogo(DEFAULT_LOGO)} className="text-sm border-primary border-[1px] text-primary py-1 px-3 rounded-md">
                Remove Logo
              </button>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveSubmit} className="flex flex-col mt-12 space-y-6">
      
        <Input
          paddingY={"max"}
          label="Institute Name"
          disabled={true}
          value={form.instituteName}
          note="Insitute Name represents your university on portal"
        />
        <TwoFields>
        <Input
          paddingY={"max"}
          label="Email"
          onChange={handleChange}
          name="email"
          value={form.email}
          note="Add official email of your institute for other institutes to contact you."
        />
        <Input
          paddingY={"max"}
          label="Phone"
          onChange={handleChange}
          name="phone"
          disabled={true}
          placeholder='Cannot set right now'
          value={form.phone}
          note="Add official phone of your institute for other institutes to contact you."
        />
        </TwoFields>
        <Input
          paddingY={"max"}
          label="Website"
          name="website"
          onChange={handleChange}
          value={form.website}
          placeholder="http://website-domain.com"
          note="Add your college's official website"
        />
        <div className="mt-6">
          <div className="font-[400] mb-6 text-gray-500 text-lg py-3 border-b-[1px]">Location</div>
          <div className="space-y-6">
            <Input onChange={(e)=>handleChange(e,'address')} name="street" value={form?.address?.street || ''} label='Street Address'/>
            <TwoFields>
                <TwoFields>
                  <Input onChange={(e)=>handleChange(e,'address')} name="city" value={form?.address?.city || ''} paddingY='max' label='City'/>
                  <Input onChange={(e)=>handleChange(e,'address')} name="pincode" value={form?.address?.pincode || ''} paddingY='max' label='Pincode'/>
                </TwoFields>
                <Input  onChange={(e)=>handleChange(e,'address')} name="state" value={form?.address?.state} paddingY='max' label='State'/>
            </TwoFields>
          </div>
        </div>
        <div className="mt-6">
          <div className="font-[400] mb-6 text-gray-500 text-lg py-3 border-b-[1px]">Social Media Links</div>
          <TwoFields>
            <TwoFields>
            <Input  onChange={(e)=>handleChange(e,'socialLinks')} name="instagram" value={form.socialLinks.instagram || ''} placeholder='Instagram username' label='Instagram'/>
            <Input onChange={(e)=>handleChange(e,'socialLinks')} name="facebook" value={form.socialLinks.facebook || ''} placeholder='facebook username' label='Facebook'/>
            </TwoFields>
            <TwoFields>
            <Input onChange={(e)=>handleChange(e,'socialLinks')} name="linkedin" value={form.socialLinks.linkedin || ''} placeholder='Linkedin Id' label='Linkedin'/>
            </TwoFields>
          </TwoFields>
        </div>
        <div className="pt-8">
          <Button disabled={loading==='UPDATE'} type="submit" variant={'filled'}>{loading==='UPDATE'?'Loading...':'Save Changes'}</Button>
        </div>
      </form>
    </div>
  );
}

export default OrganizationDetails;
