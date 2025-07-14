import { ApiProperty } from '@nestjs/swagger';

export class EncryptDtoSwagger {
  @ApiProperty({
    description: 'Payload to encrypt',
    example: 'Hello world',
    minLength: 1,
    maxLength: 2000,
  })
  payload: string;
}
