import React from "react";
import BreadCrumb from "../breadcrumb/breadCrumb";
import { FaThumbsUp } from "react-icons/fa";

const SummaryContentDetail = ({ isPurchased }) => {
  return (
    <div className="bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20 h-screen">
      <div className="lg:flex block items-center justify-between mb-8">
        <div className="lg:ml-0 lg:mt-0">
          <BreadCrumb />
        </div>
        <p className="text-white font-black text-center lg:my-0 text-2xl">
          Summary Title
        </p>
        <div className=""></div>
      </div>
      <div className="bg-white shadow-lg rounded-xl text-slate-800 flex justify-center lg:w-3/5 w-full mx-auto p-3">
        <div>
          Lorem Ipsum Font Generator Plugins Placeholders Generators English
          Lorem Ipsum Generator Quickly and easily generate Lorem Ipsum
          placeholder text. Select the number of characters, words, sentences or
          paragraphs, and hit generate! ⁂ Lorem Ipsum Generator Lorem ipsum odor
          amet, consectetuer adipiscing elit. Mus amet consequat tempus tellus
          at. Erat tellus sodales posuere velit dignissim, sapien vel integer.
          Senectus amet habitant facilisi urna nascetur amet.<br></br> Erat at
          quisque fringilla amet elementum risus fermentum facilisis. Tellus
          sapien torquent nam mus elementum fringilla? Libero tellus cubilia
          proin posuere commodo dapibus pharetra? Himenaeos blandit mi dapibus
          etiam pulvinar feugiat. Varius feugiat ullamcorper habitasse, egestas
          convallis risus vestibulum. Potenti faucibus egestas quam in velit
          massa pharetra dictum. Laoreet fermentum turpis ad natoque
          sollicitudin justo mattis ac. Habitasse vulputate luctus posuere
          nostra lectus. Congue pulvinar pulvinar aliquet, sapien euismod taciti
          et. Tempor erat blandit proin proin convallis. Cras euismod ipsum
          tortor neque porta tortor. Nam hendrerit ligula purus quam natoque
          tempus! Dictum duis tincidunt sodales sit cursus. Tempor suspendisse
          purus venenatis; neque commodo nullam.
          <FaThumbsUp className="my-2 text-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default SummaryContentDetail;
