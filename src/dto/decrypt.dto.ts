import { ApiProperty } from '@nestjs/swagger';

export class DecryptDtoSwagger {
  @ApiProperty({
    description: 'Encrypted AES key (base64)',
    example: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAn+u...',
  })
  data1: string;

  @ApiProperty({
    description: 'Encrypted payload',
    example: 'U2FsdGVkX19qjw1234567890==',
  })
  data2: string;
}
