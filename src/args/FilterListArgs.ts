import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FilterListArgs {
  @Field(type => Int, { nullable: false })
  pageSize = 10;

  @Field(type => Int, { nullable: false })
  pageNumber = 1;

  @Field({ nullable: true })
  keywords?: string;

  @Field({ nullable: true })
  sort?: string;
}
