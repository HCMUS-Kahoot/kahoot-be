export interface IBaseService<T> {
  create(model: T): Promise<T>;
  updateOne(id: string, model: T): Promise<T>;
  delete(id: string);
  getAll(): Promise<T[]>;
  getItemById(id: string): Promise<T>;
}
