# NestJS Encryption Service

A NestJS-based encryption service providing AES and RSA encryption/decryption APIs.

---

## Prerequisites

- Node.js (v16+ recommended)  
- npm or pnpm package manager  
- OpenSSL (for generating RSA key pairs) 
 

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nestjs-encryption-service.git
   cd nestjs-encryption-service
   ```
  
2. **Install dependencies**
   ```bash 
   pnpm i
   ```
3. **Create a .env File**
   <br>Copy the .env.sample to .env:
   ```bash
   cp .env.sample .env
   ```
   Fill in the required variables:

   ```ini
   PORT=3000
   MODE=local
   PRIVATE_KEY=(will be auto-injected from file)
   PUBLIC_KEY=(will be auto-injected from file)
   X_API_KEY=your-generated-api-key
   ```

4. **Generate RSA key pairs (.pem files)**
   <br>Run this command once to generate the keys:
   ```bash
   openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out src/keys/private.pem && openssl pkey -in src/keys/private.pem -pubout -out src/keys/public.pem
   ```
   This creates:
   ```
   * src/keys/private.pem

   * src/keys/public.pem
   ```

5. **Generate an X_API_KEY**
   ```bash
   openssl rand -hex 32
   ```

   Then paste it into your .env file under X_API_KEY.
   * This API key must be sent as a header for all Swagger or client requests<br><br>




6. **Build the project**

   For Linux/macOS:
   ```bash
   npm run build
   ```
   For Window:
   ```bash
   npm run build:win
   ```
7. **Run the service**
   Development mode (with watch):
   ```bash
   npm run start:dev
   ```
   Production mode:
   ```bash
   npm run start:dev
   ```
8. Run all tests:
   ```bash
   npm test
   ```


