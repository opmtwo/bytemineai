import Fuse from 'fuse.js';
import { List } from '../types';



export const listFuseOptions: Fuse.IFuseOptions<List> = {
    keys: [['name']],
	findAllMatches: true,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
};

export const searchListItems = (items: List[], query: string) => {
	const fuse = new Fuse(items, listFuseOptions);
	return fuse.search(query).map((item) => item.item);
};
