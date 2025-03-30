import { orderBy } from 'lodash';
import moment from 'moment';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import { genericErrorMessage } from '../consts';
import countryCodes from '../data/country-codes';
import { Contact, RampedUpFilter, SortData, SortOrder } from '../types';
import NotificationPopup from '../components/sections/prospect-finder/NotificationPopup';
import { CloseButton } from 'react-toastify/dist/components';
export const timestampToMoment = (timestamp: string | number) => moment(new Date(parseInt(timestamp.toString())));

export const formatDate = (timestamp?: string | number) => {
	if (!timestamp) {
		return 'NA';
	}
	return timestampToMoment(timestamp).format('MM/DD/YYYY');
};

export const getDisplayTime = (createdAt: string) => {
	const humanDiff = moment(createdAt).fromNow();
	return humanDiff[0].toUpperCase() + humanDiff.substr(1);
};
export const getInitials = (name: any = '') => {
	return name
		.match(/(\b\S)?/g)
		.join('')
		.match(/(^\S|\S$)?/g)
		.join('')
		.toUpperCase();
};
export const arrayToCsv = (data: any[]) => data.reduce((acc, curr) => `${acc}${Object.values(curr).join('|')}\n`, '');
export const arrayToCsvComma = (data: any[]) => data.reduce((acc, curr) => `${acc}${Object.values(curr).join(',')}\n`, '');

export const download = (content: string, fileName: string, mimeType: string) => {
	const a = document.createElement('a');
	mimeType = mimeType || 'application/octet-stream';
	if (URL && 'download' in a) {
		a.href = URL.createObjectURL(
			new Blob([content], {
				type: mimeType,
			})
		);
		a.setAttribute('download', fileName);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	} else {
		location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
	}
};

export const getCountryDialCode = (code: string) => countryCodes.find((data) => data.code === code?.toUpperCase())?.dial_code;

/**
 * Sleep for the specied ms
 * @param ms number
 * @returns Promise
 */
export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

/**
 * @summary
 * Get subdomain from URL
 *
 * @description
 * If localhost then return dev
 *
 * @returns {string}
 */
export const getSubdomain = () => {
	if (window.location.hostname === 'localhost') {
		return 'dev';
	}
	const host = window.location.host;
	if (host.indexOf('.') === -1) {
		return '';
	}
	const parts = host.split('.');
	return parts?.[0];
};

/**
 * @summary
 * Get a summary of the provided RampedUp filter
 *
 * @param rampedUpFilter The input filter data
 * @returns {string} The formatted filter string
 */
export const getFilterLabel = (rampedUpFilter: RampedUpFilter) => {
	let values: string[] = [];
	values.push(rampedUpFilter?.website || '');
	values = values.concat(rampedUpFilter?.keywords?.map((value) => value.label) || []);
	values = values.concat(rampedUpFilter?.companyNames?.map((value) => value.label) || []);
	values = values.concat(rampedUpFilter?.industries?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.sicCodes?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.employeeSizes?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.hqLocations?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.urls?.map((value) => value.label) || []);
	values = values.concat(rampedUpFilter?.cities?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.states?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.companyRevenues?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.companyRevenues?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.companyTypes?.map((value) => value?.label) || []);
	values.push(rampedUpFilter?.yearFounded || '');
	values = values.concat(rampedUpFilter?.jobTitles?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.seniorityLevels?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.departments?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.skills?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.interests?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.schools?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.firstName?.map((value) => value?.label) || []);
	values = values.concat(rampedUpFilter?.lastName?.map((value) => value?.label) || []);
	return values.filter((value) => !isEmpty(value || '')).join(', ');
};

/**
 * @summary
 * Extract hostname from the provided url
 *
 * @see
 * https://stackoverflow.com/a/35222901
 * https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
 *
 * @param url {string} The URL
 * @returns {string} The hostname
 */
export const getHostname = (url: string) => {
	try {
		const hostname = new URL(url).hostname;
		if (hostname) {
			return hostname;
		}
	} catch (e) {
		return url;
	}
	return url;
};

