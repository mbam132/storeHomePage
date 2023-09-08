import React from 'react';
import Image from 'next/image';
import MaxiUpperCaseTitle from '../../Titles/MaxiUpperCaseTitle';
import MaxiSubtitle1 from '../../Titles/MaxiSubtitle1';
import ProductCard from '../../ProductCard';
import BottomImage from '../../../assets/images/dowChewingBall.png';
import { IProduct } from '../../../types';

interface IProps {
  products: IProduct[];
}

function PopularProducts({ products }: IProps) {
  return (
    <div className="px-16 md:px-32 mb-20">
      <MaxiSubtitle1> Lorem ipsum dolor sit amet. </MaxiSubtitle1>
      <MaxiUpperCaseTitle> Productos Populares</MaxiUpperCaseTitle>
      <div className="flex flex-wrap gap-0 justify-evenly">
        {products.map((product, index) => (
          <div key={index} className="w-full md:w-1/3 xl:w-1/5 max-w-[260px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <Image
        src={BottomImage}
        className="mt-20 mx-auto"
        alt="Perro mordiendo pelota"
      />
    </div>
  );
}

export default PopularProducts;
