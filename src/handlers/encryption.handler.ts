import { Injectable } from '@nestjs/common';
import { DecryptResponse, EncryptResponse } from 'src/dto';
import {
  DecryptDto,
  decryptSchema,
  EncryptDto,
  encryptSchema,
} from 'src/schema';

import { CryptoService } from '../crypto/crypto.service';
import { ValidationHelper } from '../helpers/';

@Injectable()
export class EncryptionHandler {
  constructor(private cryptoService: CryptoService) {}

  encrypt(body: EncryptDto): EncryptResponse {
    console.log('Encrypting data:', body);
    const { payload } = ValidationHelper.parseOrThrow(encryptSchema, body);
    console.log('Parsed payload:', payload);
    const aesKey = this.cryptoService.generateAesKey();
    const encryptedPayload = this.cryptoService.encryptAes(payload, aesKey);
    const encryptedAesKey = this.cryptoService.publicKeyEncrypt(
      aesKey.toString('base64'),
    );

    return {
      successful: true,
      error_code: '',
      data: {
        data1: encryptedAesKey,
        data2: encryptedPayload,
      },
    };
  }

  decrypt(body: DecryptDto): DecryptResponse {
    const { data1, data2 } = ValidationHelper.parseOrThrow(decryptSchema, body);

    const aesKeyBase64 = this.cryptoService.privateKeyDecrypt(data1);
    const aesKey = Buffer.from(aesKeyBase64, 'base64');
    const decrypted = this.cryptoService.decryptAes(data2, aesKey);

    return {
      successful: true,
      error_code: '',
      data: {
        payload: decrypted,
      },
    };
  }
}
