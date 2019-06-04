export interface IRepository<T> {
    Get(): Promise<T[]>;
    Add(entity: T): Promise<any>;
    Update(id: any, entity: T): Promise<any>;
    Delete(id: any): Promise<any>;
}
