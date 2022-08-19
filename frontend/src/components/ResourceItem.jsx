import ResourceImg from "../assets/Resources/3dPrinter.png";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteSavedItem } from "../store/resources/actions";

const ResourceItem = ({ data }) => {
  const { name, images, price, instituteId, _id } = data;
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteSavedItem(_id));
  };
  
  return (
    <div className="px-3 py-3 border-[1px] border-gray-300 rounded-xl">
      <div className="relative">
        <MdDelete
          className="absolute top-1 right-1 text-2xl cursor-pointer bg-white rounded-full p-1"
          onClick={() => handleDelete()}
        />
        {images?<img src={images[0].url} className="w-full object-cover h-40" alt={images[0].name} />:<img src={ResourceImg} className="w-full object-cover h-40" alt="Dummy"/>}
      </div>
      <div className="font-[500] mt-7">{name}</div>
      <div className="text-sm text-gray-500 font-[500] mt-1">
        {instituteId?.instituteName}
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
