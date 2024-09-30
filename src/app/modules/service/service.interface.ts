import { Model } from 'mongoose';

export type TService = {
  [x: string]: any;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted?: boolean;
  image?: string[];
};

export interface ServiceModel extends Model<TService> {
  isServiceExist(name: string): boolean;
  isServiceExistById(id: string): Promise<TService>;
}
