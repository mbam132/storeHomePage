import React from 'react';
import Image from 'next/image';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import ProductCard from '../../ProductCard';
import ImageToTheRight from '../../../assets/images/catEating.png';
import { IProduct } from '../../../utils/types';

interface IProps {
  products: IProduct[];
}

function LastProducts({ products }: IProps) {
  return (
    <div className="px-16 md:px-32 flex flex-col mb-20">
      <div>
        <MaxiSubtitle1>Lorem ipsum dolor sit amet.</MaxiSubtitle1>
        <MaxiUpperCaseTitle>Ultimos Productos</MaxiUpperCaseTitle>
      </div>
      <div className="flex">
        <div className="flex flex-wrap w-auto justify-center">
          {products.map((product, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 max-w-[260px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <Image
          src={ImageToTheRight}
          className="hidden md:block w-[300px] h-[483px] lg:w-[380px] lg:h-[612px]"
          alt="Gato comiendo"
        />
      </div>
    </div>
  );
}

export default LastProducts;
