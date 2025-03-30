import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserGuard from '../../../guards/UserGuard';
import PageLayout from '../../../components/layouts/PageLayout';
import SectionProspectFinder from '../../../components/sections/prospect-finder/SectionProspectFinder';
import EmptyMsg from '../../../components/EmptyMsg';
import { List } from '../../../types';
import QueryLoader from '../../../components/QueryLoader';
import { getList } from '../../../src/graphql/queries';

const MyListDetails = () => {
	const [listId, setListId] = useState<string>();
	const [list, setList] = useState<List>();
	const [isListLoading, setIsListLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (typeof router.query.id === 'string') {
			setListId(router.query.id);
		}
	}, [router.query.id]);

	return (
		<UserGuard>
			<Head>
				<title>{isListLoading ? 'Loading...' : list?.name || 'List not found'}</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				{listId ? (
					<>
						<SectionProspectFinder isContactsOnly={true} listId={listId} />
						<QueryLoader
							onLoad={setList}
							query={getList}
							rootKey="data"
							dataKey="getList"
							options={{ id: listId, limit: 999 }}
							isSingle={true}
							onBusyToggle={setIsListLoading}
						/>
					</>
				) : (
					<EmptyMsg msg="List not found" />
				)}
			</PageLayout>
		</UserGuard>
	);
};

export default MyListDetails;
