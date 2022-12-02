import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Jefe, JefeRelations, Departamento} from '../models';
import {DepartamentoRepository} from './departamento.repository';

export class JefeRepository extends DefaultCrudRepository<
  Jefe,
  typeof Jefe.prototype.idJefe,
  JefeRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Jefe.prototype.idJefe>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Jefe, dataSource);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
