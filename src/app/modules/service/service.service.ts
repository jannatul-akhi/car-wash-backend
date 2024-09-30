import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TService } from './service.interface';
import { Service } from './service.model';

const createServiceIntoDB = async (payload: TService) => {
  const existingService = await Service.findOne({ name: payload.name });

  if (existingService) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This service is already in use',
    );
  }

  const result = await Service.create(payload);
  return result;
};

const getServiceFromDB = async (serviceId: string) => {
  const service = await Service.findById(serviceId).where({ isDeleted: false });

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }

  return service;
};



const getAllServices = async () => {
  const services = await Service.find({ isDeleted: false });
  return services;
};

const updateServiceInDB = async (
  serviceId: string,
  payload: Partial<TService>,
) => {
  const service = await Service.findById(serviceId);

  if (!service || service.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found or deleted');
  }

  const updatedService = await Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
  });
  return updatedService;
};


const deleteServiceFromDB = async (serviceId: string) => {
    const service = await Service.findById(serviceId);
  
    if (!service) {
      throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
    }
  
    service.isDeleted = true;
    await service.save();
  
    return service;
  };

export const ServiceServices = {
  createServiceIntoDB,
  getServiceFromDB,
  getAllServices,
  updateServiceInDB,
  deleteServiceFromDB,
};
