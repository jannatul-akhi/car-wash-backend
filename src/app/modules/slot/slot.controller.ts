import httpStatus from 'http-status';
import { SlotServices } from './slot.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createSlot = catchAsync(async (req, res) => {
  const body = req.body;
  const slots = await SlotServices.createSlotDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Slots created successfully',
    data: slots,
  });
});

const getAllAvailableSlot = catchAsync(async (req, res) => {
  const slots = await SlotServices.getAllAvailableSlotFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Available slots retrieved successfully',
    data: slots,
  });
});

const getSlotsById = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await SlotServices.getSlotsByIdFromDB(slotId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots retrieved successfully',
    data: result,
  });
});

const getSlotsByServiceId = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await SlotServices.getSlotsByServiceIdFromDB(serviceId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots retrieved successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllAvailableSlot,
  getSlotsById,
  getSlotsByServiceId,
};
