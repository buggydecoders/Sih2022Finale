import React, { useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import DummyLogo from "../../assets/icons/dummyLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getFileLink } from "../../utils/generateImageLink";
import { toast } from "react-toastify";
import { updateUser } from "../../store/auth/actions";
import Input, { TwoFields } from "../Input";
function OrganizationDetails() {
  const { user } = useSelector((state) => state.auth);
  const [logoFile, setLogoFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [logo, setLogo] = useState(user?.logo || DummyLogo);
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
  const handleLogoChange = () => {
    if (!logo) return toast("Select a valid logo file");
    dispatch(
      updateUser(
        { logo },
        () => toast("Logo updated successfully"),
        (err) => toast(err)
      )
    );
  };
  return (
    <div className="py-4 px-10 flex flex-col font-open">
      <h1 className="text-2xl font-semibold">Organization Detail</h1>
      <div className="mt-8">
        <div className="flex flex-col space-y-4">
          <div className="flex gap-7 items-center ">
            <div className="relative">
              <input
                onChange={handleFileChange}
                type="file"
                className="absolute opacity-0 top-[50%] left-[50%] -translate-x-[30%] -translate-y-[50%]"
              />
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
              <button className="text-sm bg-primary text-white py-1 px-3 rounded-md">
                Update Logo
              </button>
              <button className="text-sm border-primary border-[1px] text-primary py-1 px-3 rounded-md">
                Remove Logo
              </button>
            </div>
          </div>
        </div>
      </div>

      <form className="flex flex-col mt-12 space-y-6">
      
        <Input
          paddingY={"max"}
          label="Institute Name"
          disabled={true}
          note="Insitute Name represents your university on portal"
        />
        <TwoFields>
        <Input
          paddingY={"max"}
          label="Email"
          note="Add official email of your institute for other institutes to contact you."
        />
        <Input
          paddingY={"max"}
          label="Phone"
          note="Add official phone of your institute for other institutes to contact you."
        />
        </TwoFields>
        <Input
          paddingY={"max"}
          label="Website"
          placeholder="http://website-domain.com"
          note="Add your college's official website"
        />
        <div className="mt-6">
          <div className="font-[400] mb-6 text-gray-500 text-lg py-3 border-b-[1px]">Social Media Links</div>
          <TwoFields>
            <TwoFields>
            <Input placeholder='Instagram username' label='Instagram'/>
            <Input placeholder='facebook username' label='Facebook'/>
            </TwoFields>
            <TwoFields>
            <Input placeholder='Linkedin Id' label='Linkedin'/>
            </TwoFields>
          </TwoFields>
        </div>
      </form>
    </div>
  );
}

export default OrganizationDetails;
