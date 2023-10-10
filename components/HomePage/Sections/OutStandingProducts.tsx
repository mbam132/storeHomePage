import React from 'react';
import Image from 'next/image';
import ProductCard from '../../ProductCard';
import CatEatingImage from '../../../assets/images/catEating.png';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import BottomLeftPic from '../../../assets/images/middleSizedDogEating.jpeg';
import BottomRightPic from '../../../assets/images/dogFoodInFloor.jpeg';
import { IProduct } from '../../../utils/types';

interface IProps {
  products: IProduct[];
}

function OutStandingProducts({ products }: IProps) {
  return (
    <div className="px-16 md:px-32 mb-20">
      <MaxiSubtitle1>Lorem ipsum dolor sit amet.</MaxiSubtitle1>
      <MaxiUpperCaseTitle>Productos Destacados</MaxiUpperCaseTitle>
      <div className="flex pt-5 items-between">
        <Image
          src={CatEatingImage}
          className="hidden md:block w-[300px] h-[483px] lg:w-[380px] lg:h-[612px]"
          alt="Gato comiendo, chupandose la lengua"
        />
        <div className="flex flex-wrap gap-0 xl:gap-3 justify-evenly">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 xl:w-1/5 max-w-[260px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-20">
        <Image
          src={BottomLeftPic}
          className="w-2/4"
          alt="Perro comiendo de su plato"
        />
        <Image src={BottomRightPic} className="w-2/4" alt="Comida de perro" />
      </div>
    </div>
  );
}

export default OutStandingProducts;
