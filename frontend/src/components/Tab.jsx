import {useNavigate} from 'react-router-dom';

const Tab = ({ title, selected, setSelected,  id }) => {
  const isSelected = id == selected;
  const navigate = useNavigate();
  const handleSelect = () => {
    setSelected(id);
  };
  return (
    <div
      onClick={handleSelect}
      className={`${
        isSelected ? "bg-primary text-white" : "text-gray-700 bg-gray-100"
      } px-5 py-3 text-sm rounded-3xl  hover:bg-primary shadow-md transition-all flex gap-4 cursor-pointer items-center  hover:text-white`}
    >
      <div className="font-[600]">{title}</div>
    </div>
  );
};

export default Tab;
