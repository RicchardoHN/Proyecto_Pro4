import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Marcar, MarcarRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class MarcarRepository extends DefaultCrudRepository<
  Marcar,
  typeof Marcar.prototype.idEmpleado,
  MarcarRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Marcar.prototype.idEmpleado>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Marcar, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
