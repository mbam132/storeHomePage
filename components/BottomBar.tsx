import React from 'react';
import Image from 'next/image';
import AvilaTekLogo from '../assets/icons/avilaTek.png';
import DogRedHouse from '../assets/images/dogRedHouse.png';
import RedTree from '../assets/images/redTree.png';

function BottomBar() {
  return (
    <div className="flex w-full h-[36px] relative bg-primary-300 bottom-0 justify-center items-center">
      <Image
        src={DogRedHouse}
        className="hidden md:block h-[40px] w-[38px] absolute left-[100px] top-[-40px]"
        alt="Casa de perro roja"
      />
      <p className="text-white-1 text-xs sm:text-sm	text-center	">
        Copyright © 2021 Maxi Pet. Todos los Derechos Reservados. Desarrollado
        por Avila Tek
      </p>
      <Image
        src={AvilaTekLogo}
        className="hidden sm:block h-[17px] w-[28px] mr-[4px]"
        alt="Logo de Avila Tek"
      />

      <Image
        src={RedTree}
        className="hidden md:block h-[60px] w-[53px] absolute right-[100px] top-[-60px]"
        alt="Arbol rojo"
      />
    </div>
  );
}

export default BottomBar;
