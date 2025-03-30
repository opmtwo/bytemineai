import { ReactNode } from 'react';
import Card from '../cards/Card';
import CardTitle from '../CardTitle';
import Slot from '../Slot';

const EnrichHeader = ({ children, title, text, icon }: { children: ReactNode; title: string; text: string, icon: ReactNode; }) => {
	return (
		<Card>
			<Slot slot="body">
				<div className="panel-block is-block">
					<div className="is-flex is-align-items-center mr-a">
						<div className="is-relative icon is-large has-radius is-clipped" style={{ zIndex: 1 }}>
							<div className="is-overlay has-background-primary" style={{ zIndex: -1, opacity: 0.25 }}></div>
							{icon}
						</div>
						<CardTitle className="is-size-4 has-text-primary ml-5">{title}</CardTitle>
					</div>
					<p className="is-size-5 my-5">{text}</p>
					{children}
				</div>
			</Slot>
		</Card>
	);
};

export default EnrichHeader;
