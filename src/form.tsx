import React from 'react';
import {displayName} from './common';
import {ControlsContext} from './context/controls';
import {ErrorContext} from './context/error';
import {FieldState} from './context/field-state';
import {FieldsContext} from './context/fields';

interface Props {
	children: React.ReactNode,
	onSubmit?: () => void,
	action?: string,
	method?: string,
}

export const Form: React.FC<Props> = ({children, onSubmit, ...formProps}) => {
	const fieldStateValue = React.useState<FieldState>(FieldState.notReady());
	const [fieldState, setFieldState] = fieldStateValue;

	const errorsContextValue = React.useMemo(() => {
		if (FieldState.isInvalid(fieldState))
			return {message: fieldState.message};
		else
			return {};
	}, [fieldState]);

	const [step, setStep] = React.useState(0);
	const childCount = React.useMemo(() => React.Children.count(children), [children]);

	const fieldsContextValue: FieldsContext = React.useMemo(() => ({
		currentStep: step,
		maxSteps: childCount - 1,
	}), [step, childCount]);

	const onNext = React.useCallback(() => {
		if (!FieldState.isReady(fieldState))
			return;

		setFieldState(FieldState.validate());
	}, []);

	const onBack = React.useCallback(() => {
		setStep(step => Math.max(0, step - 1));
	}, []);

	const controlsContextValue: ControlsContext = React.useMemo(() => ({
		onNext,
		onBack,
	}), [onNext, onBack]);

	// Handles the current field transitioning into the `Valid` state, indicating that the form should proceed to
	// the next field in the set.
	React.useEffect(() => {
		if (!FieldState.isValid(fieldState))
			return;

		setStep(step => Math.min(step + 1, childCount - 1));
	}, [fieldState, childCount]);

	// Handles firing the `onSubmit` callback after the final field in the set transitions into the `Valid` state.
	React.useEffect(() => {
		if (step >= childCount && FieldState.isValid(fieldState))
			onSubmit?.();
	}, [step, childCount, fieldState, onSubmit]);

	return (
		<form {...formProps}>
			<FieldsContext.Provider value={fieldsContextValue}>
				<ErrorContext.Provider value={errorsContextValue}>
					<ControlsContext.Provider value={controlsContextValue}>
						{children}
					</ControlsContext.Provider>
				</ErrorContext.Provider>
			</FieldsContext.Provider>
		</form>
	);
};

Form.displayName = displayName('Form');
