import { Field, ObjectType, Int } from 'type-graphql';
import { Province } from '../models/province.model';
import { plainToClass } from "class-transformer";

@ObjectType({ description: "List of provinces" })
export class ListProvinces {
    @Field(type => Int)
    start: number;
    @Field(type => Int)
    count: number;
    @Field(type => Int)
    total: number;
    @Field(type => [Province])
    items: Province[];

    constructor(data: Partial<any> = {}) {
        this.start = data.options.start || 0;
        this.count = data.options.count || 0;
        this.total = data.total || 0;
        let p: any[] = [];
        data.results.forEach((element: any) => {
            let elm = {
                // uniqueId: element._id,
                code: element.code,
                name: element.name
            };
            p.push(elm);
        });
        console.log(`list of provinces: ${JSON.stringify(p)}`);
        this.items = plainToClass (Province, p as Province[]);
        console.log(`items: ${JSON.stringify(this.items)}`);
    }
}