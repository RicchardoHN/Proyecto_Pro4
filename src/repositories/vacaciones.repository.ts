import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Vacaciones, VacacionesRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class VacacionesRepository extends DefaultCrudRepository<
  Vacaciones,
  typeof Vacaciones.prototype.idEmpleado,
  VacacionesRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Vacaciones.prototype.idEmpleado>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Vacaciones, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
