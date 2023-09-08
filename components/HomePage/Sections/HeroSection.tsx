import React from 'react';
import Image from 'next/image';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { SlLocationPin } from 'react-icons/sl';
import { PiUserSquare } from 'react-icons/pi';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import MaxiTitle1 from '../../Titles/MaxiTitle1';
import logo from '../../../assets/images/logo.png';
import PetIcon from '../../../assets/icons/petIcon.png';
import ShoppingCartIcon from '../../../assets/icons/shoppingCartWithRedIcon.png';
import HeroImage from '../../../assets/images/heroImage.png';
import BlackWhiteDog from '../../../assets/images/blackAndWhiteDog.png';
import { IOption } from '../../../types';

function HeroSection() {
  const menuOptions: IOption[] = [
    { title: 'Inicio', url: 'http://localhost:3000' },
    { title: 'Comprar por marca', url: 'http://localhost:3000' },
    { title: 'Comprar por mascota', url: 'http://localhost:3000' },
    { title: 'Nuestros servicios', url: 'http://localhost:3000' },
    { title: 'Promociones', url: 'http://localhost:3000' },
    { title: 'Nosotros', url: 'http://localhost:3000' },
  ];

  const categoriesOptions: IOption[] = [
    { title: 'Perros', url: 'http://localhost:3000' },
    { title: 'Gatos', url: 'http://localhost:3000' },
    { title: 'Peces', url: 'http://localhost:3000' },
    { title: 'Roedores', url: 'http://localhost:3000' },
    { title: 'Reptiles', url: 'http://localhost:3000' },
    { title: 'Placeholder' },
  ];

  const handleFocusSearchInput = () => {
    const searchInputField = document.getElementById('searchInputField');
    searchInputField.focus();
  };

  return (
    <div className="flex flex-col	w-full mb-[3.75rem]">
      <div className="flex items-center justify-between w-full mt-2">
        <Image
          src={logo}
          alt="Logo MaxiPet"
          className="hidden sm:block ml-16 w-[170px] h-[46px]"
        />

        <button
          type="button"
          className="mx-auto sm:mx-0 flex w-80 h-8 py-2 px-4 border-2 border-secondary-200 justify-between items-center rounded"
          onClick={handleFocusSearchInput}
        >
          <input
            id="searchInputField"
            className="	w-full text-secondary-200 placeholder-secondary-200 focus:outline-none text-sm"
            placeholder="Buscador"
          />
          <HiOutlineMagnifyingGlass className="cursor-text h-[17px] w-[17px] text-secondary-200" />
        </button>

        <div className="hidden sm:flex gap-3 mr-16 items-center">
          <SlLocationPin className="text-icon-gray cursor-pointer w-[16px] h-[16px]" />
          <Image
            src={PetIcon}
            alt="Casa de perro"
            className="cursor-pointer w-[16px] h-[16px]"
          />
          <PiUserSquare className="text-icon-gray cursor-pointer w-[18px] h-[18px]" />
          <Image
            src={ShoppingCartIcon}
            alt="Carrito de compra"
            className="cursor-pointer w-[22px] h-[18.5px]"
          />
        </div>
      </div>

      <div className="flex w-full justify-center mt-3.5">
        <div className="flex justify-between w-10/12 flex-wrap gap-3 md:gap-0">
          {menuOptions.map((option, index) =>
            option.url ? (
              <a
                key={index}
                href={option.url}
                className="w-1/4 md:w-auto text-xs	md:text-sm font-extralight md:font-medium	tracking-wide	text-secondary-600 "
              >
                {option.title}
              </a>
            ) : (
              <span
                key={index}
                className="w-1/4 md:w-auto text-xs	md:text-sm font-extralight md:font-medium	tracking-wide	text-secondary-600"
              >
                {option.title}
              </span>
            )
          )}
        </div>
      </div>
      <Image
        src={HeroImage}
        alt="Perro feliz con la lengua afuera"
        className="w-full"
      />

      <div className="px-16 md:px-32 pt-[3.75rem]">
        <MaxiSubtitle1>Lorem ipsum dolor sit amet.</MaxiSubtitle1>
        <MaxiUpperCaseTitle>Una gran variedad de categorias</MaxiUpperCaseTitle>

        <div className="flex flex-wrap mt-5	w-full justify-evenly">
          {categoriesOptions.map((category, index) =>
            category.url ? (
              <a className="w-[112px]" href={category.url} key={index}>
                <Image
                  src={BlackWhiteDog}
                  alt="Perro blanco y negro sonriendo"
                  className="w-full"
                />
                <MaxiTitle1 className="text-center">
                  {category.title}
                </MaxiTitle1>
              </a>
            ) : (
              <div className="w-[112px]" key={index}>
                <Image
                  src={BlackWhiteDog}
                  alt="Perro blanco y negro sonriendo"
                  className="w-full"
                />
                <MaxiTitle1 className="text-center">
                  {category.title}
                </MaxiTitle1>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
