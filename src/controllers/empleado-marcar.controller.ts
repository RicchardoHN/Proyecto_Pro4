import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Marcar,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoMarcarController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/marcar', {
    responses: {
      '200': {
        description: 'Marcar belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marcar)},
          },
        },
      },
    },
  })
  async getMarcar(
    @param.path.string('id') id: typeof Empleado.prototype.idEmpleado,
  ): Promise<Marcar> {
    return this.empleadoRepository.marcar(id);
  }
}
