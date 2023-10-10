import React from 'react';
import Image from 'next/image';
import FirstChoiceFoodImage from '../assets/images/firstChoiceFood.png';
import DogPawFilled from '../assets/images/dogPawFilled.png';
import DogPawUnfilled from '../assets/images/dogPawUnfilled.png';
import ShoppingCartIcon from '../assets/icons/shoppingCart.png';
import { toUsd } from '../utils';
import { IProduct } from '../utils/types';

interface IProps {
  product: IProduct;
}

function ProductCard({ product }: IProps) {
  const amountOfFilledIconsToShow: number = Math.ceil(product.rating ?? 0);

  return (
    <div className="flex flex-col w-full px-3">
      <Image
        src={FirstChoiceFoodImage}
        className="h-[190px] mx-auto"
        alt="Bolsa de comida de perro"
      />

      <h3 className="text-black-1 text-sm font-medium tracking-wide">
        {product.title}
      </h3>
      <div className="flex gap-1.5">
        {Array.from({ length: amountOfFilledIconsToShow }).map((_, index) => (
          <Image
            key={index}
            src={DogPawFilled}
            className="h-[12px] w-[12px]"
            alt="Pata de perro gris"
          />
        ))}
        {Array.from({ length: 5 - amountOfFilledIconsToShow }).map(
          (_, index) => (
            <Image
              key={index}
              src={DogPawUnfilled}
              className="h-[12px] w-[12px]"
              alt="Pata de perro blanca"
            />
          )
        )}
      </div>
      <p className="text-sm font-normal	tracking-wide	text-neutral-500">
        {toUsd(product.price)}
      </p>
      <button
        type="button"
        className="bg-primary-300 h-6 flex justify-center items-center gap-1.5 rounded"
      >
        <Image
          src={ShoppingCartIcon}
          alt="Carrito de compra"
          className="h-[11px] w-[13px]"
        />
        <span className="text-white-1 text-xs">Agregar</span>
      </button>
    </div>
  );
}

export default ProductCard;
