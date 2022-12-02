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
import {PermisoDia} from '../models';
import {PermisoDiaRepository} from '../repositories';

export class PermisoDiaController {
  constructor(
    @repository(PermisoDiaRepository)
    public permisoDiaRepository : PermisoDiaRepository,
  ) {}

  @post('/permiso-dias')
  @response(200, {
    description: 'PermisoDia model instance',
    content: {'application/json': {schema: getModelSchemaRef(PermisoDia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoDia, {
            title: 'NewPermisoDia',
            exclude: ['idEmpleado'],
          }),
        },
      },
    })
    permisoDia: Omit<PermisoDia, 'idEmpleado'>,
  ): Promise<PermisoDia> {
    return this.permisoDiaRepository.create(permisoDia);
  }

  @get('/permiso-dias/count')
  @response(200, {
    description: 'PermisoDia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PermisoDia) where?: Where<PermisoDia>,
  ): Promise<Count> {
    return this.permisoDiaRepository.count(where);
  }

  @get('/permiso-dias')
  @response(200, {
    description: 'Array of PermisoDia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PermisoDia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PermisoDia) filter?: Filter<PermisoDia>,
  ): Promise<PermisoDia[]> {
    return this.permisoDiaRepository.find(filter);
  }

  @patch('/permiso-dias')
  @response(200, {
    description: 'PermisoDia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoDia, {partial: true}),
        },
      },
    })
    permisoDia: PermisoDia,
    @param.where(PermisoDia) where?: Where<PermisoDia>,
  ): Promise<Count> {
    return this.permisoDiaRepository.updateAll(permisoDia, where);
  }

  @get('/permiso-dias/{id}')
  @response(200, {
    description: 'PermisoDia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PermisoDia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PermisoDia, {exclude: 'where'}) filter?: FilterExcludingWhere<PermisoDia>
  ): Promise<PermisoDia> {
    return this.permisoDiaRepository.findById(id, filter);
  }

  @patch('/permiso-dias/{id}')
  @response(204, {
    description: 'PermisoDia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisoDia, {partial: true}),
        },
      },
    })
    permisoDia: PermisoDia,
  ): Promise<void> {
    await this.permisoDiaRepository.updateById(id, permisoDia);
  }

  @put('/permiso-dias/{id}')
  @response(204, {
    description: 'PermisoDia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() permisoDia: PermisoDia,
  ): Promise<void> {
    await this.permisoDiaRepository.replaceById(id, permisoDia);
  }

  @del('/permiso-dias/{id}')
  @response(204, {
    description: 'PermisoDia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.permisoDiaRepository.deleteById(id);
  }
}
