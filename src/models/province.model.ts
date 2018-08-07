import * as mongoose from 'mongoose';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';

class Province extends Typegoose {
  @prop()
  code: string;

  @prop()
  name: string;
}

export const ProvinceModel = new Province().getModelForClass(Province, {
  schemaOptions: { collection: 'provinces'}
});