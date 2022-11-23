export interface IBaseController<EntityType, CreateDto, UpdateDto> {
  findById(id: string): Promise<EntityType>;

  findAll(): Promise<EntityType[]>;

  create(body: CreateDto): Promise<EntityType>;

  update(id: string, body: UpdateDto): Promise<EntityType>;

  delete(id: string): Promise<Partial<EntityType>>;
}
