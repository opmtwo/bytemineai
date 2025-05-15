import { attempt } from 'lodash';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import isEmpty from 'validator/lib/isEmpty';

import { FilterModel, IBytemineFilter } from '../../../types';
import { getDisplayTime } from '../../../utils/helper-utils';
import Anchor from '../../Anchor';

const ProspectSearchEntry = ({ item, onClick }: { item: FilterModel; onClick: Dispatch<SetStateAction<FilterModel | undefined>> }) => {
	const url = `/prospect-finder?filterId=${item.id}`;

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		onClick(item);
	};

	const getIncludedAndExcluded = () => {
		const bytemineFilter: IBytemineFilter | Error = attempt(JSON.parse.bind(null, item.filter));
		if (bytemineFilter instanceof Error) {
			return 'NA';
		}
		const included = [
			...(bytemineFilter?.industries?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.skills?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.interests?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.sicCodes?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.employeeSizes?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.states?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.companyRevenues?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.seniorityLevels?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.departments?.flatMap(({ label, included }) => included && label) || []),
			...(bytemineFilter?.schools?.flatMap(({ label, included }) => included && label) || []),
		]
			.filter((value) => !isEmpty(value || ''))
			.join(', ');
		const excluded = [
			...(bytemineFilter?.industries?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.skills?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.interests?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.sicCodes?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.employeeSizes?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.states?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.companyRevenues?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.seniorityLevels?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.departments?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(bytemineFilter?.schools?.flatMap(({ label, excluded }) => excluded && label) || []),
		]
			.filter((value) => !isEmpty(value || ''))
			.join(', ');
		return [included, excluded];
	};

	const getLabel = () => {
		// console.log('item', item);
		const bytemineFilter: IBytemineFilter | Error = attempt(JSON.parse.bind(null, item.filter));
		if (bytemineFilter instanceof Error) {
			return 'NA';
		}
		const values: string[] = [bytemineFilter?.website || '', bytemineFilter?.yearFounded || ''];
		[
			bytemineFilter?.keywords?.map(({ label }) => label),
			bytemineFilter?.urls?.map(({ label }) => label),
			//these are throwing errors in prod 18-May-2023
			//bytemineFilter?.lastName?.map(({ label }) => label),
			//bytemineFilter?.firstName?.map(({ label }) => label),
			bytemineFilter?.cities?.map(({ label }) => label),
			bytemineFilter?.companyNames?.map(({ label }) => label),
			bytemineFilter?.companyTypes?.map(({ label }) => label),
			bytemineFilter?.jobTitles?.map(({ label }) => label),
		].forEach((arr) => {
			if (arr) values.push(...arr);
		});

		if (typeof bytemineFilter?.lastName === 'object') {
			[bytemineFilter?.lastName?.map(({ label }) => label)].forEach((arr) => {
				if (arr) values.push(...arr);
			});
		}
		if (typeof bytemineFilter?.firstName === 'object') {
			[bytemineFilter?.firstName?.map(({ label }) => label)].forEach((arr) => {
				if (arr) values.push(...arr);
			});
		}

		return values.filter(Boolean).join(', ');
	};

	const getDataRequirementFilterLabel = () => {
		const bytemineFilter: IBytemineFilter | Error = attempt(JSON.parse.bind(null, item.filter));
		if (bytemineFilter instanceof Error) {
			return 'NA';
		}
		const { hasRequiredEmail: workEmail, hasPersonalEmailOnly: personalEmail, hasDirectDialOnly: directCall } = bytemineFilter;
		return [workEmail, personalEmail, directCall];
	};

	const label = getLabel();
	const included = getIncludedAndExcluded()[0];
	const excluded = getIncludedAndExcluded()[1];
	const displayTime = getDisplayTime(item.createdAt);
	const dataRequirement = getDataRequirementFilterLabel();

	return (
		<>
			{(included || excluded || label || dataRequirement) && (
				<div className="panel-block is-block">
					<Anchor className="is-block" href={url} onClick={handleClick}>
						{item.isSaved && (
							<>
								<span className="is-capitalized" style={{ color: 'black', fontWeight: '800' }}>
									{item?.name || ''}
								</span>
								<br />
							</>
						)}
						<>
							{(included || label || dataRequirement) && (
								<>
									<span style={{ color: 'grey', fontWeight: '500' }}>Included:</span>{' '}
									<span className="">
										{included} {label}{' '}
										{/* {dataRequirement[0] ? 'Work Email' : dataRequirement[1] ? 'Personal Email' : dataRequirement[2] ? 'Cell Phone' : ''} */}
										{dataRequirement[0] ? 'Work Email ' : null}
										{dataRequirement[1] ? 'Personal Email ' : null}
										{dataRequirement[2] ? 'Cell Phone ' : null}
									</span>
									<br />
								</>
							)}
							{excluded && (
								<>
									{' '}
									<span style={{ color: 'grey', fontWeight: '500' }}>Excluded:</span> <span className="">{excluded}</span>
									<br />
								</>
							)}
						</>
					</Anchor>
					<time>{displayTime}</time>
				</div>
			)}
		</>
	);
};

export default ProspectSearchEntry;
