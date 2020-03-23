import {
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Param,
  Body,
} from '@nestjs/common';

import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { IdeaDto } from './dto/idea.dto';

@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  @Get()
  async getAllIdeas(): Promise<IdeaEntity[]> {
    return await this.ideaService.getIdeas();
  }

  @Get(':id')
  async getIdea(@Param('id') id: string): Promise<IdeaDto> {
    return await this.ideaService.read(id);
  }

  @Post()
  async create(@Body() data: IdeaDto): Promise<IdeaEntity> {
    return await this.ideaService.createIdea(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: IdeaDto,
  ): Promise<IdeaEntity> {
    return await this.ideaService.updateIdea(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<object> {
    return await this.ideaService.delete(id);
  }
}
