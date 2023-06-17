import React from 'react';
import {displayName} from './common';
import {ErrorContext} from './context/error';

interface Props {
	children: (message: string) => React.ReactNode;
}

export const Errors: React.FC<Props> = ({children}) => (
	<ErrorContext.Consumer>
		{({message}) => message && message.length > 0 && children(message)}
	</ErrorContext.Consumer>
);

Errors.displayName = displayName('Errors');
