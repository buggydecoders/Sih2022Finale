import React, { useState } from "react";
import Button from "../Button";
import FormInputField from "../FormInputField";
import DummyLogo from "../../assets/icons/dummyLogo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getFileLink } from "../../utils/generateImageLink";
import { toast } from "react-toastify";
import { updateUser } from "../../store/auth/actions";
import Input, { TwoFields } from "../Input";
function POCDetails() {
  const { user, loading } = useSelector((state) => state.auth);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [logo, setLogo] = useState(user?.contactPerson?.image || DummyLogo);
  const [signature, setSignature] = useState(
    user?.contactPerson?.signature || DummyLogo
  );

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      setUploadLoading(true);
      let link = await getFileLink(e.target.files[0]);
      setUploadLoading(false);
      setLogo(link);
    } else {
      setLogo(null);
    }
  };

  const handleSignatureChange = async (e) => {
    if (e.target.files.length > 0) {
      setUploadLoading(true);
      let link = await getFileLink(e.target.files[0]);
      setUploadLoading(false);
      setSignature(link);
    } else {
      setSignature(null);
    }
  };

  const [form, setForm] = useState({
    image: user?.contactPerson?.image || "",
    name: user?.contactPerson?.name || "",
    email: user?.contactPerson?.email || "",
    position: user?.contactPerson?.position || "",
    phone: user?.contactPerson?.phone || "",
    signature: user?.contactPerson?.signature || "",
  });
  const dispatch = useDispatch();

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(
        { contactPerson: { ...form, image: logo, signature: signature } },
        () => toast("POC Updated Successfully!"),
        (err) => toast(err)
      )
    );
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="py-4 px-10 flex- flex-col">
      <h1 className="text-2xl font-semibold">Contact Person Details</h1>
      <div className="mt-8">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-9 items-center ">
            <div className="relative">
              <input
                onChange={handleFileChange}
                type="file"
                className="absolute opacity-0 w-[80px] overflow-hidden top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
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
                Update Picture
              </button>
              <button className="text-sm border-primary border-[1px] text-primary py-1 px-3 rounded-md">
                Remove Picture
              </button>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleUpdateSubmit}
        className="flex flex-col mt-12 space-y-6"
      >
        <Input
          value={form.name}
          name="name"
          onChange={handleChange}
          label="Full Name"
          required={true}
        />
        <TwoFields>
          <Input
            value={form.email}
            name="email"
            onChange={handleChange}
            label="Email"
            note="This email will be used to contact POC"
            required={true}
          />
          <Input
            value={form.phone}
            name="phone"
            onChange={handleChange}
            label="Phone"
            note="This phone will be used to contact POC"
            required={true}
          />
        </TwoFields>
        <TwoFields>
          <Input
            value={form.position}
            name="position"
            placeholder="Faculty of ...."
            label="Position/Designation"
            note="Enter designation of the contact person"
            required={true}
            onChange={handleChange}
          />
          <Input
            name="signature"
            placeholder="Upload your Signature"
            label="Signature"
            onChange={handleSignatureChange}
            type="file"
            note="Upload Signature of the contact person"
            required={true}
          />
        </TwoFields>
        <div className="flex  justify-center w-fit">
          <Button disabled={loading} type="submit" variant="filled">
            {loading ? "Loading.." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default POCDetails;
