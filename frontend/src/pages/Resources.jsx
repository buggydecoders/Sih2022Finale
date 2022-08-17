// import React, { useState } from "react";
// import Layout from "../components/Layout";
// import Navigation from "../components/Navigation";
// import Pagination from "../components/Pagination";
// import ResourcesList from "../components/Resources/ResourcesList";

// const resources = {
//   allResources: [
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//   ],

//   sharedResources: [
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//   ],

//   borrowedResources: [
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//   ],

//   draftResources: [
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//     {
//       name: "3d Printer (Lightning version with 32 Gb Ram)",
//       university: "IET DAVV",
//       price: 1500,
//       image: "https://m.media-amazon.com/images/I/41AyZR+YfLL.jpg",
//     },
//   ],
// };

// const Resources = () => {
//   const states = [
//     "My Resources",
//     "Shared Resources",
//     "Borrowed Resources",
//     "Drafts",
//   ];

//   const getResourceData = (type) => {
//     switch (type) {
//       case "My Resources":
//         return resources.allResources;
//         break;
//       case "Shared Resources":
//         return resources.sharedResources;
//         break;
//       case "Borrowed Resources":
//         return resources.borrowedResources;
//         break;
//       case "Drafts":
//         return resources.draftResources;
//         break;

//       default:
//         break;
//     }
//   };

//   const [resource, setResource] = useState(states[0]);
//   return (
//     <Layout>
//       <div className="px-16 py-10">
//         <div className="text-3xl font-[700] mb-6">{resource}</div>
//         <div className="grid mt-5 grid-cols-[6fr_1fr] gap-12">
//           <ResourcesList
//             resources={getResourceData(resource)}
//             draft={resource === "Drafts" ? true : false}
//           />
//           <Navigation
//             states={states}
//             handleNavigation={setResource}
//             selected={resource}
//           />
//         </div>
//       </div>
//       <Pagination />
//     </Layout>
//   );
// };

// export default Resources;
