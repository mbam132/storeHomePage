import { ReactNode } from 'react';

interface IProps {
  title: string;
  children: ReactNode;
}

function Card({ title, children }: IProps) {
  return (
    <div className="flex flex-col gap-y-1.5 w-fit border-primary-300 border-2 rounded-md py-3 px-2 items-center h-fit">
      <h1 className="text-xl text-center">{title}</h1>
      {children}
    </div>
  );
}

export default Card;
