import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

/**
 * Verifies a JWT token and returns the decoded user payload.
 * Throws an AuthenticationError if the token is invalid or missing.
 */
export const authenticateToken = (token: string): JwtPayload => {
  if (!token) {
    throw new AuthenticationError('No token provided');
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    const user = jwt.verify(token, secretKey) as JwtPayload;
    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

/**
 * Signs a JWT token with the provided user data.
 */
export const signToken = (username: string, email: string, _id: unknown): string => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

/**
 * Custom GraphQL error for authentication failures.
 */
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}