import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {PermisoDia, PermisoDiaRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class PermisoDiaRepository extends DefaultCrudRepository<
  PermisoDia,
  typeof PermisoDia.prototype.idEmpleado,
  PermisoDiaRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof PermisoDia.prototype.idEmpleado>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(PermisoDia, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
