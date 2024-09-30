import { Types } from 'mongoose';

export enum VehicleType {
  CAR = 'car',
  TRUCK = 'truck',
  SUV = 'SUV',
  VAN = 'van',
  MOTORCYCLE = 'motorcycle',
  BUS = 'bus',
  ELECTRIC_VEHICLE = 'electricVehicle',
  HYBRID_VEHICLE = 'hybridVehicle',
  BICYCLE = 'bicycle',
  TRACTOR = 'tractor',
}

export type TBooking = {
  customer: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType: VehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
  status?: string;
};
