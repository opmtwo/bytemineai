import { MouseEvent, useEffect, useState } from 'react';
import { FilterItem } from '../../types';
import QueryLoader from '../QueryLoader';
import { listFilterItemsByFilterId } from '../../src/graphql/queries';
import CardAnimatePresence from '../cards/CardAnimatePresence';
import Loader from '../Loader';
import Anchor from '../Anchor';
import FilterUploadForm from './FilterUploadForm';
import Modal from '../modals/Modal';
import { useAuthContext } from '../../providers/auth-data-provider';
import { API, Auth } from 'aws-amplify';
import { notifyError } from '../../utils/helper-utils';
import DeleteConfirm from '../DeleteConfirm';

const FilterUploadList = ({
	fieldId,
	fieldLabel,
	fieldFinder,
	shouldConfirm = false,
	shouldRember = false,
	onLoad,
	onReset,
}: {
	fieldId: string;
	fieldLabel: string;
	shouldConfirm?: boolean;
	shouldRember?: boolean;
	fieldFinder: (value: string) => boolean;
	onLoad: (values: FilterItem[]) => void;
	onReset: (values: FilterItem[]) => void;
}) => {
	// list of filter data items
	const [items, setItems] = useState<FilterItem[]>([]);

	// busy status
	const [isBusy, setIsBusy] = useState(false);

	// working status
	const [isWorking, setIsWorking] = useState(false);

	// upload form status
	const [isFormActive, setIsFormActive] = useState(false);

	// delete confirm modal
	const [isDeleteConfirmActive, setIsDeleteConfirmActive] = useState(false);

	// user context
	const { user } = useAuthContext();

	// current user groupname - username of group admin
	const groupname = user?.attributes['custom:group_name'];

	/**
	 * @summary
	 * Fix z-index issue in upload form
	 *
	 * @link
	 * https://nymblr.atlassian.net/browse/ND-65?atlOrigin=eyJpIjoiMDM1ZWFkOWMzMmNhNGYzOWIxMDY2ZTE2YTMyMzQwZjkiLCJwIjoiaiJ9
	 *
	 * @description
	 * Issue due to z-index in parent form with css class filter-form
	 */
	useEffect(() => {
		const ele: HTMLFormElement | null = document.querySelector('form.filter-form');
		if (!ele) {
			return;
		}
		if (isFormActive) {
			ele.style.zIndex = '100';
		} else {
			// let the transition complete before resetting the z-index
			setTimeout(() => {
				ele.style.zIndex = '';
			}, 300);
		}
	}, [isFormActive]);

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: (await Auth.currentSession()).getAccessToken().getJwtToken(),
			},
		};
		return options;
	};

	const handleLoad = async (values: FilterItem[]) => {
		setItems(values);
		onLoad(values);
	};

	const handleOpen = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		setIsFormActive(true);
	};

	const handleSubmit = async (values: FilterItem[]) => {
		setIsFormActive(false);
		setItems(values);
		onLoad(values);
	};

	const handleCancel = async () => {
		setIsFormActive(false);
	};

	const onDelete = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		if (shouldConfirm) {
			setIsDeleteConfirmActive(true);
		} else {
			onDeleteSubmit();
		}
	};

	const onDeleteCancel = () => setIsDeleteConfirmActive(false);

	const onDeleteSubmit = async () => {
		setIsWorking(true);
		try {
			setIsDeleteConfirmActive(false);
			onReset(items);
			setItems([]);
			const params = await getInput({ fieldId });
			await API.del('restApiExpress', '/restapi/filters', params);
		} catch (err) {
			console.log('onDeleteSubmit - error -', err);
			notifyError(err);
		}
		setIsWorking(false);
	};

	return (
		<div className="is-overlay" style={{ top: 13, right: 21, bottom: 'auto', left: 'auto' }}>
			{/* load group & field specific list */}
			{shouldRember ? (
				<QueryLoader
					onLoad={handleLoad}
					query={listFilterItemsByFilterId}
					rootKey="listFilterItemsByFilterId"
					dataKey="items"
					isBusy={isBusy}
					onBusyToggle={setIsBusy}
					options={{ filterId: `${groupname}-${fieldId}`.toLowerCase(), sortDirection: 'DESC' }}
					limit={999}
					isLoadAll
				/>
			) : null}

			{/* list loading - show loader */}
			<CardAnimatePresence isActive={isBusy ? true : false}>
				<div className="is-flex">
					<span className="mr-5">Loading</span>
					<Loader width={16} height={16} classNames="p-0" />
				</div>
			</CardAnimatePresence>

			{/* valid list found - option to clear */}
			<CardAnimatePresence isActive={!isBusy && items.length > 0}>
				<Anchor href="#" onClick={onDelete} className="has-text-primary is-inline-flex">
					<span className="is-clipped-text" style={{ maxWidth: 100 }}>
						{items[0]?.filename || items.length}
					</span>
					<span>&nbsp;X</span>
				</Anchor>
			</CardAnimatePresence>

			{/* no list found - option to upload */}
			<CardAnimatePresence isActive={!isBusy && items.length <= 0}>
				<Anchor href="#" onClick={handleOpen} className="has-text-primary is-size-7 ">
					<strong>Upload List</strong>
				</Anchor>
			</CardAnimatePresence>

			{/* filter upload form */}
			<Modal isActive={isFormActive} onCancel={handleCancel}>
				<FilterUploadForm fieldId={fieldId} fieldLabel={fieldLabel} fieldFinder={fieldFinder} onSubmit={handleSubmit} onCancel={handleCancel} />
			</Modal>

			{/* clear list */}
			<DeleteConfirm
				title="Delete list"
				msg="Are you sure that you would like to delete this list?"
				isActive={isDeleteConfirmActive}
				onCancel={onDeleteCancel}
				onSubmit={onDeleteSubmit}
			/>
		</div>
	);
};

export default FilterUploadList;
