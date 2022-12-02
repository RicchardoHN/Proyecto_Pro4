import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {PermisoHora, PermisoHoraRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class PermisoHoraRepository extends DefaultCrudRepository<
  PermisoHora,
  typeof PermisoHora.prototype.idEmpleado,
  PermisoHoraRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof PermisoHora.prototype.idEmpleado>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(PermisoHora, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
