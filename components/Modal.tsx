import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect } from 'react';

const variants = {
	hidden: {
		y: '-100vh',
		opacity: 0,
	},
	visible: {
		y: '0',
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 75,
			stiffness: 500,
		},
	},
	exit: {
		y: '-100vh',
		opacity: 0,
		type: 'spring',
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 75,
			stiffness: 500,
		},
	},
};

const Modal = ({
	children,
	isActive = false,
	hasOverlay = true,
	isOverlayClickable = true,
	onCancel,
}: {
	children: ReactNode;
	isActive: boolean;
	hasOverlay?: boolean;
	isOverlayClickable?: boolean;
	onCancel: Function;
}) => {
	const handleCancel = (e: MouseEvent) => onCancel() && onCancel();

	const onEscpae = (evt: any) => evt.key === 'Escape' && onCancel() && onCancel();

	useEffect(() => {
		window.addEventListener('keyup', onEscpae);
		return () => {
			window.removeEventListener('keyup', onEscpae);
		};
	}, []);

	return (
		<AnimatePresence initial={false} mode="sync" onExitComplete={() => null}>
			{isActive && (
				<motion.div
					layout
					className={classNames('modal', { 'is-active': isActive })}
					initial={{ opacity: 0, visibility: 'hidden' }}
					animate={{ opacity: 1, visibility: 'visible' }}
					exit={{ opacity: 0, visibility: 'hidden', transition: { delay: 0.25 } }}
				>
					{hasOverlay ? <motion.div layout="size" className="modal-background" onClick={isOverlayClickable ? handleCancel : undefined} /> : null}
					<motion.div
						layout
						className="modal-card is-flex-grow-1 is-justify-content-center p-5"
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div
							className="modal-background has-background-transparent"
							onClick={isOverlayClickable ? handleCancel : undefined}
							style={{ zIndex: -1 }}
						/>
						<div className="modal-content is-fullwidth" style={{ margin: 'auto' }}>
							{children}
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
