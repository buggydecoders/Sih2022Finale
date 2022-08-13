import ResourceImg from '../assets/Resources/3dPrinter.png'

const ResourceItem = () => {
    return (
      <div className="px-3 py-3 border-[1px] border-gray-300 rounded-xl">
        <div className="">
          <img src={ResourceImg} className="w-[130px]" alt="" />
        </div>
        <div className="font-[500] mt-7">
          3d Printer (Lightning version with 32 Gb Ram)
        </div>
        <div className="text-sm text-gray-500 font-[500] mt-1">IET, DAVV</div>
        <div className="text-primary font-bold mt-2 text-lg">
          Rs. 1500{" "}
          <span className="text-gray-500 font-[400] text-sm ml-2">/ DAY</span>
        </div>
        <div className="w-full text-center bg-secondary text-white py-2 rounded-xl mt-3 bg-opacity-95 cursor-pointer">
          Request Resource
        </div>
      </div>
    );
  };

  export default ResourceItem