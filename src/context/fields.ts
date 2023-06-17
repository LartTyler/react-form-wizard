import {createContext} from 'react';

export interface FieldsContext {
	currentStep: number,
	maxSteps: number,
}

export const FieldsContext = createContext<FieldsContext>({
	currentStep: 0,
	maxSteps: 0,
});
