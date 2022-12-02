import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ProyectoDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, PermisoHora, PermisoDia, Marcar, Vacaciones, Turnos, Departamento} from '../models';
import {PermisoHoraRepository} from './permiso-hora.repository';
import {PermisoDiaRepository} from './permiso-dia.repository';
import {MarcarRepository} from './marcar.repository';
import {VacacionesRepository} from './vacaciones.repository';
import {TurnosRepository} from './turnos.repository';
import {DepartamentoRepository} from './departamento.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.idEmpleado,
  EmpleadoRelations
> {

  public readonly permisoHora: BelongsToAccessor<PermisoHora, typeof Empleado.prototype.idEmpleado>;

  public readonly permisoDia: BelongsToAccessor<PermisoDia, typeof Empleado.prototype.idEmpleado>;

  public readonly marcar: BelongsToAccessor<Marcar, typeof Empleado.prototype.idEmpleado>;

  public readonly vacaciones: BelongsToAccessor<Vacaciones, typeof Empleado.prototype.idEmpleado>;

  public readonly turnos: BelongsToAccessor<Turnos, typeof Empleado.prototype.idEmpleado>;

  public readonly departamentos: HasManyRepositoryFactory<Departamento, typeof Empleado.prototype.idEmpleado>;

  constructor(
    @inject('datasources.proyecto') dataSource: ProyectoDataSource, @repository.getter('PermisoHoraRepository') protected permisoHoraRepositoryGetter: Getter<PermisoHoraRepository>, @repository.getter('PermisoDiaRepository') protected permisoDiaRepositoryGetter: Getter<PermisoDiaRepository>, @repository.getter('MarcarRepository') protected marcarRepositoryGetter: Getter<MarcarRepository>, @repository.getter('VacacionesRepository') protected vacacionesRepositoryGetter: Getter<VacacionesRepository>, @repository.getter('TurnosRepository') protected turnosRepositoryGetter: Getter<TurnosRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Empleado, dataSource);
    this.departamentos = this.createHasManyRepositoryFactoryFor('departamentos', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
    this.turnos = this.createBelongsToAccessorFor('turnos', turnosRepositoryGetter,);
    this.registerInclusionResolver('turnos', this.turnos.inclusionResolver);
    this.vacaciones = this.createBelongsToAccessorFor('vacaciones', vacacionesRepositoryGetter,);
    this.registerInclusionResolver('vacaciones', this.vacaciones.inclusionResolver);
    this.marcar = this.createBelongsToAccessorFor('marcar', marcarRepositoryGetter,);
    this.registerInclusionResolver('marcar', this.marcar.inclusionResolver);
    this.permisoDia = this.createBelongsToAccessorFor('permisoDia', permisoDiaRepositoryGetter,);
    this.registerInclusionResolver('permisoDia', this.permisoDia.inclusionResolver);
    this.permisoHora = this.createBelongsToAccessorFor('permisoHora', permisoHoraRepositoryGetter,);
    this.registerInclusionResolver('permisoHora', this.permisoHora.inclusionResolver);
  }
}
