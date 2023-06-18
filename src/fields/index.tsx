import React from 'react';
import {FieldState, FieldStateContext, Validator} from '../index';

export * from './text';

export interface FieldProps<T = never, V = Validator<T>> {
	children: React.ReactNode,
	value?: T,
	validator?: V,
}

export function Field<T = undefined>({value, children, validator}: FieldProps<T>): React.ReactElement {
	const [fieldState, setFieldState] = React.useContext(FieldStateContext);

	React.useEffect(() => {
		if (!FieldState.isValidateRequested(fieldState))
			return;

		// NOTE Typescript doesn't naturally recognize `value` as a `T` because it's an optional prop /tyler
		setFieldState(validator?.(value as T) ?? FieldState.valid());
	}, [fieldState]);

	return <>{children}</>;
}
