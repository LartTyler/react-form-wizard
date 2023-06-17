import {createContext} from 'react';
import {noop} from '../common';

export type OnNextCallback = () => void;
export type OnBackCallback = () => void;

export interface ControlsContext {
	onNext: OnNextCallback,
	onBack: OnBackCallback,
}

export const ControlsContext = createContext<ControlsContext>({
	onNext: noop,
	onBack: noop,
});
