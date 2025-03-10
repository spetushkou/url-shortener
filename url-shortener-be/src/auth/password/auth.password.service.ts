import bcrypt from 'bcryptjs';

const SALT_LENGTH = 10;

async function hash(passwordToHash: string): Promise<string> {
  return await bcrypt.hash(passwordToHash, SALT_LENGTH);
}

async function verify(givenPassword: string, expectedPassword: string): Promise<boolean> {
  return await bcrypt.compare(givenPassword, expectedPassword);
}

export const AuthPasswordService = {
  hash,
  verify,
};
