import React from "react";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";

function Location() {

    const info = {
        streetAddress: "32/5 Rajmahal colony, Manik Bagh Road",
        city: "Indore, India",
        pincode: "452001"
    }
    const {user} = useSelector(state=>state.auth);

  return (
    <div className="">
      <div className="w-full">
        <div className="w-full py-10">
          <div className="flex justify-between items-center w-full border-b-2 py-2">
            <h1 className="text-md font-semibold">Location</h1>
            <span className="bg-white p-1 border border-1 text-gray-400 rounded cursor-pointer text-2xl">
              <BiEdit />
            </span>
          </div>
        </div>
      </div>

      <div className="text-base">
        <p><b>Street Address: </b>{user.address.street || 'Not Found'}</p>
        <p><b>City: </b>{user.address.city || 'Not found'}</p>
        <p><b>Pincode: </b>{user?.address?.street?.split(',')[0] || 'Not Found'}</p>
      </div>

      <div className="py-10">
        {/* eslint-disable-next-line */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.2656451339208!2d75.87759341496154!3d22.681152885127144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcc03e36712d%3A0xb6f3c2bf734a7c!2sIET%20DAVV!5e0!3m2!1sen!2sin!4v1659984500701!5m2!1sen!2sin"
          width="300"
          height="300"
          style={{border: 0}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Location;
