import { Children, ReactNode } from 'react';
import FlexBox, { IFlexBox } from './FlexBox';


const Card = ({ children, card, header, footer }: { children: ReactNode; card?: IFlexBox; header?: IFlexBox; footer?: IFlexBox }) => {
	const childs = Children.toArray(children) as React.ReactElement[];

	let eleHeader;
	let eleBody = [];
	let eleFooter;

	for (let i = 0; i < childs.length; i++) {
		const child = childs[i];
		if (child.type === 'header') {
			eleHeader = child;
		} else if (child.type === 'footer') {
			eleFooter = child;
		} else {
			if (child?.props.children) {
				eleBody.push(child?.props.children);
			}
		}
	}

	return (
		<FlexBox {...card} flexDirection={card?.flexDirection || 'column'} className={card?.className || 'panel'}>
			{eleHeader?.props.children ? (
				<FlexBox
					{...header}
					as="header"
					alignItems={header?.alignItems || 'center'}
					justifyContent={header?.justifyContent || 'space-between'}
					className={header?.className || 'panel-block'}
				>
					{eleHeader.props.children}
				</FlexBox>
			) : null}
			{eleBody?.length ? <>{eleBody}</> : null}
			{eleFooter?.props.children ? (
				<FlexBox
					{...footer}
					as="footer"
					alignItems={footer?.alignItems || 'center'}
					justifyContent={footer?.justifyContent || 'flex-end'}
					className={footer?.className || 'panel-block'}
				>
					{eleFooter.props.children}
				</FlexBox>
			) : null}
		</FlexBox>
	);
};

export default Card;
