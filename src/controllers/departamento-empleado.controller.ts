import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Departamento,
  Empleado,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoEmpleadoController {
  constructor(
    @repository(DepartamentoRepository)
    public departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Departamento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Departamento.prototype.idJefe,
  ): Promise<Empleado> {
    return this.departamentoRepository.empleado(id);
  }
}
