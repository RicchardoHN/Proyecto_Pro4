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
import {Marcar} from '../models';
import {MarcarRepository} from '../repositories';

export class MarcarController {
  constructor(
    @repository(MarcarRepository)
    public marcarRepository : MarcarRepository,
  ) {}

  @post('/marcars')
  @response(200, {
    description: 'Marcar model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marcar)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcar, {
            title: 'NewMarcar',
            exclude: ['idEmpleado'],
          }),
        },
      },
    })
    marcar: Omit<Marcar, 'idEmpleado'>,
  ): Promise<Marcar> {
    return this.marcarRepository.create(marcar);
  }

  @get('/marcars/count')
  @response(200, {
    description: 'Marcar model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Marcar) where?: Where<Marcar>,
  ): Promise<Count> {
    return this.marcarRepository.count(where);
  }

  @get('/marcars')
  @response(200, {
    description: 'Array of Marcar model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marcar, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Marcar) filter?: Filter<Marcar>,
  ): Promise<Marcar[]> {
    return this.marcarRepository.find(filter);
  }

  @patch('/marcars')
  @response(200, {
    description: 'Marcar PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcar, {partial: true}),
        },
      },
    })
    marcar: Marcar,
    @param.where(Marcar) where?: Where<Marcar>,
  ): Promise<Count> {
    return this.marcarRepository.updateAll(marcar, where);
  }

  @get('/marcars/{id}')
  @response(200, {
    description: 'Marcar model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marcar, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Marcar, {exclude: 'where'}) filter?: FilterExcludingWhere<Marcar>
  ): Promise<Marcar> {
    return this.marcarRepository.findById(id, filter);
  }

  @patch('/marcars/{id}')
  @response(204, {
    description: 'Marcar PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marcar, {partial: true}),
        },
      },
    })
    marcar: Marcar,
  ): Promise<void> {
    await this.marcarRepository.updateById(id, marcar);
  }

  @put('/marcars/{id}')
  @response(204, {
    description: 'Marcar PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() marcar: Marcar,
  ): Promise<void> {
    await this.marcarRepository.replaceById(id, marcar);
  }

  @del('/marcars/{id}')
  @response(204, {
    description: 'Marcar DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.marcarRepository.deleteById(id);
  }
}
