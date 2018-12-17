import {Field, InputType} from 'type-graphql';
import {Province} from '../models/province.model';
@InputType({description: 'New Province'})
export class AddProvinceInput implements Partial<Province> {
  @Field()
  code: string;

  @Field()
  name: string;
}