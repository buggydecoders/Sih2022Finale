import ResourceImg from "../assets/Resources/3dPrinter.png";
import { MdDelete } from "react-icons/md";
import { deleteSavedResource } from "../store/resources/actions";
import { useDispatch } from "react-redux";

const ResourceItem = ({ data }) => {
  const { name, images, price, instituteId, _id } = data;
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteSavedResource(_id));
  };
  return (
    <div className="px-3 py-3 border-[1px] border-gray-300 rounded-xl">
      <div className="relative">
        <MdDelete
          className="absolute top-0 right-0 text-2xl cursor-pointer"
          onClick={() => handleDelete()}
        />
        <img src={images[0]?.url} className="w-[130px]" alt={images[0]?.name} />
      </div>
      <div className="font-[500] mt-7">{name}</div>
      <div className="text-sm text-gray-500 font-[500] mt-1">
        {instituteId.instituteName}
      </div>
      <div className="text-primary font-bold mt-2 text-lg">
        {price}
        <span className="text-gray-500 font-[400] text-sm ml-2">/ DAY</span>
      </div>
      <div className="w-full text-center bg-secondary text-white py-2 rounded-xl mt-3 bg-opacity-95 cursor-pointer">
        Request Resource
      </div>
    </div>
  );
};

export default ResourceItem;
