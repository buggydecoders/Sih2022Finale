import React from "react";
import Layout from "../components/Layout";
import Breadcrum from "../components/Breadcrum";
import ResourceOverview from "../components/ResourcePage/ResourceOverview";
import Description from "../components/ResourcePage/Description";
import SimilarResources from "../components/ResourcePage/SimilarResources";
import Accordian from "../components/ResourcePage/Accordian";

function Resource() {
  const resource = {
    name: "3D Printer",
    type: "Lab Equipment",
    tags: ["Good", "Good", "Good"],
    duration: 3,
    collage: "IIT Indore",
    price: 1500,
    breif:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus odio aspernatur aut, tempora sapiente animi voluptas labore. Excepturi eum ratione debitis, pariatur nobis nemo dolor, distinctio, quia error nisi consectetur!",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, facilis consequuntur inventore fuga voluptas reprehenderit nostrum. Voluptatem architecto consequatur illum obcaecati velit. Quidem, odio? Nulla debitis voluptas porro, autem assumenda ipsam commodi deleniti eius veritatis itaque facilis libero, quis officia sit inventore saepe amet beatae consequatur neque dicta ipsa tenetur. Nulla, minus vel! Ad magni omnis harum a quibusdam numquam?",
    descriptionImage: "https://source.unsplash.com/random",
    images: [
      "https://xsgames.co/randomusers/avatar.php?g=pixel",
      "https://xsgames.co/randomusers/avatar.php?g=female",
      "https://xsgames.co/randomusers/avatar.php?g=male",
      "https://xsgames.co/randomusers/avatar.php?g=female",
      "https://xsgames.co/randomusers/avatar.php?g=male",
    ],
    similar: [
      {
        name: "3d Printer (Lightning version with 32 Gb Ram)",
        university: "IET DAVV",
        price: 1500,
        image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
      },
      {
        name: "3d Printer (Lightning version with 32 Gb Ram)",
        university: "IET DAVV",
        price: 1500,
        image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
      },
      {
        name: "3d Printer (Lightning version with 32 Gb Ram)",
        university: "IET DAVV",
        price: 1500,
        image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
      },
    ],
    conditionOfUse:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, placeat in adipisci obcaecati corporis repellendus quia! Sequi perferendis cumque nulla cum eius a voluptatibus nam, id, porro aliquam fugit nesciunt saepe temporibus quam? Enim velit veniam labore at provident omnis perspiciatis expedita deleniti iure atque, laboriosam voluptates, assumenda modi repudiandae!",
    instructions:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, placeat in adipisci obcaecati corporis repellendus quia! Sequi perferendis cumque nulla cum eius a voluptatibus nam, id, porro aliquam fugit nesciunt saepe temporibus quam? Enim velit veniam labore at provident omnis perspiciatis expedita deleniti iure atque, laboriosam voluptates, assumenda modi repudiandae!",
  };

  return (
    <Layout>
      <div className="p-10 flex flex-col w-full">
        <Breadcrum />
        <ResourceOverview resource={resource}/>
        <Description description={resource.description} descriptionImage={resource.descriptionImage}/>
        <SimilarResources similar={resource.similar}/>
        <div className="p-10">
          <Accordian heading="Condition of Use" content={resource.conditionOfUse} _id="One"/>
          <Accordian heading="Instructions" content={resource.instructions} _id="Two"/>
        </div>
      </div>
    </Layout>
  );
}

export default Resource;
