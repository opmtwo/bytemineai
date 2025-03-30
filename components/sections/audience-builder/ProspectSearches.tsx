import { sortBy } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { FilterModel } from '../../../types';
import Card from '../../cards/Card';
import CardAnimatePresence from '../../cards/CardAnimatePresence';
import CardTitle from '../../CardTitle';
import EmptyMsg from '../../EmptyMsg';
import IconRocket from '../../icons/IconRocket';
import Loader from '../../Loader';
import SearchEntry from '../../SearchEntry';
import Slot from '../../Slot';
import CardSkelton from '../../cards-skeleton';
import styles from './audience-builder-helper.module.css';
const ProspectSearch = ({
	searches,
	limit = 5,
	isBusy,
	onClick,
}: {
	searches: FilterModel[];
	limit?: number;
	isBusy: boolean;
	onClick: Dispatch<SetStateAction<FilterModel | undefined>>
}) => (
	<div className="columns is-centered is-sticky-top">
		<div className="column is-12-mobile is-8-tablet">
			<div className="panel has-background-white">
				<div className="is-block py-5">
					<div className="has-text-centered">
						<p>&nbsp;</p>
						<IconRocket className={styles.rocketIconSVG}/>
						<h2 className="title is-5 has-text-primary">Getting started with B2B Audiences</h2>
						<div className={styles.audienceBuilderNumberedListWelcome}>
							<div className={styles.numberedlistitem}><div className={styles.numberedlistContainer}><div className={styles.numberedlist}></div>1</div><div className={styles.numberedlisttext}><p className="is-size-6">Select filters on the left and view results in real-time</p></div></div>
							<div className={styles.numberedlistitem}><div className={styles.numberedlistContainer}><div className={styles.numberedlist}></div>2</div><div className={styles.numberedlisttext}><p className="is-size-6">Export your audience to a CSV file</p></div></div>
							<div className={styles.numberedlistitem}><div className={styles.numberedlistContainer}><div className={styles.numberedlist}></div>3</div><div className={styles.numberedlisttext2}><p className="is-size-6">Upload file as a customer list/custom audience in Facebook, Google, LinkedIn, or your email automation tool</p></div></div>
							<div className={styles.numberedlistitem}><div className={styles.numberedlistContainer}><div className={styles.numberedlist}></div>4</div><div className={styles.numberedlisttext}><p className="is-size-6">Connect audience to ad or email campaign</p></div></div>
							<div className={styles.numberedlistitem}><div className={styles.numberedlistContainer}><div className={styles.numberedlist}></div>5</div><div className={styles.numberedlisttext}><p className="is-size-6">Increase conversions with cross-channel targeting</p></div></div>

						</div>
						<a href="https://www.nymblr.com/post/how-to-build-custom-b2b-audiences-for-facebook-ads" rel="noreferrer" target="_blank" className="is-size-6">Learn More</a>
						<p>&nbsp;</p>
					</div>
				</div>
			</div>

		</div>
	</div>
);

export default ProspectSearch;
