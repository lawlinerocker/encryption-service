import { generateKeyPairSync } from 'crypto';
import { CryptoService } from './crypto/crypto.service';

describe('CryptoService dynamic key generation with logs', () => {
  let cryptoService: CryptoService;

  beforeAll(() => {
    console.log('Generating RSA key pair...');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });
    console.log(
      'Private key generated (start):',
      privateKey.slice(0, 40).replace(/\n/g, '\\n') + '...',
    );
    console.log(
      'Public key generated (start):',
      publicKey.slice(0, 40).replace(/\n/g, '\\n') + '...',
    );

    const mockConfigService = {
      get: (key: string) => {
        if (key === 'PRIVATE_KEY') return privateKey;
        if (key === 'PUBLIC_KEY') return publicKey;
        return null;
      },
    };

    cryptoService = new CryptoService(mockConfigService as any);
    console.log('CryptoService initialized with generated keys.');
  });

  it('should load generated keys', () => {
    console.log('Checking if keys are loaded...');
    expect(cryptoService['privateKey']).toBeTruthy();
    expect(cryptoService['publicKey']).toBeTruthy();
    console.log(
      'Private Key snippet:',
      cryptoService['privateKey'].slice(0, 40).replace(/\n/g, '\\n') + '...',
    );
    console.log(
      'Public Key snippet:',
      cryptoService['publicKey'].slice(0, 40).replace(/\n/g, '\\n') + '...',
    );
  });

  it('should generate a 32-byte AES key', () => {
    const key = cryptoService.generateAesKey();
    console.log('Generated AES key (base64):', key.toString('base64'));
    expect(key).toBeInstanceOf(Buffer);
    expect(key.length).toBe(32);
  });

  it('should encrypt and decrypt AES payload correctly', () => {
    const key = cryptoService.generateAesKey();
    const payload = 'Hello AES encryption!';
    console.log('Original AES payload:', payload);

    const encrypted = cryptoService.encryptAes(payload, key);
    console.log('Encrypted AES payload:', encrypted);
    expect(typeof encrypted).toBe('string');
    expect(encrypted).toContain(':');

    const decrypted = cryptoService.decryptAes(encrypted, key);
    console.log('Decrypted AES payload:', decrypted);
    expect(decrypted).toBe(payload);
  });

  it('should encrypt and decrypt data using RSA keys', () => {
    const text = 'Hello RSA!';
    console.log('Original RSA text:', text);

    const encrypted = cryptoService.publicKeyEncrypt(text);
    console.log('Encrypted RSA text (base64):', encrypted);
    expect(typeof encrypted).toBe('string');

    const decrypted = cryptoService.privateKeyDecrypt(encrypted);
    console.log('Decrypted RSA text:', decrypted);
    expect(decrypted).toBe(text);
  });

  it('should throw error when decrypting invalid RSA ciphertext', () => {
    const invalidCiphertext = 'invalid-base64==';
    console.log(
      'Attempting to decrypt invalid RSA ciphertext:',
      invalidCiphertext,
    );
    expect(() => cryptoService.privateKeyDecrypt(invalidCiphertext)).toThrow();
    console.log('Correctly threw error on invalid RSA ciphertext.');
  });

  it('should throw error when encrypting invalid input (null)', () => {
    console.log('Attempting to encrypt null input...');
    expect(() =>
      cryptoService.publicKeyEncrypt(null as unknown as string),
    ).toThrow();
    console.log('Correctly threw error on null input.');
  });

  it('should throw error when decrypting malformed AES encrypted data', () => {
    const badEncryptedData = 'not-a-valid-encrypted-string';
    const key = cryptoService.generateAesKey();
    console.log('Attempting to decrypt malformed AES data:', badEncryptedData);
    expect(() => cryptoService.decryptAes(badEncryptedData, key)).toThrow();
    console.log('Correctly threw error on malformed AES data.');
  });

  it('should encrypt and decrypt empty string with AES correctly', () => {
    const key = cryptoService.generateAesKey();
    const payload = '';
    console.log('Original empty AES payload:', `"${payload}"`);

    const encrypted = cryptoService.encryptAes(payload, key);
    console.log('Encrypted empty AES payload:', encrypted);

    const decrypted = cryptoService.decryptAes(encrypted, key);
    console.log('Decrypted empty AES payload:', `"${decrypted}"`);

    expect(decrypted).toBe(payload);
  });
});
