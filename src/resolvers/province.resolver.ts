import { Args, Arg, Mutation, Resolver, Query } from 'type-graphql';
import { plainToClass } from "class-transformer";
import { ProvinceModel, Province } from '../models/province.model';
import { ProvinceService } from '../services/province.service';
import { ListProvinces } from '../output/list.provinces';
import { FilterListArgs } from '../args/FilterListArgs';
import { AddProvinceInput } from '../inputTypes/AddProvinceInput';

@Resolver(of => ProvinceModel)
export default class ProvinceResolver {
    private provinceService: ProvinceService;

    constructor() {
        this.provinceService = new ProvinceService();
    }

    @Query(returns => ListProvinces)
    async GetProvinces(@Args() { pageNumber, pageSize, keywords, sort }: FilterListArgs): Promise<ListProvinces>  {
        const keyword = {
            fields : ['name'],
            term : keywords
        };

        const provinces_tmp = await this.provinceService.find({ pageNumber, pageSize, keyword, sort });
        console.log(`provinces: ${JSON.stringify(provinces_tmp)}`);
        return new ListProvinces(provinces_tmp); // geed
    }

    @Mutation(returns => Province)
    async addProvince(@Arg("province") provinceInput: AddProvinceInput): Promise<Province> {
        console.log(`data: ${JSON.stringify(provinceInput)}`);
        const province = await this.provinceService.create(provinceInput);
        console.log(`province added: ${JSON.stringify(province)}`);
        return plainToClass(Province, {
            code: province.code,
            name: province.name
            });
    }

    // @Mutation()
    // async addProvince(@Arg("province") newProvinceData: AddProvinceInput, @Ctx() ctx: Context,): Promise<Province> {
    // // sample implementation
    // const recipe = await this.provinceService.create(newProvinceData);
    // return recipe;
//   }
//   @Query(returns => Recipe)
//   async recipe(@Arg("id") id: string) {
//     const recipe = await this.recipeService.findById(id);
//     if (recipe === undefined) {
//       throw new RecipeNotFoundError(id);
//     }
//     return recipe;
//   }

//   @Query(returns => [Recipe])
//   recipes(@Args() { skip, take }: RecipesArgs) {
//     return this.recipeService.findAll({ skip, take });
//   }

//   @Mutation(returns => Recipe)
//   @Authorized()
//   addRecipe(
//     @Arg("newRecipeData") newRecipeData: NewRecipeInput,
//     @Ctx("user") user: User,
//   ): Promise<Recipe> {
//     return this.recipeService.addNew({ data: newRecipeData, user });
//   }

//   @Mutation(returns => Boolean)
//   @Authorized(Roles.Admin)
//   async removeRecipe(@Arg("id") id: string) {
//     try {
//       await this.recipeService.removeById(id);
//       return true;
//     } catch {
//       return false;
//     }
//   }
}
