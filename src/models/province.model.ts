import * as mongoose from 'mongoose';
import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import { ID, Field, ObjectType } from 'type-graphql';
@ObjectType({ description: "Object representing a province" })
export class Province extends Typegoose {
  // @Field()
  // @prop()
  // uniqueId: string;

  @Field()
  @prop()
  code: string;

  @Field()
  @prop()
  name: string;
}

export const ProvinceModel = new Province().getModelForClass(Province, {
  schemaOptions: { collection: 'provinces'}
});