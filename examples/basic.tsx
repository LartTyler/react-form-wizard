import {
	Controls,
	Errors,
	Field,
	Fields,
	FieldState,
	FieldStateContext,
	Form,
	TextField,
	TextFieldChangeCallback,
	TextFieldValidator,
} from '@dbstudios/react-form-tool';
import React from 'react';

// noinspection JSUnusedGlobalSymbols
export const BasicExample: React.FC = () => {
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');

	const [birthMonth, setBirthMonth] = React.useState('');
	const [birthDay, setBirthDay] = React.useState('');
	const [birthYear, setBirthYear] = React.useState('');

	const onDateOfBirthChange = React.useCallback((month: string, day: string, year: string) => {
		setBirthMonth(month);
		setBirthDay(day);
		setBirthYear(year);
	}, []);

	return (
		<Form action="https://example.com" method="get">
			<input type="hidden" name="some_hidden_value" value="42" />

			<Fields>
				<NamePartField name="firstName" value={firstName} onChange={setFirstName} />
				<NamePartField name="lastName" value={lastName} onChange={setLastName} />
				<DateOfBirthField month={birthMonth} day={birthDay} year={birthYear} onChange={onDateOfBirthChange} />
			</Fields>

			<Errors>
				{message => (
					<p style={{color: 'red'}}>
						<strong>Error</strong>: <em>{message}</em>
					</p>
				)}
			</Errors>

			<Controls>
				{(onNext, onBack) => (
					<>
						<button type="button" onClick={onNext}>Next</button>
						<button type="button" onClick={onBack}>Back</button>
					</>
				)}
			</Controls>
		</Form>
	);
};

interface NamePartFieldProps {
	name: string,
	value: string,
	onChange: TextFieldChangeCallback,
}

function NamePartField({value, name, onChange}: NamePartFieldProps): React.ReactElement {
	const onValidate = React.useCallback<TextFieldValidator>(value => {
		if (value.length > 1)
			return FieldState.valid();
		else
			return FieldState.invalid('Please enter at least one character.');
	}, []);

	return (
		<TextField value={value} validator={onValidate} onChange={onChange}>
			{onChange => (
				<label>
					Enter your name:
					<input type="text" name={name} value={value} onChange={onChange} />
				</label>
			)}
		</TextField>
	);
}

type SelectChangeEvent = (event: React.ChangeEvent<HTMLSelectElement>) => void;

interface DateOfBirthFieldProps {
	month: string,
	day: string,
	year: string,
	onChange: (month: string, day: string, year: string) => void,
}

function DateOfBirthField({month, day, year, onChange}: DateOfBirthFieldProps): React.ReactElement {
	const [fieldState, _] = React.useContext(FieldStateContext);

	const onMonthChange = React.useCallback<SelectChangeEvent>(event => {
		onChange(event.currentTarget.value, day, year);
	}, [day, year]);

	const onDayChange = React.useCallback<SelectChangeEvent>(event => {
		onChange(month, event.currentTarget.value, year);
	}, [month, year]);

	const onYearChange = React.useCallback<SelectChangeEvent>(event => {
		onChange(month, day, event.currentTarget.value);
	}, [month, day]);

	// As a relatively minor optimization, callbacks that are known to trigger only after field state transitions can
	// use the value of `FieldStateContext` as their dependency instead of the fields they actually depend on. Since
	// React will always trigger a re-render when the field state changes, you're guaranteed to rebuild the callback
	// before the validation is actually executed.
	//
	// This also applies to any other hook that uses a dependency system, such as `useMemo()` and `useEffect()`.
	const onValidate = React.useCallback(() => {
		if (month.length > 0 && day.length > 0 && year.length > 0)
			return FieldState.valid();
		else
			return FieldState.invalid('Please enter your full date of birth.');
	}, [fieldState]);

	const days = React.useMemo(() => {
		const items = [];

		for (const day of range(1, 31))
			items.push(<option key={day} value={`${day}`}>{day}</option>);

		return items;
	}, []);

	const years = React.useMemo(() => {
		const items = [];
		const currentYear = (new Date()).getFullYear();

		for (const year of range(currentYear, currentYear - 100))
			items.push(<option key={year} value={`${year}`}>{year}</option>);

		return items;
	}, []);

	return (
		<Field validator={onValidate}>
			<label>
				Birth month:
				<select name="birthMonth" value={month} onChange={onMonthChange}>
					<option value="">-- Month --</option>
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
			</label>

			<label>
				Birth day:
				<select name="birthDay" value={day} onChange={onDayChange}>
					<option value="">-- Day --</option>

					{days}
				</select>
			</label>

			<label>
				Birth year:
				<select name="birthYear" value={year} onChange={onYearChange}>
					<option value="">-- Year --</option>

					{years}
				</select>
			</label>
		</Field>
	);
}

function* range(start: number, end: number, step: number = 1): Generator<number> {
	if (start > end && step > 0 || start < end && step < 0)
		step *= -1;

	for (let i = start; i <= end; i += step)
		yield i;
}
