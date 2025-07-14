import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private configService: ConfigService) {
    this.privateKey = this.configService.get<string>('PRIVATE_KEY') || '';
    this.publicKey = this.configService.get<string>('PUBLIC_KEY') || '';
  }

  generateAesKey(): Buffer {
    return crypto.randomBytes(32);
  }

  encryptAes(payload: string, key: Buffer): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return iv.toString('base64') + ':' + encrypted;
  }

  decryptAes(encryptedData: string, key: Buffer): string {
    const [ivB64, encryptedB64] = encryptedData.split(':');
    const iv = Buffer.from(ivB64, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedB64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  publicKeyEncrypt = (data: string): string =>
    crypto
      .publicEncrypt(
        {
          key: this.publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(data, 'utf8'),
      )
      .toString('base64');

  privateKeyDecrypt = (encryptedB64: string): string =>
    crypto
      .privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        },
        Buffer.from(encryptedB64, 'base64'),
      )
      .toString('utf8');
}
