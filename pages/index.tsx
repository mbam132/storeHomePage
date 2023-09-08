import React from 'react';
import HeroSection from '../components/HomePage/Sections/HeroSection';
import OutStandingProducts from '../components/HomePage/Sections/OutStandingProducts';
import PopularProducts from '../components/HomePage/Sections/PopularProducts';
import LastProducts from '../components/HomePage/Sections/LastProducts';
import OurServices from '../components/HomePage/Sections/OurServices';
import FriendBrands from '../components/HomePage/Sections/FriendBrands';
import Footer from '../components/Footer';
import { IProduct, IService } from '../types';

function HomePage() {
  const outStandingProducts: IProduct[] = [
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
  ];

  const popularProducts: IProduct[] = [
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
  ];

  const lastProducts: IProduct[] = [
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
    { title: '1st Choice Puppy Chiot', rating: 3, price: 9.99 },
  ];

  const services: IService[] = [
    {
      title: 'Peluqueria',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
    {
      title: 'Odontología',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
    {
      title: 'Veterinario',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
    {
      title: 'Entrenamiento',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
    {
      title: 'Psicología canina',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
    {
      title: 'Fiestas de cumpleaños',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie rhoncus id nunc, porta leo tempus facilisi.',
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-white flex dark:bg-black flex-col pt-navbar">
      <HeroSection />
      <OutStandingProducts products={outStandingProducts} />
      <PopularProducts products={popularProducts} />
      <LastProducts products={lastProducts} />
      <OurServices services={services} />
      <FriendBrands />
      <Footer />
    </div>
  );
}

export default HomePage;
