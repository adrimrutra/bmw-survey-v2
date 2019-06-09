export class Repository<T> {}

export interface GetAll<T> {
    GetAll(): Promise<T[]>;
}
export interface GetById<T> {
    GetById(id: any): Promise<T>;
}
export interface Add<T> {
    Add(entity: T): Promise<any>;
}
export interface Update<T> {
    Update(id: any, entity: T): Promise<any>;
}
export interface Delete {
    Delete(id: any): Promise<any>;
}
