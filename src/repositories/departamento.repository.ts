import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Jefe, Empleado} from '../models';
import {JefeRepository} from './jefe.repository';
import {EmpleadoRepository} from './empleado.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.idJefe,
  DepartamentoRelations
> {

  public readonly jefes: HasManyRepositoryFactory<Jefe, typeof Departamento.prototype.idJefe>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Departamento.prototype.idJefe>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('JefeRepository') protected jefeRepositoryGetter: Getter<JefeRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Departamento, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.jefes = this.createHasManyRepositoryFactoryFor('jefes', jefeRepositoryGetter,);
    this.registerInclusionResolver('jefes', this.jefes.inclusionResolver);
  }
}
