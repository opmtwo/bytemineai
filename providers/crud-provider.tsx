import fuse from 'fuse.js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import Confirm from '../components/Confirm';
import LoaderFullscreen from '../components/LoaderFullscreen';
import { EActionSelect, ISortData } from '../types';
import { callApi, getSortedItems, notifyError, notifySuccess, paginate, sleep, unpackErrors } from '../utils/helper-utils';

const ITEMS_PER_PAGE = 10;
const FORM_CREATE_SUCCESS_MESSAGE = 'The record has been created successfully.';
const FORM_CREATE_ERROR_MESSAGE = `Something went wrong while creating the record. Please try again, and ensure all required fields are filled correctly. If the issue persists, contact support.`;
const FORM_UPDATE_SUCCESS_MESSAGE = `The record has been updated successfully.`;
const FORM_UPDATE_ERROR_MESSAGE = `Something went wrong while updating the record. Please check your input and try again. If the issue persists, contact support.`;
const FORM_DELETE_SUCCESS_MESSAGE = `The record has been deleted successfully.`;
const FORM_DELETE_ERROR_MESSAGE = `Something went wrong while deleting the record. Please try again. If the issue persists, contact support.`;
const FORM_DELETE_MANY_SUCCESS_MESSAGE = `The selected records have been deleted successfully.`;
const FORM_DELETE_MANY_ERROR_MESSAGE = `Something went wrong while deleting the selected records. Please try again. If the issue persists, contact support.`;

export interface ICrudContext<T> {
	idField: string;
	items: T[];
	itemsInUse: T[];
	sortMap: ISortData[];
	page: number;
	perPage: number;
	query: string;
	error?: Error;
	formErrors?: any;
	isBusy: boolean;
	isLoading: boolean;
	activeItem?: T;
	isFormActive: boolean;
	isConfirmActive: boolean;
	onFormOpen: () => Promise<void>;
	onFormCancel: () => Promise<void>;
	onConfirmOpen: (title: string, msg: string, onSubmit: () => () => Promise<void>, onCancel: () => () => Promise<void>) => Promise<void>;
	onConfirmSubmit: () => Promise<void>;
	onConfirmCancel: () => Promise<void>;
	onSelect: (id: string, isSelected: boolean) => Promise<void>;
	onSelectMany: (type: EActionSelect, ids: string[]) => Promise<void>;
	onPageChange: (newPage: number, newPerPage: number) => Promise<void>;
	onSortMapChange: (value: ISortData[]) => Promise<void>;
	onQueryChange: (newQuery: string) => Promise<T[]>;
	onAdd: () => Promise<void>;
	onEdit: (id: string) => Promise<void>;
	onCreate: (
		item: Partial<T>,
		body: RequestInit,
		query: URLSearchParams | Record<string, string>,
		headers: HeadersInit,
		onSuccess?: (item: T) => Promise<T>,
		onError?: (item: Partial<T>) => Promise<void>
	) => Promise<void>;
	onInsert: (item: T, isEnd?: boolean) => Promise<void>;
	onUpsert: (item: T, isEnd?: boolean) => Promise<void>;
	onUpsertMany: (items: T[], isEnd?: boolean) => Promise<void>;
	onReplace: (item: T) => Promise<void>;
	onRead: () => Promise<void>;
	onReadOne: (id: string) => Promise<void>;
	onUpdate: (
		item: Partial<T>,
		body: RequestInit,
		query: URLSearchParams | Record<string, string>,
		headers: HeadersInit,
		onSuccess?: (item: T) => Promise<T>,
		onError?: (item: Partial<T>) => Promise<void>
	) => Promise<void>;
	onDelete: (
		id: string,
		body: RequestInit,
		query: URLSearchParams | Record<string, string>,
		headers: HeadersInit,
		isSilent?: boolean,
		onSuccess?: (item: Partial<T>) => Promise<void>,
		onError?: (item: Partial<T>) => Promise<void>
	) => Promise<void>;
	onDeleteMany: (
		ids: string[],
		body: RequestInit,
		query: URLSearchParams | Record<string, string>,
		headers: HeadersInit,
		isSilent?: boolean,
		onSuccess?: () => Promise<void>,
		onError?: () => Promise<void>
	) => Promise<void>;
	onRemove: (id: string) => Promise<void>;
	onRemoveMany: (ids: string[]) => Promise<void>;
}

