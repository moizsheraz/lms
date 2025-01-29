import React from "react";
import MaterialCard from "../materialCard/materialCard";
import BreadCrumb from "../breadcrumb/breadCrumb";

const ExtraMaterial = ({ heading, materialLink, isPurchased }) => {
  // Directly use the name and link from the materialLink array
  const materialLinksArray = materialLink.map((item) => ({
    name: item.name || "Link", // Default to "Link" if name is missing
    link: item.link || "#", // Default to "#" if link is missing
  }));

  console.log("ex", materialLinksArray);

  return (
    <div className="bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20 h-screen">
      <BreadCrumb />
      <p className="text-white font-bold text-base md:text-xl lg:text-2xl mx-auto mb-8 text-center">
        {heading}
      </p>
      <div className="w-full lg:w-[50%] mx-auto bg-white p-3 md:p-6 border rounded-md space-y-4">
        {/* Map through materialLinksArray to render a MaterialCard for each link */}
        {materialLinksArray.map((linkObj, index) => (
          <MaterialCard
            key={index}
            name={linkObj.name}
            link={linkObj.link}
            isPurchased={isPurchased}
          />
        ))}
      </div>
    </div>
  );
};

export default ExtraMaterial;
