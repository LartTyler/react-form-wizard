import {InvalidFieldState, ValidFieldState} from './context';

export * from './context';

// TODO Controls need a way to know if they're in the `Ready` state or not /tyler
export * from './controls';
export * from './errors';

// TODO Fields need a way to transition from `NotReady` to `Ready` /tyler
// TODO Add components for other common field types /tyler
export * from './fields';
export * from './form';
export * from './fields/index';

export type Validator<T> = (value: T) => ValidFieldState | InvalidFieldState;
