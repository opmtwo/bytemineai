import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const transition = { duration: 0.25, yoyo: 0, ease: 'easeInOut' };

const CardAnimatePresence = ({ children, isActive }: { children?: ReactNode; isActive: boolean }) => (
	<AnimatePresence exitBeforeEnter={true}>
		{isActive && (
			<motion.div
				layout="position"
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: 'auto', opacity: 1, visibility: 'visible' }}
				exit={{ height: 0, opacity: 0, visibility: 'hidden' }}
				transition={transition}
			>
				<motion.div layout="position">{children}</motion.div>
			</motion.div>
		)}
	</AnimatePresence>
);

export default CardAnimatePresence;