export const notifySuccess = (message: string) =>
	toast(message, {
		type: 'success',
		position: 'bottom-right',
		theme: 'colored',
		hideProgressBar: true,
	});

let toastID: any = '';

export const notifySuccessListAndExport = (message: string, addContact: number, total: number, status: string) => {
	if (toastID) {
		toast.update(toastID, {
			render: <NotificationPopup message={message} addContact={addContact} total={total} status={status} />,
			closeButton: false,
			icon: false,
		});
		if (addContact === total) {
			toastID = '';
		}
	} else {
		toastID = toast(<NotificationPopup message={message} addContact={addContact} total={total} status={status} />, {
			position: 'top-right',
			hideProgressBar: true,
			closeButton: false,
			icon: false,
			className: 'toast-message',
		});
	}
};

export const notifyError = (err: any, message: string = '') =>
	toast(err?.response?.data?.message || err?.message || message || genericErrorMessage, {
		type: 'error',
		position: 'bottom-right',
		theme: 'colored',
		hideProgressBar: true,
	});

export const getSubscriptionInfo = (createdAt: string, interval: string) => {
	const now = moment();
	const then = moment.unix(parseInt(createdAt) / 1000);

	// renewal interval - either 30 / 365
	let intervalDays = 30;
	if (interval === 'Yearly') {
		intervalDays = 365;
	}

	// find the latest starting date based on interval
	const diffInDays = now.diff(then, 'days');
	const offsetDays = diffInDays % intervalDays;
	const startDate = then.add(diffInDays, 'days').subtract(offsetDays, 'days');
	const endDate = startDate.clone().add(intervalDays, 'days');

	// console.log('getSubscriptionStartDate - ', { intervalDays, diffInDays, offsetDays, startDate, endDate });
	return {
		diffInDays,
		offsetDays,
		startDate,
		endDate,
	};
};

export const decodeJson = (value: any) => {
	let result;
	try {
		result = JSON.parse(value);
	} catch (e) {
		result = {};
	}
	return result;
};

/**
 * @summary
 * Reorder an array of items - move one item from x to y
 *
 * @param list {Array} list of items to reorder
 * @param startIndex {number} start index
 * @param endIndex {number} end index
 * @returns {Array}
 */
export const reorder = (list: any[], startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

/**
 * @summary
 * Sort contacts using Lodash
 *
 * @see
 * https://lodash.com/docs/4.17.15#orderBy
 *
 * @returns {Array} sorted contacts data
 */
export const getSortedData = (contactItems: Contact[], sortMap: SortData[]) => {
	const sorts = sortMap.filter((item) => item.sortOrder === SortOrder.asc || item.sortOrder === SortOrder.desc);
	const sortFields = sorts.map((item) => item.id);
	const sortOrders = sorts.map((item) => (item.sortOrder === SortOrder.asc ? 'asc' : 'desc'));

	// console.log({ sortFields, sortOrders });
	return orderBy(contactItems, sortFields, sortOrders);
};

export const formatNumber = (value: string) => {
	const result = parseFloat(value?.toString()?.replace(/,/gi, ''));
	if (!result || isNaN(result)) {
		return;
	}
	return result.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

export const hexToRgb = (hex: string) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
};

export const humanFileSize = (size: number) => {
	var i = size ? Math.floor(Math.log(size) / Math.log(1024)) : 0;
	return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export const downloadBlob = (blob: Blob, filename: string) => {
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename || 'download';
	const clickHandler = () => {
		setTimeout(() => {
			URL.revokeObjectURL(url);
			a.removeEventListener('click', clickHandler);
		}, 150);
	};
	a.addEventListener('click', clickHandler, false);
	a.click();
	return a;
};

export const downloadUrl = (url: string, filename: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.target = '_blank';
	a.download = filename || 'download';
	a.click();
	return a;
};

export const getErrorMessage = (err: any, message?: string) =>
	err?.response?.data?.message || err?.message || err?.response?.statusText || message || genericErrorMessage;
