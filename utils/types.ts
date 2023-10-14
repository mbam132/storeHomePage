export interface IUser {
  name?: string;
  email?: string;
  authScope?: string;
  id?: string;
}

export interface ITask {
  id?: number;
  completed?: boolean;
  createdAt?: string;
  name?: string;
}

export interface IProduct {
  title: string;
  rating: number;
  price: number;
}

export interface IOption {
  title: string;
  url?: string;
}

export interface IService {
  title: string;
  description: string;
}

export enum IUserScope {
  SUPERUSER = 'SUPERUSER',
  PLAINUSER = 'PLAINUSER',
}
