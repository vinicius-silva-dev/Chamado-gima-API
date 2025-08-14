import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema  } from 'zod';
import { fromZodError } from 'zod-validation-error';

// Essa class pegamos da documentação do Nestjs, aqui vamos fazer a validação do zod. Quando essa class é chamada, vamos passar o schama do zod e o método transform vai fazer o parse do schama que passamos. No final das contas, essa class vira um decorator, o controller que vai ter validação no zod, vai colocar o dacorator @UsePipes(new ZodValidationPipe(schemaZod)).

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {

      if(error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          statusCode: 400,
          error: fromZodError(error)
        });
      }

      throw new BadRequestException('Validation failed');
    }
  }
}