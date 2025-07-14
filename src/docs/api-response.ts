import { ApiResponseOptions } from '@nestjs/swagger';

export const EncryptSuccessResponse: ApiResponseOptions = {
  status: 201,
  description: 'Encryption successful',
  schema: {
    example: {
      successful: true,
      error_code: '',
      data: {
        data1: 'Encrypted AES key string',
        data2: 'Encrypted payload string',
      },
    },
  },
};

export const EncryptFailureResponse: ApiResponseOptions = {
  status: 400,
  description: 'Validation error or encryption failure',
  schema: {
    example: {
      successful: false,
      error_code: 'Validation failed: ...',
      data: null,
    },
  },
};

export const DecryptSuccessResponse: ApiResponseOptions = {
  status: 201,
  description: 'Decryption successful',
  schema: {
    example: {
      successful: true,
      error_code: '',
      data: {
        payload: 'Decrypted original payload string',
      },
    },
  },
};

export const DecryptFailureResponse: ApiResponseOptions = {
  status: 400,
  description: 'Validation error or decryption failure',
  schema: {
    example: {
      successful: false,
      error_code: 'Validation failed: ...',
      data: null,
    },
  },
};
