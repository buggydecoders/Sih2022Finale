import React from "react";
import { BsPatchCheck } from "react-icons/bs";

const SignContract = () => {
  return (
    <div>
      <div className="border-[1px] bg-green-500 bg-opacity-10 border-green-200 rounded-md flex gap-5  px-5 py-3 items-center">
        <div className="w-[60px] flex items-center justify-center h-[60px] rounded-full bg-green-400">
          <BsPatchCheck size={30} className="text-white" />
        </div>
        <div>
          <div className="text-xl font-[600]">Request Confirmed!</div>
          <div className="text-sm text-gray-600">
            Wohoo! Your resource has been accepted, wait for the signup the
            contract!
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="text-xl font-[600]">Sign Contract</div>
        <div className="text-sm text-gray-500">
          Please read before confirming & upload a digital signature.
        </div>
        <div className="h-[50vh] border-[1px] p-3 text-sm mt-6 overflow-y-auto border-gray-200 rounded-md w-full">
          <p className="font-[600] mb-3">Terms Basic</p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          placeat asperiores recusandae tempore, dolorem quam error maiores
          ullam laborum dolore!
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          sapiente. Libero aut quis doloribus ducimus qui, voluptatibus
          perferendis, id ad commodi laborum eius, perspiciatis rerum veniam
          quasi maxime aperiam itaque?
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum
          rerum explicabo magni vel enim obcaecati tempore aperiam sed
          consequuntur fugiat quam quaerat ex laudantium atque exercitationem
          saepe beatae non porro voluptatum architecto blanditiis, repudiandae
          ipsa! Dicta facilis animi incidunt.
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum
          rerum explicabo magni vel enim obcaecati tempore aperiam sed
          consequuntur fugiat quam quaerat ex laudantium atque exercitationem
          saepe beatae non porro voluptatum architecto blanditiis, repudiandae
          ipsa! Dicta facilis animi incidunt.
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum
          rerum explicabo magni vel enim obcaecati tempore aperiam sed
          consequuntur fugiat quam quaerat ex laudantium atque exercitationem
          saepe beatae non porro voluptatum architecto blanditiis, repudiandae
          ipsa! Dicta facilis animi incidunt.
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum
          rerum explicabo magni vel enim obcaecati tempore aperiam sed
          consequuntur fugiat quam quaerat ex laudantium atque exercitationem
          saepe beatae non porro voluptatum architecto blanditiis, repudiandae
          ipsa! Dicta facilis animi incidunt.
          <br /> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eum
          rerum explicabo magni vel enim obcaecati tempore aperiam sed
          consequuntur fugiat quam quaerat ex laudantium atque exercitationem
          saepe beatae non porro voluptatum architecto blanditiis, repudiandae
          ipsa! Dicta facilis animi incidunt.
        </div>
        <div className="mt-5 flex justify-between items-center">

        <div className="flex items-center gap-3 relative">
            <input type="file" className="absolute top-0 left-0 opacity-0"/>
            <div className="border-primary border-[1px] rounded-md text-primary px-3 py-1 text-sm font-[600]">Choose File</div>
            <div className="text-sm font-[500] text-gray-500">Select a clear signature picture.</div>
        </div>

        <button className="bg-primary px-5 py-2 rounded-md text-white text-sm font-[500] cursor-pointer">Continue to Payment</button>

        </div>
      </div>
    </div>
  );
};

export default SignContract;
