import classNames from 'classnames';
import { MouseEvent, useEffect } from 'react';

import { ITEMS_PER_PAGE } from '../consts';
import FormSelect from './form/FormSelect';
import IconArrowLeft from './icons/IconArrowLeft';
import IconArrowRight from './icons/IconArrowRight';

export const paginate = (items: any[], itemsPerPage: number, activePage: number) => {
	return items.slice(activePage * itemsPerPage, activePage * itemsPerPage + itemsPerPage);
};

const perPageOptions = [10, 25, 50, 100].map((value) => ({ id: value, name: value.toString() }));

const Pagination = ({
	hasNext = false,
	totalItems,
	itemsPerPage = ITEMS_PER_PAGE,
	activePage = 0,
	onPageChange,
	isTrialAccount,
	setIsUpgradeModalActive,
	onLoadMore,
	onLoadPrev,
}: {
	hasNext?: boolean;
	totalItems: number;
	itemsPerPage?: number;
	activePage: number;
	onPageChange: Function;
	isTrialAccount?: boolean;
	setIsUpgradeModalActive: (value: boolean) => void;
	onLoadMore?: (activePage: number) => any;
	onLoadPrev?: () => any;
}) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = activePage * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

	const isPrevDisabled = activePage === 0;
	const isLastPage = activePage + 1 >= totalPages;
	const isNextDisabled = isLastPage && !hasNext;

	useEffect(() => {
		if (activePage >= totalItems / itemsPerPage) {
			onPageChange(0);
		}
	}, [totalItems]);

	const onNext = async (e: MouseEvent) => {
		e.preventDefault();
		document.querySelector('.is-scroll-view')?.scrollTo(0, 0);
		console.log('onNext');
		console.log('onNext - ', (activePage + 1) % totalPages);
		// next page is available in current items

		if (!isLastPage) {
			console.log('here1');
			onPageChange((activePage + 1) % totalPages);
			return;
		}

		// either end of dataset or no fetch method is available
		if (!hasNext || !onLoadMore) {
			return;
		}

		// load next page from server
		const items = await onLoadMore(activePage);

		// if items were loaded then use classic timeout hack to force page change
		if (items?.length) {
			setTimeout(() => {
				onPageChange(activePage + 1);
			}, 100);
		}
	};

	const onPrev = async (e: MouseEvent) => {
		e.preventDefault();
		onPageChange((activePage - 1 + totalPages) % totalPages);
		if (!onLoadPrev) {
			return;
		}
		await onLoadPrev();

		document.querySelector('.is-scroll-view')?.scrollTo(0, 0);
	};

	const onPerPageChange = (value: number) => {
		if (isTrialAccount) {
			setIsUpgradeModalActive(true);
		} else {
			onPageChange(0, parseInt(value.toString(), 10));
		}
	};

	return (
		<div className="pagination is-flex is-align-items-center is-fullwidth is-justify-content-start mb-0">
			<div className="mr-3">
				<FormSelect options={perPageOptions} onChange={onPerPageChange} value={itemsPerPage} size="is-small" />
			</div>
			<div className="has-text-grey px-3" style={{ minWidth: 120 }}>
				#{Math.min(startIndex + 1, totalItems)} - {endIndex}
			</div>
			<span className={classNames('icon is-clickable mx-3', { 'is-disabled': isPrevDisabled })} onClick={isPrevDisabled ? undefined : onPrev}>
				<IconArrowLeft />
			</span>
			<span className={classNames('icon is-clickable mx-3', { 'is-disabled': isNextDisabled })} onClick={isNextDisabled ? undefined : onNext}>
				<IconArrowRight />
			</span>
		</div>
	);
};

export default Pagination;
