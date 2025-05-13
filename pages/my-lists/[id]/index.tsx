import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Breadcrumb from '../../../components/Breadcrumb';
import EmptyMsg from '../../../components/EmptyMsg';
import PageLayout from '../../../components/layouts/PageLayout';
import SectionProspects from '../../../components/sections/prospects/SectionProspects';
import TableSkeleton from '../../../components/table-skeleton';
import UserGuard from '../../../guards/UserGuard';
import { IBytemineCollection } from '../../../types';
import { callApi } from '../../../utils/helper-utils';

const MyListDetails = () => {
	const [collectionId, setCollectionId] = useState<string>();
	const [collection, setCollection] = useState<IBytemineCollection>();
	const [isCollectionLoading, setIsCollectionLoading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (typeof router.query.id === 'string') {
			setCollectionId(router.query.id);
			getCollection(router.query.id);
		}
	}, [router.query.id]);

	// Load collections / lists
	const getCollection = async (collectionId: string) => {
		setIsCollectionLoading(true);
		try {
			const res = (await callApi(null, `/api/v1/collections/${collectionId}`, {})) as IBytemineCollection;
			setCollection(res);
		} catch (err) {
			console.log('getCollection - error', err);
		}
		setIsCollectionLoading(false);
	};

	return (
		<UserGuard>
			<Head>
				<title>{isCollectionLoading ? 'Loading...' : collection?.name || 'List not found'}</title>
				<meta name="description" content="" />
			</Head>
			<PageLayout>
				{isCollectionLoading && !collection?.id ? <TableSkeleton /> : null}
				{collectionId ? (
					<main className="is-relative">
						<Breadcrumb
							title={`${collection?.name || ''}`}
							items={[
								{ label: 'My Lists', href: '/my-lists', isCurrent: false },
								{ label: collection?.name || '', href: `/prospect-finder/${collectionId}`, isCurrent: true },
							]}
						/>
						<SectionProspects collectionId={collectionId} isCollectionMode={true} />
					</main>
				) : (
					<EmptyMsg msg="List not found" />
				)}
			</PageLayout>
		</UserGuard>
	);
};

export default MyListDetails;
