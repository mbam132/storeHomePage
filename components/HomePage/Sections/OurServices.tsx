import React from 'react';
import Image from 'next/image';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import BlackAndWhiteDog from '../../../assets/images/blackAndWhiteDog.png';
import MaxiTitle1 from '../../Titles/MaxiTitle1';
import { IService } from '../../../types';

interface IProps {
  services: IService[];
}

function OurServices({ services }: IProps) {
  return (
    <div className="px-16 md:px-32 flex flex-col mb-[4rem] lg:mb-[7.75rem]">
      <MaxiSubtitle1>Lorem ipsum dolor sit amet. </MaxiSubtitle1>
      <MaxiUpperCaseTitle> Nuestros Servicios </MaxiUpperCaseTitle>

      <p className="text-black-1 text-base font-normal	tracking-wide	mt-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In velit ut
        viverra fames sed.
      </p>

      <div className="w-full mt-10 flex flex-wrap justify-evenly">
        {services.map((service, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/4 px-3 lg:px-8 max-w-[260px] mt-6 sm:mt-0"
          >
            <Image
              src={BlackAndWhiteDog}
              className="w-[80px] h-[80px] "
              alt="Perro blanco y negro sonriente"
            />
            <MaxiTitle1> {service.title}</MaxiTitle1>
            <p className="text-sm	text-black-1"> {service.description} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
