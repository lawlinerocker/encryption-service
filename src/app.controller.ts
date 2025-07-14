import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import {
  decryptBodyExample,
  DecryptFailureResponse,
  DecryptSuccessResponse,
  encryptBodyExample,
  EncryptFailureResponse,
  EncryptSuccessResponse,
} from './docs';
import {
  DecryptDtoSwagger,
  DecryptResponse,
  EncryptDtoSwagger,
  EncryptResponse,
} from './dto';
import { EncryptionHandler } from './handlers/encryption.handler';
import { ApiKeyGuard } from './helpers';
import { DecryptDto, EncryptDto } from './schema';

@ApiTags('Encryption API')
@ApiSecurity('x-api-key')
@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly handler: EncryptionHandler) {}
  @Post('/get-encrypt-data')
  @ApiOperation({ summary: 'Encrypt data with AES and RSA' })
  @ApiBody({
    type: EncryptDtoSwagger,
    required: true,
    examples: {
      example: encryptBodyExample.example,
    },
  })
  @ApiResponse(EncryptSuccessResponse)
  @ApiResponse(EncryptFailureResponse)
  encrypt(@Body() body: EncryptDto): EncryptResponse {
    try {
      return this.handler.encrypt(body);
    } catch (err) {
      console.error('Encryption error:', err);
      return {
        successful: false,
        error_code: err instanceof Error ? err.message : String(err),
        data: null,
      };
    }
  }
  @Post('/get-decrypt-data')
  @ApiOperation({ summary: 'Decrypt data with RSA and AES' })
  @ApiBody({
    type: DecryptDtoSwagger,
    required: true,
    examples: {
      example: decryptBodyExample.example,
    },
  })
  @ApiResponse(DecryptSuccessResponse)
  @ApiResponse(DecryptFailureResponse)
  decrypt(@Body() body: DecryptDto): DecryptResponse {
    try {
      console.log('Decrypting data:', body);
      return this.handler.decrypt(body);
    } catch (err) {
      console.error('Decryption error:', err);
      return {
        successful: false,
        error_code: err instanceof Error ? err.message : String(err),
        data: null,
      };
    }
  }
}