export interface ICrudContextProvider<T> {
	children: ReactNode;
	idField?: string;
	baseApi: string;
	baseUrl: string;
	baseSortMap: ISortData[];
	searchKeys: string[];
}

export const CrudContext = createContext<ICrudContext<any>>({
	idField: 'id',
	items: [],
	itemsInUse: [],
	sortMap: [],
	page: 0,
	perPage: ITEMS_PER_PAGE,
	query: '',
	error: undefined,
	formErrors: undefined,
	isBusy: false,
	isLoading: false,
	isFormActive: false,
	isConfirmActive: false,
	onFormOpen: async () => {},
	onFormCancel: async () => {},
	onConfirmOpen: async (title: string, msg: string, onSubmit: Function, onCancel: Function) => {},
	onConfirmSubmit: async () => {},
	onConfirmCancel: async () => {},
	onSelect: async (id: string, isSelected: boolean) => {},
	onSelectMany: async (type: EActionSelect, ids: string[]) => {},
	onPageChange: async (newPage: number, newPerPage: number) => {},
	onSortMapChange: async (value: ISortData[]) => {},
	onQueryChange: async (value: string) => [],
	onAdd: async () => {},
	onEdit: async (id: string) => {},
	onCreate: async () => {},
	onInsert: async () => {},
	onUpsert: async () => {},
	onUpsertMany: async () => {},
	onReplace: async () => {},
	onRead: async (id?: string) => {},
	onReadOne: async (id: string) => {},
	onUpdate: async () => {},
	onDelete: async () => {},
	onDeleteMany: async () => {},
	onRemove: async () => {},
	onRemoveMany: async () => {},
});

