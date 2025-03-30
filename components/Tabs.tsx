import { MouseEventHandler } from 'react';

const Tabs = ({ options, activeId, onClick }: { options: any; activeId: string; onClick: (id: string) => void }) => {
	return (
		<div className="tabs is-fullwidth">
			<ul>
				{Object.entries(options).map((type: [string, string]) => {
					const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
						e.preventDefault();
						onClick(type[1]);
					};
					return (
						<li key={type[0]} className={activeId === type[1] ? 'is-active' : ''}>
							<a  onClick={handleClick} className="py-4 has-text-weight-bold">
								<small>
									{type[1]}
								</small>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Tabs;
