import { AnimatePresence, motion } from 'framer-motion';

const icon = {
	hidden: {
		pathLength: 0,
		fill: 'rgba(151, 151, 151, 0)',
		stroke: 'rgba(151, 151, 151, 0)',
	},
	visible: {
		pathLength: 1,
		fill: 'rgba(151, 151, 151, 1)',
		stroke: 'rgba(151, 151, 151, 1)',
	},
};

const transition = { duration: 1, yoyo: 0, ease: 'easeInOut' };

const AnimatedIconSuccess = ({ isActive }: { isActive: boolean }) => (
	<AnimatePresence presenceAffectsLayout={true} initial={true}>
		{isActive && (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width={160} height={160}>
				<motion.path
					fillRule="evenodd"
					transition={transition}
					initial="hidden"
					animate="visible"
					variants={icon}
					fill="none"
					style={{ fill: 'none', stroke: 'var(--primary)' }}
					strokeMiterlimit={10}
					d="M64,128a64,64,0,1,1,64-64A64.07,64.07,0,0,1,64,128ZM64,4a60,60,0,1,0,60,60A60.07,60.07,0,0,0,64,4Z"
				/>
				<motion.path
					fillRule="evenodd"
					transition={transition}
					initial="hidden"
					animate="visible"
					variants={icon}
					fill="none"
					style={{ fill: 'none', stroke: 'var(--primary)' }}
					d="M66.51,83a2,2,0,0,1-1.31-.49L63.41,81A2,2,0,1,1,66,78l.26.22L93.47,45.68a2,2,0,1,1,3.06,2.56L68.05,82.32a2,2,0,0,1-1.38.71Z"
				/>
				<motion.path
					fillRule="evenodd"
					transition={transition}
					initial="hidden"
					animate="visible"
					variants={icon}
					fill="none"
					style={{ fill: 'none', stroke: 'var(--primary)' }}
					d="M52.94,83a2,2,0,0,1-1.42-.59L31.59,62.52a2,2,0,0,1,2.82-2.83L52.8,78.08l27.09-32.4A2,2,0,0,1,83,48.24L54.47,82.32A2,2,0,0,1,53,83Z"
				/>
			</svg>
		)}
	</AnimatePresence>
);

export default AnimatedIconSuccess;