export const CrudProvider = <T extends {}>({ children, idField = 'id', baseApi, baseUrl, baseSortMap, searchKeys }: ICrudContextProvider<T>) => {
	const [isBusy, setIsBusy] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// errors
	const [error, setError] = useState<Error>();
	const [formErrors, setFormErrors] = useState<any>();

	// all item
	const [items, setItems] = useState<T[]>([]);
	const [itemsInUse, setItemsInUse] = useState<T[]>([]);

	// active item
	const [activeItem, setActiveItem] = useState<T>();

	// search query
	const [query, setQuery] = useState('');

	// is form modal active
	const [isFormActive, setIsFormActive] = useState(false);

	// active page
	const [page, setPage] = useState(0);

	// items per page
	const [perPage, setPerPage] = useState(ITEMS_PER_PAGE);

	// sort map
	const [sortMap, setSortMap] = useState<ISortData[]>(baseSortMap);

	// confirm dialog
	const [confirmTitle, setConfirmTitle] = useState('');
	const [confirmMsg, setConfirmMsg] = useState('');
	const [confirmSubmitCallback, setConfirmSubmitCallback] = useState<() => () => Promise<void>>();
	const [confirmCancelCallback, setConfirmCancelCallback] = useState<() => () => Promise<void>>();
	const [isConfirmActive, setIsConfirmActive] = useState(false);

	// Force update
	const [lastUpdatedAt, setLastUpdatedAt] = useState<Date>();

	useEffect(() => {
		onQueryChange(query);
	}, [items.length, sortMap, lastUpdatedAt]);

	// open form
	const onFormOpen = async () => {
		setIsFormActive(true);
	};

	// close form
	const onFormCancel = async () => {
		setIsFormActive(false);
	};

	// confirm an action
	const onConfirmOpen = async (title: string, msg: string, onSubmitCallback: () => () => Promise<void>, onCancelCallback: () => () => Promise<void>) => {
		setConfirmTitle(title);
		setConfirmMsg(msg);
		setConfirmSubmitCallback(onSubmitCallback);
		setConfirmCancelCallback(onCancelCallback);
		setIsConfirmActive(true);
	};

	// confirm submit event
	const onConfirmSubmit = async () => {
		setIsConfirmActive(false);
		await sleep(250);
		if (typeof confirmSubmitCallback === 'function') {
			try {
				await confirmSubmitCallback();
			} catch (err) {
				console.log('onConfirmSubmit - error', err);
				return;
			}
		}
	};

	// confirm cancel event
	const onConfirmCancel = async () => {
		setIsConfirmActive(false);
		await sleep(250);
		if (typeof confirmCancelCallback === 'function') {
			try {
				await confirmCancelCallback();
			} catch (err) {
				console.log('onConfirmCancel - error', err);
				return;
			}
		}
	};

	// item selected via checkbox
	const onSelect = async (id: string, isSelected: boolean) => {
		setItems(items.map((_i) => ((_i as any)[idField] === id ? { ..._i, isSelected } : _i)));
		setItemsInUse(itemsInUse.map((_i) => ((_i as any)[idField] === id ? { ..._i, isSelected } : _i)));
	};

	// many items selected via top checkbox or dropdown menu or button click
	const onSelectMany = async (type?: EActionSelect, targetIds: string[] = []) => {
		// select all
		if (type === EActionSelect.SelectAll) {
			setItems(items.map((_i) => ({ ..._i, isSelected: true })));
			setItemsInUse(items.map((_i) => ({ ..._i, isSelected: true })));
			return;
		}

		// select current page
		if (type === EActionSelect.SelectCurrentPage) {
			const ids = paginate(items, perPage, page).map((_item) => _item[idField]);
			setItems(items.map((_i) => (ids.includes((_i as any)[idField]) ? { ..._i, isSelected: true } : _i)));
			setItemsInUse(itemsInUse.map((_i) => (ids.includes((_i as any)[idField]) ? { ..._i, isSelected: true } : _i)));
			return;
		}

		// toggle current page
		if (type === EActionSelect.ToggleCurrentPage) {
			const ids = paginate(items, perPage, page).map((_item) => _item[idField]);
			const pageItems = items.filter((_i) => ids.includes((_i as any)[idField]));
			const isSelected = pageItems.every((_i) => (_i as any).isSelected);
			setItems(items.map((_i) => (ids.includes((_i as any)[idField]) ? { ..._i, isSelected: !isSelected } : _i)));
			setItemsInUse(itemsInUse.map((_i) => (ids.includes((_i as any)[idField]) ? { ..._i, isSelected: !isSelected } : _i)));
			return;
		}

		setItems(items);
	};

	// page change
	const onPageChange = async (newPage: number, newPerPage: number) => {
		setPage(newPage);
		if (newPerPage != perPage) {
			setPerPage(newPerPage);
		}
	};

	// sort map change
	const onSortMapChange = async (value: ISortData[]) => {
		setSortMap(value);
	};

	// when query changes - search and sort data
	const onQueryChange = async (newQuery: string) => {
		let filteredItems = [...items];
		if (newQuery.trim().length > 0) {
			const fuseOptions: fuse.IFuseOptions<T> = {
				keys: searchKeys,
				findAllMatches: true,
				isCaseSensitive: false,
				shouldSort: true,
				useExtendedSearch: true,
				threshold: 0.3,
			};
			filteredItems = new fuse(items, fuseOptions).search(newQuery).map((item) => item.item);
		}
		filteredItems = getSortedItems(filteredItems, sortMap);
		setItemsInUse(filteredItems);
		setPage(0);
		setQuery(newQuery);
		return filteredItems;
	};

	// create a new item
	const onAdd = async () => {
		setActiveItem(undefined);
		setIsFormActive(true);
	};

	// edit and existing item
	const onEdit = async (id: string) => {
		const item = items.find((_i) => (_i as any)[idField] === id);
		if (!item) {
			return;
		}
		setActiveItem(item);
		setFormErrors(undefined);
		setIsFormActive(true);
	};

	// api to create resource
	const onCreate = async (
		item: Partial<T>,
		body: RequestInit,
		query: URLSearchParams | Record<string, string> = {},
		headers: any = {},
		onSuccess?: (item: T) => Promise<T>,
		onError?: (item: Partial<T>) => Promise<void>
	) => {
		setIsBusy(true);
		setError(undefined);
		setFormErrors(undefined);
		try {
			const res: T = (await callApi(null, baseUrl, { method: 'POST', body: JSON.stringify(item), ...body }, {}, headers)) as T;
			setItems([res, ...items]);
			if ((activeItem as any)?.[idField] === (res as any)[idField]) {
				setActiveItem(res);
			}
			notifySuccess(FORM_CREATE_SUCCESS_MESSAGE);
			setIsFormActive(false);
			if (typeof onSuccess === 'function') {
				await onSuccess(res);
			}
		} catch (err: any) {
			console.log(`onCreate - err - ${err}`);
			setError(err);
			const errData = unpackErrors(err, formErrors, setFormErrors);
			setFormErrors(errData);
			notifyError(err, FORM_CREATE_ERROR_MESSAGE);
			if (typeof onError === 'function') {
				await onError(item);
			}
		}
		setIsBusy(false);
	};

	// api to manually add a resource without api call
	const onInsert = async (item: T, isEnd: boolean = false) => {
		if (isEnd) {
			setItems([...items]);
		} else {
			setItems([item, ...items]);
		}
	};

	// api to manually add or replace a resource without api call
	const onUpsert = async (item: T, isEnd: boolean = false) => {
		const index = items.findIndex((_i) => (_i as any)[idField] === (item as any)[idField]);
		if (index !== -1) {
			setItems(items.map((_v, _i) => (_i === index ? { ...item } : { ..._v })));
		} else {
			if (isEnd) {
				setItems([...items]);
			} else {
				setItems([item, ...items]);
			}
		}
	};

	// api to manually replace a resource without api call
	const onReplace = async (item: T) => {
		setItems(items.map((_i) => ((_i as any)[idField] === (item as any)[idField] ? item : _i)));
	};

	// api to manually add or replace a resource without api call
	const onUpsertMany = async (items: T[], isEnd: boolean = false) => {
		let newItems = [...items];
		for (let x = 0; x < newItems.length; x++) {
			const _item = newItems[x];
			const index = newItems.findIndex((_i) => (_i as any)[idField] === (_item as any)[idField]);
			if (index !== -1) {
				setItems(newItems.map((_v, _i) => (_i === index ? { ..._item } : { ..._v })));
			} else {
				if (isEnd) {
					newItems = [...newItems, _item];
				} else {
					newItems = [_item, ...newItems];
				}
			}
			if ((activeItem as any)?.[idField] === (_item as any)[idField]) {
				setActiveItem(_item);
			}
		}
		setItems([...newItems]);
	};

	// get all items or the item with the specified id
	const onRead = async (body: RequestInit = {}, queryParam: URLSearchParams | Record<string, string> = {}, headers: HeadersInit = {}) => {
		setIsLoading(true);
		setError(undefined);
		try {
			const res: T[] = (await callApi(null, `${baseUrl}/`, { method: 'GET', ...body }, queryParam, headers)) as T[];
			setItems(res);
			setLastUpdatedAt(new Date());
		} catch (err: any) {
			console.log(`onRead - err - ${err}`);
			setError(err);
			setItems([]);
		}
		setIsLoading(false);
	};

	// get the item with the specified id
	const onReadOne = async (id?: string, body: RequestInit = {}, query: URLSearchParams | Record<string, string> = {}, headers: HeadersInit = {}) => {
		setIsLoading(true);
		setError(undefined);
		try {
			const url = `${baseUrl}/${id}`;
			const res: T = (await callApi(null, url, { method: 'GET', ...body }, query, headers)) as T;
			setItems(items.map((_i) => ((_i as any)[idField] === (res as any)[idField] ? res : _i)));
			setActiveItem(res);
		} catch (err: any) {
			console.log(`onReadOne - err - ${err}`);
			setError(err);
		}
		setIsLoading(false);
	};

	// api to update resource
	const onUpdate = async (
		item: Partial<T>,
		body: RequestInit = {},
		query: URLSearchParams | Record<string, string> = {},
		headers: HeadersInit = {},
		onSuccess?: (item: T) => Promise<T>,
		onError?: (item: Partial<T>) => Promise<void>
	) => {
		setIsBusy(true);
		setError(undefined);
		setFormErrors(undefined);
		try {
			const url = `${baseUrl}/${(activeItem as any)[idField]}`;
			let res: T = (await callApi(null, url, { method: 'PUT', body: JSON.stringify(item), ...body }, query, headers)) as T;
			if (typeof onSuccess === 'function') {
				res = await onSuccess(res);
			}
			setItems(items.map((_i) => ((_i as any)[idField] === (res as any)[idField] ? res : _i)));
			setItemsInUse(itemsInUse.map((_i) => ((_i as any)[idField] === (res as any)[idField] ? res : _i)));
			if ((activeItem as any)?.[idField] === (res as any)[idField]) {
				setActiveItem(res);
			}
			notifySuccess(FORM_UPDATE_SUCCESS_MESSAGE);
			setIsFormActive(false);
		} catch (err: any) {
			console.log(`onUpdate - err - ${err}`);
			setError(err);
			const errData = unpackErrors(err, formErrors, setFormErrors);
			setFormErrors(errData);
			notifyError(err, FORM_UPDATE_ERROR_MESSAGE);
			if (typeof onError === 'function') {
				await onError(item);
			}
		}
		setIsBusy(false);
	};

	// api to delete one or more resource
	const onDelete = async (
		id: string,
		body: RequestInit = {},
		query: URLSearchParams | Record<string, string> = {},
		headers: HeadersInit = {},
		isSilent = false,
		onSuccess?: (item: Partial<T>) => Promise<void>,
		onError?: (item: Partial<T>) => Promise<void>
	) => {
		setIsBusy(true);
		setError(undefined);
		const item: Partial<T> = items.find((_i) => (_i as any)[idField] !== id) || ({ id } as any);
		try {
			if (isSilent) {
				setItems(items.filter((_i) => (_i as any)[idField] !== id));
				(await callApi(null, `${baseUrl}/${id}`, { method: 'DELETE', ...body }, query, headers)) as T;
			} else {
				(await callApi(null, `${baseUrl}/${id}`, { method: 'DELETE', ...body }, query, headers)) as T;
				setItems(items.filter((_i) => (_i as any)[idField] !== id));
				notifySuccess(FORM_DELETE_SUCCESS_MESSAGE);
			}
			if (typeof onSuccess === 'function') {
				await onSuccess(item);
			}
		} catch (err: any) {
			console.log(`onDelete - err - ${err}`);
			setError(err);
			notifyError(err, FORM_DELETE_ERROR_MESSAGE);
			if (typeof onError === 'function') {
				await onError(item);
			}
		}
		setIsBusy(false);
	};

	// api to delete one or more resource
	const onDeleteMany = async (
		ids: string[],
		body: RequestInit = {},
		query: URLSearchParams | Record<string, string> = {},
		headers: HeadersInit = {},
		isSilent = false,
		onSuccess?: () => Promise<void>,
		onError?: () => Promise<void>
	) => {
		setIsBusy(true);
		setError(undefined);
		try {
			if (isSilent) {
				setItems(items.filter((_i) => ids.includes((_i as any)[idField]) !== true));
				// API.del(baseApi, `${baseUrl}`, await getInput({ ...body, ids }, query, headers));
			} else {
				// await API.del(baseApi, `${baseUrl}`, await getInput({ ...body, ids }, query, headers));
				setItems(items.filter((_i) => ids.includes((_i as any)[idField]) !== true));
				notifySuccess(FORM_DELETE_MANY_SUCCESS_MESSAGE);
			}
			if (typeof onSuccess === 'function') {
				await onSuccess();
			}
		} catch (err: any) {
			console.log(`onDelete - err - ${err}`);
			setError(err);
			notifyError(err, FORM_DELETE_MANY_ERROR_MESSAGE);
			if (typeof onError === 'function') {
				await onError();
			}
		}
		setIsBusy(false);
	};

	// api to remove the specified item without calling api
	const onRemove = async (id: string) => {
		setItems(items.filter((_i) => (_i as any)[idField] !== id));
	};

	// api to remove one or more items without calling api
	const onRemoveMany = async (ids: string[]) => {
		setItems(items.filter((_i) => ids.includes((_i as any)[idField]) === false));
	};

	return (
		<>
			<CrudContext.Provider
				value={{
					idField,
					items,
					itemsInUse,
					sortMap,
					page,
					perPage,
					query,
					isBusy,
					isLoading,
					error,
					formErrors,
					activeItem,
					isFormActive,
					isConfirmActive,
					onFormOpen,
					onFormCancel,
					onConfirmOpen,
					onConfirmSubmit,
					onConfirmCancel,
					onSelect,
					onSelectMany,
					onPageChange,
					onSortMapChange,
					onQueryChange,
					onAdd,
					onEdit,
					onCreate,
					onInsert,
					onUpsert,
					onReplace,
					onUpsertMany,
					onRead,
					onReadOne,
					onUpdate,
					onDelete,
					onDeleteMany,
					onRemove,
					onRemoveMany,
				}}
			>
				{children}
			</CrudContext.Provider>
			<Confirm title={confirmTitle} msg={confirmMsg} isActive={isConfirmActive} onSubmit={onConfirmSubmit} onCancel={onConfirmCancel} />
			{isBusy ? <LoaderFullscreen /> : null}
		</>
	);
};

export const useCrudContext = <T extends {}>() => useContext<ICrudContext<T>>(CrudContext);

export default CrudProvider;
