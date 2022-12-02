import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PermisoHora} from '../models';
import {PermisoHoraRepository} from '../repositories';

export class PermisoHoraController {
  constructor(
    @repository(PermisoHoraRepository)
    public permisoHoraRepository : PermisoHoraRepository,
  ) {}

  @post('/permiso-horas')
  @response(200, {
    description: 'PermisoHora model instance',
    content: {'application/json': {schema: getModelSchemaRef(PermisoHora)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoHora, {
            title: 'NewPermisoHora',
            exclude: ['idEmpleado'],
          }),
        },
      },
    })
    permisoHora: Omit<PermisoHora, 'idEmpleado'>,
  ): Promise<PermisoHora> {
    return this.permisoHoraRepository.create(permisoHora);
  }

  @get('/permiso-horas/count')
  @response(200, {
    description: 'PermisoHora model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PermisoHora) where?: Where<PermisoHora>,
  ): Promise<Count> {
    return this.permisoHoraRepository.count(where);
  }

  @get('/permiso-horas')
  @response(200, {
    description: 'Array of PermisoHora model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PermisoHora, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PermisoHora) filter?: Filter<PermisoHora>,
  ): Promise<PermisoHora[]> {
    return this.permisoHoraRepository.find(filter);
  }

  @patch('/permiso-horas')
  @response(200, {
    description: 'PermisoHora PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoHora, {partial: true}),
        },
      },
    })
    permisoHora: PermisoHora,
    @param.where(PermisoHora) where?: Where<PermisoHora>,
  ): Promise<Count> {
    return this.permisoHoraRepository.updateAll(permisoHora, where);
  }

  @get('/permiso-horas/{id}')
  @response(200, {
    description: 'PermisoHora model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PermisoHora, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PermisoHora, {exclude: 'where'}) filter?: FilterExcludingWhere<PermisoHora>
  ): Promise<PermisoHora> {
    return this.permisoHoraRepository.findById(id, filter);
  }

  @patch('/permiso-horas/{id}')
  @response(204, {
    description: 'PermisoHora PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoHora, {partial: true}),
        },
      },
    })
    permisoHora: PermisoHora,
  ): Promise<void> {
    await this.permisoHoraRepository.updateById(id, permisoHora);
  }

  @put('/permiso-horas/{id}')
  @response(204, {
    description: 'PermisoHora PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() permisoHora: PermisoHora,
  ): Promise<void> {
    await this.permisoHoraRepository.replaceById(id, permisoHora);
  }

  @del('/permiso-horas/{id}')
  @response(204, {
    description: 'PermisoHora DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.permisoHoraRepository.deleteById(id);
  }
}
