import { Schema, model } from 'mongoose';
import { ServiceModel, TService } from './service.interface';

const serviceSchema = new Schema<TService, ServiceModel>(
  {
    name: {
      type: String,
      required: [true, 'Service title is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: {
      type: [String],
      default: null,
    },
  },
  { timestamps: true },
);

serviceSchema.statics.isServiceExistById = async function (_id: string) {
  return await Service.findById(_id);
};

export const Service = model<TService, ServiceModel>('Service', serviceSchema);
