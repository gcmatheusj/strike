import { compare, hash } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
