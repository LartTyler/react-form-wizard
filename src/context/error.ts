import {createContext} from 'react';

export interface ErrorContext {
	message?: string,
}

export const ErrorContext = createContext<ErrorContext>({});
