import Fuse from 'fuse.js';
import { EmailAccountModel } from '../types';



export const emailAccountFuseOptions: Fuse.IFuseOptions<EmailAccountModel> = {
    keys: [['email', 'code', 'token', 'created_at']],
	findAllMatches: true,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
};

export const searchEmailAccountItems = (items: EmailAccountModel[], query: string) => {
	const fuse = new Fuse(items, emailAccountFuseOptions);
	return fuse.search(query).map((item) => item.item);
};
