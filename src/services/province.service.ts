import { BaseRepository } from '../repositories/base/base-repository';
import { ProvinceModel } from '../models/province.model';
import { AbstractRepository } from '../repositories/base/AbstractRepository';

export class ProvinceService {
    private repo: BaseRepository;
    private repo1: AbstractRepository;

    constructor() {
        this.repo = new BaseRepository(ProvinceModel);
        this.repo1 = new AbstractRepository();
    }

    public create (province: any) {
        const attr_v = {code: province.code};
        // const new_province = {
        //             code: province.code,
        //             name: province.name
        //         };
        
        const Province = new ProvinceModel(province);
        console.log(`province1: ${JSON.stringify(Province)}`);
        return this.repo1.create(ProvinceModel, Province, attr_v);
    }

    public find(filter: any) {
        return this.repo1.find(ProvinceModel, filter);
        // return this.repo.find(req);
    }

    public findOne(_id: string) {
        return this.repo.findOne(_id);
    }

    public update(_id: string, dataUpdate: any) {
        return this.repo.update(_id, dataUpdate);
    }

    public delete(_id: string) {
        return this.repo.delete(_id);
    }
}