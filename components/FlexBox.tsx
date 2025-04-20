import React from 'react';

export interface IFlexBox extends React.HTMLAttributes<HTMLElement> {
	as?: 'div' | 'span' | 'header' | 'footer' | 'nav' | 'article' | 'section' | 'label' | 'ul' | 'ol' | 'li';
	alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
	justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
	flex?: string | number;
	flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
	alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
	alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

const FlexBox = ({ as = 'div', children, alignItems, justifyContent, flexDirection, flexWrap, alignContent, alignSelf, flex, ...rest }: IFlexBox) => {
	const Element = as;

	return (
		<Element
			{...rest}
			style={{
				...rest.style,
				display: 'flex',
				alignItems: alignItems ?? undefined,
				justifyContent: justifyContent ?? undefined,
				flex: flex,
				flexDirection: flexDirection ?? undefined,
				flexWrap: flexWrap ?? undefined,
				alignContent: alignContent ?? undefined,
				alignSelf: alignSelf ?? undefined,
			}}
		>
			{children}
		</Element>
	);
};

export default FlexBox;
