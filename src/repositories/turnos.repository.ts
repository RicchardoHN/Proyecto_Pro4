import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Turnos, TurnosRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class TurnosRepository extends DefaultCrudRepository<
  Turnos,
  typeof Turnos.prototype.idTurno,
  TurnosRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Turnos.prototype.idTurno>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Turnos, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
