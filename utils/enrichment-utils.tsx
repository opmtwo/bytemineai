import Fuse from 'fuse.js';
import { Enrichment } from '../types';

export const enrichmentFuseOptions: Fuse.IFuseOptions<Enrichment> = {
	keys: [['name']],
	findAllMatches: true,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
};

export const searchEnrichmentItems = (items: Enrichment[], query: string) => {
	const fuse = new Fuse(items, enrichmentFuseOptions);
	return fuse.search(query).map((item) => item.item);
};
