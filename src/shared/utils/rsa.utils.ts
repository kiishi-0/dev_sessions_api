import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

export class RsaUtil {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    const publicKeyPath = path.resolve(process.env.RSA_PUBLIC_KEY_PATH || '');
    const privateKeyPath = path.resolve(process.env.RSA_PRIVATE_KEY_PATH || '');

    if (!fs.existsSync(publicKeyPath) || !fs.existsSync(privateKeyPath)) {
      throw new Error('RSA key files not found. Check your .env paths.');
    }

    // this.publicKey = fs.readFileSync(publicKeyPath, 'utf8');
    // this.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
  }

  /**
   * Encrypt a string using the public key and return Base64
   */
  encrypt(data: string): string {
    const buffer = Buffer.from(data, 'utf8');
    const encrypted = crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );
    return encrypted.toString('base64');
  }

  /**
   * Decrypt a Base64 string using the private key
   */
  decrypt(base64Data: string): string {
    const buffer = Buffer.from(base64Data, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
      },
      buffer,
    );
    return decrypted.toString('utf8');
  }

  toBase64(data: string): string {
    return Buffer.from(data, 'utf-8').toString('base64');
  }

  fromBase64(encoded: string): string {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }
}
