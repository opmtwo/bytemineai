import { motion } from 'framer-motion';
import { List } from '../../../types';
import Anchor from '../../Anchor';
import FormButton from '../../form/FormButton';
import IconAdd from '../../icons/IconAdd';
import IconDownload from '../../icons/IconDownload';

const MyListEntry = ({ item, onAdd }: { item: List; onAdd: Function }) => {
	const onDownload = () => {
		//
	};

	return (
		<motion.div layout className="panel-block is-block">
			<div className="columns is-mobile is-align-items-center">
				<div className="column is-10">
					<div className="columns is-mobile is-align-items-center">
						<div className="column is-4">{item.name}</div>
						<div className="column is-4">
                            <span className="has-text-weight-normal">231 contacts</span>
                        </div>
						<div className="column is-4">
							<Anchor href="#">Koko Zarov</Anchor>
						</div>
					</div>
				</div>
				<div className="column is-2 is-flex is-justify-content-flex-end">
					<FormButton className="ml-3" onClick={onAdd} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconAdd />} />
					<FormButton className="ml-3" onClick={onDownload} variant={['is-icon', 'is-outlined', 'is-rounded']} icon={<IconDownload />} />
				</div>
			</div>
		</motion.div>
	);
};

export default MyListEntry;
