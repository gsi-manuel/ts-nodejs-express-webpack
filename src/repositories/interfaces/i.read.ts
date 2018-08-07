export interface IRead {
    findOne(id: string): Promise<any>;
    find(req: any, populate: any, sort: any, filters: any): Promise<any>;
}