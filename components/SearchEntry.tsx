import { attempt } from 'lodash';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { FilterModel, RampedUpFilter, SelectOption } from '../types';
import { getDisplayTime } from '../utils/helper-utils';
import Anchor from './Anchor';

const SearchEntry = ({
	item,
	onClick,
}: {
	item: FilterModel;
	onClick: Dispatch<SetStateAction<FilterModel | undefined>>;
}) => {
	const url = `/prospect-finder?filterId=${item.id}`;

	const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
		onClick(item);
	};

	const getIncludedAndExcluded = () => {
		const rampedUpFilter: RampedUpFilter | Error = attempt(JSON.parse.bind(null, item.rampedUpFilter));
		if (rampedUpFilter instanceof Error) {
			return 'NA';
		}
		const included = [
			...(rampedUpFilter?.industries?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.skills?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.interests?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.sicCodes?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.employeeSizes?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.states?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.companyRevenues?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.seniorityLevels?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.departments?.flatMap(({ label, included }) => included && label) || []),
			...(rampedUpFilter?.schools?.flatMap(({ label, included }) => included && label) || []),
		].filter(value => !isEmpty(value || '')).join(', ');
		const excluded = [
			...(rampedUpFilter?.industries?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.skills?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.interests?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.sicCodes?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.employeeSizes?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.states?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.companyRevenues?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.seniorityLevels?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.departments?.flatMap(({ label, excluded }) => excluded && label) || []),
			...(rampedUpFilter?.schools?.flatMap(({ label, excluded }) => excluded && label) || []),
		].filter(value => !isEmpty(value || '')).join(', ');
		return [included, excluded];
	};

	const getLabel = () => {
		console.log('item', item);
		const rampedUpFilter: RampedUpFilter | Error = attempt(JSON.parse.bind(null, item.rampedUpFilter));
		if (rampedUpFilter instanceof Error) {
			return 'NA';
		}
		const values: string[] = [
			rampedUpFilter?.website || '',
			rampedUpFilter?.yearFounded || '',
		];
		[
			rampedUpFilter?.keywords?.map(({ label }) => label),
			rampedUpFilter?.urls?.map(({ label }) => label),
			//these are throwing errors in prod 18-May-2023
			//rampedUpFilter?.lastName?.map(({ label }) => label),
			//rampedUpFilter?.firstName?.map(({ label }) => label),
			rampedUpFilter?.cities?.map(({ label }) => label),
			rampedUpFilter?.companyNames?.map(({ label }) => label),
			rampedUpFilter?.companyTypes?.map(({ label }) => label),
			rampedUpFilter?.jobTitles?.map(({ label }) => label),
		].forEach((arr) => {
			if (arr) values.push(...arr);
		});

		if (typeof rampedUpFilter?.lastName === 'object'){
			[

				rampedUpFilter?.lastName?.map(({ label }) => label),

			].forEach((arr) => {
				if (arr) values.push(...arr);
			});
		}
		if (typeof rampedUpFilter?.firstName === 'object'){
			[

				rampedUpFilter?.firstName?.map(({ label }) => label),

			].forEach((arr) => {
				if (arr) values.push(...arr);
			});
		}

		return values.filter(Boolean).join(', ');
	};

	const getDataRequirementFilterLabel = () => {
		const rampedUpFilter: RampedUpFilter | Error = attempt(JSON.parse.bind(null, item.rampedUpFilter));
		if (rampedUpFilter instanceof Error) {
			return 'NA';
		}
		const { hasRequiredEmail: workEmail, hasPersonalEmailOnly: personalEmail, hasDirectDialOnly: directCall } = rampedUpFilter;
		return [workEmail, personalEmail, directCall];
	};

	const label = getLabel();
	const included = getIncludedAndExcluded()[0]
	const excluded = getIncludedAndExcluded()[1]
	const displayTime = getDisplayTime(item.createdAt);
	const dataRequirement = getDataRequirementFilterLabel()

	return (
		<>{(included || excluded || label || dataRequirement) &&
			<div className="panel-block is-block">
				<Anchor className="is-block" href={url} onClick={handleClick}>
					{(item.savedFilter) && <><span className='is-capitalized' style={{ color: "black", fontWeight: "800" }}>{item?.name || ''}</span><br /></>}
					<>
						{(included || label || dataRequirement) && <><span style={{ color: "grey", fontWeight: "500" }}>Included:</span> <span className=''>{included} {label} {dataRequirement[0] ? "Work Email" : dataRequirement[1] ? "Personal Email" : dataRequirement[2] ? "Cell Phone" : ""}</span><br /></>}
						{excluded && <> <span style={{ color: "grey", fontWeight: "500" }}>Excluded:</span> <span className=''>{excluded}</span><br /></>}
					</>
				</Anchor>
				<time>{displayTime}</time>
			</div>}
		</>
	);
};

export default SearchEntry;
