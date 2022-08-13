import React from "react";
// import Printer from "../../assets/Resources/3dPrinter.png"
import ResourceCard from "../ResourceCard";
import { Link } from "react-router-dom";

const resources = [
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
  {
    name: "3d Printer (Lightning version with 32 Gb Ram)",
    university: "IET DAVV",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg"
  },
];

function AllResources() {
  return (
    <div className="w-full px-6 py-4 rounded-2xl bg-lightGray">
      <div className="flex justify-between py-4">
        <h2 className="font-semibold text-xl">All Resources</h2>
        {/*eslint-disable-next-line */}
        <Link to="/resources" className="text-gray-500 text-sm underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-3">
        {
            resources.map((resource, index)=>{
                return <ResourceCard data={resource} key={index}/>
            })
        }
      </div>
    </div>
  );
}

export default AllResources;
