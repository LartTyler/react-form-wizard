import React from 'react';
import {FieldState, FieldStateContext, Validator} from '../index';

export * from './text';

export interface FieldProps<T = never, V = Validator<T>> {
	value?: T,
	children: React.ReactNode,
	validator?: V,
}

export function Field<T = never>({value, children, validator}: FieldProps<T>): React.ReactElement {
	const [fieldState, setFieldState] = React.useContext(FieldStateContext);

	React.useEffect(() => {
		if (!FieldState.isValidateRequested(fieldState))
			return;

		setFieldState(validator?.(value) ?? FieldState.valid());
	}, [fieldState]);

	return <>{children}</>;
}
