import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import MaxiRedTitle from './Titles/MaxiRedTitle';

function Footer() {
  const myAccountFooterSection = {
    title: 'Mi cuenta',
    options: [
      { text: 'Información personal', url: 'http://localhost:3000/' },
      { text: 'Direcciones', url: 'http://localhost:3000/' },
      { text: 'Mascotas', url: 'http://localhost:3000/' },
      { text: 'Órdenes', url: 'http://localhost:3000/' },
      { text: 'Agenda', url: 'http://localhost:3000/' },
    ],
  };

  const infoFooterSection = {
    title: 'Información',
    options: [
      { text: 'Formulario de contacto', url: 'http://localhost:3000/' },
      { text: 'Preguntas frecuentes', url: 'http://localhost:3000/' },
      { text: 'Términos y condiciones', url: 'http://localhost:3000/' },
      { text: 'Política de privacidad', url: 'http://localhost:3000/' },
    ],
  };

  const customerServiceFooterSection = {
    title: 'Atención al cliente',
    options: [
      {
        text: 'Bello Monte, calle XXXX, local 1',
        url: 'https://goo.gl/maps/KDy1EUg1akjSQjFA6',
      },
      { text: '(0212) 575 54 12', url: 'tel:+582125755412' },
      { text: 'soporte@maxipet.com', url: 'mailto:soporte@maxipet.com' },
      { text: 'Lunes a Viernes' },
      { text: '9:00 a.m. - 5:00 p.m.' },
    ],
  };

  return (
    <div className="pt-[60px] px-[70px] pb-[75px] flex justify-between flex-col gap-y-6 sm:gap-y-0 sm:flex-row">
      <div className="hidden md:block">
        <MaxiRedTitle>Sobre nosotros</MaxiRedTitle>

        <p className="text-secondary-500 text-sm	font-normal	mt-5 w-[240px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mus molestie
          rhoncus id nunc, porta leo tempus facilisi.
        </p>
      </div>

      <div>
        <MaxiRedTitle>{myAccountFooterSection.title}</MaxiRedTitle>
        <div className="flex flex-col mt-[20px] gap-y-[10px]">
          {myAccountFooterSection.options.map((option, index) => (
            <a
              key={index}
              href={option.url}
              className="text-base	font-normal	text-secondary-500 tracking-wide	"
            >
              {option.text}
            </a>
          ))}
        </div>
      </div>

      <div className="hidden md:block">
        <MaxiRedTitle>{infoFooterSection.title}</MaxiRedTitle>
        <div className="flex flex-col mt-[20px] gap-y-[10px]">
          {infoFooterSection.options.map((option, index) => (
            <a
              key={index}
              href={option.url}
              className="text-base	font-normal	text-secondary-500 tracking-wide	 "
            >
              {option.text}
            </a>
          ))}
        </div>
      </div>
      <div>
        <MaxiRedTitle>{customerServiceFooterSection.title}</MaxiRedTitle>
        <div className="flex flex-col mt-[20px] gap-y-[10px]">
          {customerServiceFooterSection.options.map((option, index) =>
            option.url ? (
              <a
                key={index}
                href={option.url}
                target="_blank"
                className="text-base	font-normal	text-secondary-500 tracking-wide	 "
                rel="noreferrer"
              >
                {option.text}
              </a>
            ) : (
              <span
                key={index}
                className="text-base font-normal	text-secondary-500 tracking-wide	 "
              >
                {option.text}
              </span>
            )
          )}
          {customerServiceFooterSection.options.length > 0 && (
            <div className="flex gap-x-[13px]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="text-secondary-500" size="16" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter
                  className="text-secondary-500 cursor-pointer"
                  size="16"
                />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF
                  className="text-secondary-500 cursor-pointer"
                  size="16"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
