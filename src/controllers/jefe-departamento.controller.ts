import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jefe,
  Departamento,
} from '../models';
import {JefeRepository} from '../repositories';

export class JefeDepartamentoController {
  constructor(
    @repository(JefeRepository)
    public jefeRepository: JefeRepository,
  ) { }

  @get('/jefes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Jefe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamento)},
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.string('id') id: typeof Jefe.prototype.idJefe,
  ): Promise<Departamento> {
    return this.jefeRepository.departamento(id);
  }
}
