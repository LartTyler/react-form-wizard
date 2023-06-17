import classNames from 'classnames';
import React from 'react';
import {displayName} from './common';
import {FieldsContext} from './context';

interface Props {
	children: React.ReactNode;
}

function mapper(child: React.ReactNode, index: number, currentStep: number): React.ReactNode {
	return (
		<div key={index} className={classNames(currentStep === index && 'active')}>
			{child}
		</div>
	);
}

export const Fields: React.FC<Props> = ({children}) => {
	return (
		<FieldsContext.Consumer>
			{({currentStep}) => React.Children.map(children, (child, index) => mapper(child, index, currentStep))}
		</FieldsContext.Consumer>
	);
};

Fields.displayName = displayName('Fields');
