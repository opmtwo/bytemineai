import CardAnimatePresence from '../cards/CardAnimatePresence';

const ErrorNotificaition = ({ error, className = 'pt-6' }: { error?: Error; className?: string; }) => {
	return (
		<CardAnimatePresence isActive={error?.message !== undefined}>
			<div className={className}>
				<div className="notification is-danger is-size-6 px-5 py-3">
					{error?.message}
				</div>
			</div>
		</CardAnimatePresence>
	);
};

export default ErrorNotificaition;
