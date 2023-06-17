import React, {createContext} from 'react';
import {noop} from '../common';

export interface InactiveFieldState {
	readonly kind: 'inactive',
}

export interface NotReadyFieldState {
	readonly kind: 'not-ready',
}

export interface ReadyFieldState {
	readonly kind: 'ready',
}

export interface ValidateRequestedFieldState {
	readonly kind: 'validate',
}

export interface ValidFieldState {
	readonly kind: 'valid',
}

export interface InvalidFieldState {
	readonly kind: 'invalid',
	readonly message: string,
}

export namespace FieldState {
	class InactiveFieldState implements InactiveFieldState {
		public readonly kind = 'inactive';
		public static readonly Instance = new this();
	}

	export function inactive(): InactiveFieldState {
		return InactiveFieldState.Instance;
	}

	export function isInactive(state: FieldState): state is InactiveFieldState {
		return state === InactiveFieldState.Instance;
	}

	class NotReadyFieldState implements NotReadyFieldState {
		public readonly kind = 'not-ready';
		public static readonly Instance = new this();
	}

	export function notReady(): NotReadyFieldState {
		return NotReadyFieldState.Instance;
	}

	export function isNotReady(state: FieldState): state is NotReadyFieldState {
		return state === NotReadyFieldState.Instance;
	}

	class ReadyFieldState implements ReadyFieldState {
		public readonly kind = 'ready';
		public static readonly Instance = new this();
	}

	export function ready(): ReadyFieldState {
		return ReadyFieldState.Instance;
	}

	export function isReady(state: FieldState): state is ReadyFieldState {
		return state === ReadyFieldState.Instance;
	}

	class ValidateRequestedFieldState implements ValidateRequestedFieldState {
		public readonly kind = 'validate';
		public static readonly Instance = new this();
	}

	export function validate(): ValidateRequestedFieldState {
		return ValidateRequestedFieldState.Instance;
	}

	export function isValidateRequested(state: FieldState): state is ValidateRequestedFieldState {
		return state === ValidateRequestedFieldState.Instance;
	}

	class ValidFieldState implements ValidFieldState {
		public readonly kind = 'valid';
		public static readonly Instance = new this();
	}

	export function valid(): ValidFieldState {
		return ValidFieldState.Instance;
	}

	export function isValid(state: FieldState): state is ValidFieldState {
		return state === ValidFieldState.Instance;
	}

	class InvalidFieldState implements InvalidFieldState {
		public readonly kind = 'invalid';

		public constructor(public readonly message: string) {
		}
	}

	export function invalid(message: string): InvalidFieldState {
		return new InvalidFieldState(message);
	}

	export function isInvalid(state: FieldState): state is InvalidFieldState {
		return state instanceof InvalidFieldState;
	}
}

export type FieldState =
	InactiveFieldState
	| NotReadyFieldState
	| ReadyFieldState
	| ValidateRequestedFieldState
	| ValidFieldState
	| InvalidFieldState;

type FieldStateContextType = [FieldState, React.Dispatch<React.SetStateAction<FieldState>>];
export const FieldStateContext = createContext<FieldStateContextType>([
	FieldState.inactive(),
	noop,
]);
