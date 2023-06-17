import React from 'react';
import {displayName} from './common';
import {ControlsContext, OnBackCallback, OnNextCallback} from './context/controls';

interface Props {
	children: (onNext: OnNextCallback, onBack: OnBackCallback) => React.ReactNode,
}

export const Controls: React.FC<Props> = ({children}) => (
	<ControlsContext.Consumer>
		{({onNext, onBack}) => children(onNext, onBack)}
	</ControlsContext.Consumer>
);

Controls.displayName = displayName('Controls');
