import { ApiProperty } from '@nestjs/swagger';

export class DecryptResponseDto {
  @ApiProperty({ example: true })
  successful: boolean;

  @ApiProperty({ example: '' })
  error_code: string;

  @ApiProperty({
    example: {
      payload: 'Decrypted data string',
    },
  })
  data: {
    payload: string;
  } | null;
}

export interface DecryptSuccessResponse {
  successful: true;
  error_code: '';
  data: {
    payload: string;
  };
}
export interface DecryptFailureResponse {
  successful: false;
  error_code: string;
  data: null;
}

export type DecryptResponse = DecryptSuccessResponse | DecryptFailureResponse;
