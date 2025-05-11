import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { GraphQLOptions } from '@aws-amplify/api-graphql';
import FormButton from './form/FormButton';

const QueryLoader = ({
	query,
	limit = undefined,
	token = undefined,
	options = {},
	rootKey,
	dataKey,
	loadMoreTitle = 'Load More',
	isBusy = false,
	isSingle = false,
	isLoadAll = false,
	fetchMore,
	isLoadMoreHidden,
	onLoad = () => {},
	onBusyToggle = () => {},
	onNextTokenChange = () => {},
	onError = () => {},
}: {
	query: any;
	limit?: number;
	token?: string;
	options?: any;
	rootKey: string;
	dataKey: string;
	loadMoreTitle?: string;
	isBusy?: boolean;
	isSingle?: boolean;
	isLoadAll?: boolean;
	fetchMore?: Date;
	onNextTokenChange?: Function;
	isLoadMoreHidden?: boolean;
	onLoad: Function;
	onBusyToggle?: Function;
	onError?: Function;
}) => {
	const [items, setItems] = useState<any[]>([]);
	const [nextToken, setNextToken] = useState<string>();

	const getParams = (): GraphQLOptions => ({
		query,
		variables: {
			sortDirection: 'DESC',
			limit,
			nextToken,
			...options,
		},
	});

	useEffect(() => {
		setNextToken(token);
	}, [token]);

	useEffect(() => {
		if (!nextToken || !fetchMore) {
			return;
		}
		onLoadMore();
	}, [fetchMore]);

	useEffect(() => {
		(async () => {
			if (isLoadAll) {
				await loadAllItems();
				return;
			}
			await onLoadOneOrMany();
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loadAllItems = async () => {

		onBusyToggle(true);
		let allItems: any[] = [];
		let token = nextToken;
		let options = getParams();

		// fetch all items using next token
		while (true) {
			try {
				options.variables = { ...options.variables, nextToken: token };
				console.log('options', options);
				const response: any = await API.graphql(options);
				const newItems = items.concat(items, response.data[rootKey][dataKey]);
				allItems = allItems.concat(newItems);
				token = response.data[rootKey].nextToken;
				if (!token) {
					break;
				}
			} catch (err) {
				console.log('Error in query loader - loadAllItems - ', err);
				break;
			}
		}

		// return results
		onLoad(allItems);
		onBusyToggle(false);
		return allItems;
	};

	const onLoadOneOrMany = async () => {
		onBusyToggle(true);
		try {
			const response: any = await API.graphql(getParams());
			const result = isSingle ? response[rootKey][dataKey] : response.data[rootKey][dataKey];
			// console.log('Query loader - success - ', { response, result });
			onLoad(result);
			setItems(result);
			const newToken = isSingle ? undefined : response.data[rootKey].nextToken;
			setNextToken(newToken);
			onNextTokenChange(newToken);
		} catch (err: any) {
			console.log('Query loader - error - ', err);
			onError(err);
		} finally {
			onBusyToggle(false);
		}
	};

	const onLoadMore = async () => {
		onBusyToggle(true);
		try {
			const response: any = await API.graphql(getParams());
			const result = [...items, ...response.data[rootKey][dataKey]];
			onLoad(result);
			setItems(result);
			const newToken = response.data[rootKey].nextToken;
			setNextToken(newToken);
			onNextTokenChange(newToken);
		} catch (err) {
			console.log('Error fetching notifications', err);
			onError(err);
		} finally {
			onBusyToggle(false);
		}
	};

	if (!nextToken || isLoadMoreHidden === true) {
		return null;
	}

	return (null);
};

export default QueryLoader;
