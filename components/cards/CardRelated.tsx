import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import Anchor from '../Anchor';

const CardRelated = ({ children }: { children?: ReactNode }) => (
	<AnimatePresence>
		<motion.div layout="size" className="columns is-mobile is-centered has-text-centered is-size-7">
			<div className="column is-10-mobile is-9-tablet is-8-desktop">
				{children ? (
					children
				) : (
					<>
						By logging in you agree to our &nbsp;
						<Anchor href="https://www.nymblr.com/terms-and-conditions">Terms &amp; Conditions</Anchor>
						<span>&nbsp;and&nbsp;</span>
						<Anchor href="https://www.nymblr.com/privacy-policy">Privacy Policy</Anchor>
					</>
				)}
			</div>
		</motion.div>
	</AnimatePresence>
);

export default CardRelated;
