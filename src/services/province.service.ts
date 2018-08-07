import { BaseRepository } from '../repositories/base/base-repository';
import { ProvinceModel } from '../models/province.model';

export class ProvinceService {
    private repo: BaseRepository;

    constructor() {
        this.repo = new BaseRepository(ProvinceModel);
    }

    public create (province: any) {
        const attr_v = {code: province.code};
        const new_province = {
                    code: province.code,
                    name: province.name
                };
        const Province = new ProvinceModel(new_province);
        return this.repo.create(Province, attr_v);
    }

    public find(req: any) {
        return this.repo.find(req);
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