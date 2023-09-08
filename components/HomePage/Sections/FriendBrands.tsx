import React from 'react';
import Image from 'next/image';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import FirstChoiceBrandPic from '../../../assets/images/1stChoiceBrand.png';

function FriendBrands() {
  const numberOfFriendBrands = 4;

  return (
    <div className="mb-[2rem] md:mb-[6rem] px-16 md:px-32 flex flex-col">
      <MaxiSubtitle1>Lorem ipsum dolor sit amet.</MaxiSubtitle1>
      <MaxiUpperCaseTitle>Trabajamos con las mejores marcas</MaxiUpperCaseTitle>

      <div className="flex flex-wrap items">
        <p className="text-base	tracking-wide	text-black-1 w-[400px] mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit ut
          viverra fames sed.
        </p>
        <div className="flex gap-x-6 flex-wrap mx-auto">
          {Array.from({ length: numberOfFriendBrands }).map((_, index) => (
            <Image
              key={index}
              src={FirstChoiceBrandPic}
              className="h-[80px] w-[127px]"
              alt="Comida de perro"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendBrands;
