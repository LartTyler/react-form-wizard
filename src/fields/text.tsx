import React from 'react';
import {displayName} from '../common';
import {Field, FieldProps, Validator} from '../index';

export type InputChangeEventCallback = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type RenderCallback = (onChange: InputChangeEventCallback) => React.ReactNode;

export type TextFieldChangeCallback = (newValue: string) => void;

export type TextFieldValidator = Validator<string>;

interface Props extends FieldProps<string> {
	children: RenderCallback;

	// TODO What if `onChange()` was used to switch between `NotReady` and `Ready`? Instead of returning `void`, we
	//  have the callback return `NotReadyFieldState` or `ReadyFieldState`. Hell, we could even toss
	//  `ValidFieldState` and `InvalidFieldState` in there, for inputs where validation is trivial or the field is
	//  considered "complete" simply by virtue of being ready. /tyler
	onChange?: TextFieldChangeCallback,
}

export const TextField: React.FC<Props> = ({value, onChange, validator, children}) => {
	const onFieldChange = React.useCallback<InputChangeEventCallback>(event => {
		onChange?.(event.currentTarget.value);
	}, [onChange]);

	return (
		<Field<string> value={value} validator={validator}>
			{children(onFieldChange)}
		</Field>
	);
};

TextField.displayName = displayName('TextField');
