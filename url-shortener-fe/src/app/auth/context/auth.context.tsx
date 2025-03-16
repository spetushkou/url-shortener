import { createContext } from 'react';
import { AuthContext as AuthContextType } from './types/auth.context.ts';

export const AuthContext = createContext({} as AuthContextType);
