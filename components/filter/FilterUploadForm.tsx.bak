import { CSSProperties, FormEvent, useState } from 'react';
import API from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { useAuthContext } from '../../providers/auth-data-provider';
import Card from '../cards/Card';
import Slot from '../Slot';
import CardTitle from '../CardTitle';
import ErrorNotificaition from '../notifications/ErrorNotification';
import FormButton from '../form/FormButton';
import IconBulb from '../icons/IconBulb';
import IconClose from '../icons/IconClose';
import Uploader from '../Uploader';
import { FilterItem, Upload } from '../../types';
import IconEnrichBulk from '../icons/IconEnrichBulk';
import FormSelect from '../form/FormSelect';
import { formatNumber, getErrorMessage } from '../../utils/helper-utils';

const FilterUploadForm = ({
	fieldId,
	fieldLabel,
	maxSize = 5000,
	fieldFinder,
	onSubmit,
	onCancel,
}: {
	fieldId: string;
	fieldLabel: string;
	maxSize?: number;
	fieldFinder: (value: string) => boolean;
	onSubmit: (values: FilterItem[]) => void;
	onCancel: () => void;
}) => {
	// busy and error
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	// number of records in csv
	const [noOfCsvRecords, setNoOfCsvRecords] = useState(0);

	// list of csv fields
	const [csvFields, setCsvFields] = useState<string[]>([]);

	// sample row from csv file
	const [sample, setSample] = useState<Record<string, string>>({});

	// user selected fields
	const [columnId, setColumnId] = useState('');

	// current uploads
	const [uploads, setUploads] = useState<Upload[]>([]);

	// csv upload status
	const [isUploaded, setIsUploaded] = useState(false);

	// current user
	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const onReset = (): void => {
		setError(undefined);
		setUploads([]);
		setCsvFields([]);
		setSample({});
		setColumnId('');
		setIsUploaded(false);
		setIsBusy(false);
	};

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: (await Auth.currentSession()).getAccessToken().getJwtToken(),
			},
		};
		return options;
	};

	const onUpload = async (uploads: Upload[]) => {
		try {
			setError(undefined);
			const params = await getInput({ key: uploads[0].key });
			const response: { credits: number; csv: { headers: string[]; records: number; sample: Record<string, string> } } = await API.post(
				'restApiExpress',
				'/restapi/filters/preview',
				params
			);
			setUploads(uploads);
			setCsvFields(response.csv.headers);
			setNoOfCsvRecords(response.csv.records);
			setSample(response.csv.sample);
			setIsUploaded(true);
			const domainFieldIndex = Object.keys(response.csv.sample).findIndex((_key) => fieldFinder(response.csv.sample[_key].trim()));
			if (domainFieldIndex !== -1) {
				setColumnId(response.csv.headers[domainFieldIndex]);
			}
		} catch (err) {
			console.log('onUpload - error -', err);
			setError(err);
		}
	};

	const isFormValid = () => {
		let isValid = true;

		if (!uploads?.length) {
			setError(new Error('You must upload a valid csv file'));
			return false;
		}

		if (!columnId) {
			setError(new Error('You must select the target csv column to use'));
			return false;
		}

		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(undefined);
		setIsBusy(true);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		setIsBusy(true);
		try {
			const params = await getInput({ ...uploads[0], key: uploads[0].key, fieldId, columnId });
			const newEnrichment: any = await API.post('restApiExpress', '/restapi/filters', params);
			onSubmit(newEnrichment);
		} catch (err) {
			console.log('handleSubmit - error', err);
			setError(new Error(getErrorMessage(err)));
		}
		setIsBusy(false);
	};

	const csvOptions = csvFields.map((value) => ({ id: value, name: value }));

	const style: CSSProperties = {
		overflow: 'hidden',
		display: 'block',
		width: '12rem',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	};

	return (
		<Card>
			<Slot slot="header">
				<>
					<CardTitle>Upload List</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</>
			</Slot>
			<Slot slot="body">
				{isUploaded ? (
					<>
						<div className="panel-block is-flex is-align-items-center is-justify-content-space-between py-6">
							<span className="is-flex is-align-items-center">
								<IconEnrichBulk width={20} fill="var(--primary)" />
								<span className="ml-3">{uploads?.[0]?.name || '-'}</span>
								<span className="tag is-success ml-3 mr-5">Uploaded</span>
							</span>
							<span className="is-flex is-align-items-center">
								<strong>{formatNumber(noOfCsvRecords.toString())}</strong>
								<span>&nbsp;rows</span>
							</span>
						</div>
						<div className="panel-block is-block py-6 is-clipped">
							<ErrorNotificaition error={error} className="has-text-centered pb-5" />
							<p className="mb-5">Map at least one of the following fields:</p>
							<div className="columns is-mobile is-align-items-center is-multiline">
								<div className="column is-4">
									<strong className="has-text-grey">Our Fields</strong>
								</div>
								<div className="column is-4">
									<strong className="has-text-grey">File Column Header</strong>
								</div>
								<div className="column is-4">
									<strong className="has-text-grey">Example Data</strong>
								</div>

								<div className="column is-4">
									<span>{fieldLabel}</span>
								</div>
								<div className="column is-4">
									<FormSelect placeholder="None" options={csvOptions} value={columnId} onChange={setColumnId} />
								</div>
								<div className="column is-4">
									<span style={style} title={sample?.[columnId]}>
										{sample?.[columnId]}
									</span>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="panel-block is-block">
						<ErrorNotificaition error={error} className="has-text-centered pb-5" />
						<Uploader maxSize={5} uploads={uploads} onUpload={onUpload} />
						<div className="is-flex is-align-items-center my-6">
							<IconBulb width={32} />
							<p className="ml-3">Your file must be a CSV format and contain at least one column with the {fieldLabel.toLowerCase()}.</p>
						</div>
					</div>
				)}
			</Slot>
			{isUploaded ? (
				<Slot slot="footer">
					<div className="is-fullwidth is-flex is-align-items-center is-justify-content-space-between">
						{maxSize <= noOfCsvRecords ? (
							<>
								<div className="is-flex is-align-items-center">
									<p className="ml-3">Max of {maxSize} rows accepted in the CSV file</p>
								</div>
								<FormButton type="submit" onClick={onReset} variant={['is-outlined', 'is-ui-button']}>
									Upload new CSV
								</FormButton>
							</>
						) : (
							<>
								<div className="is-flex is-align-items-center">
									<FormButton type="submit" onClick={onReset} variant={['is-outlined', 'is-ui-button']} disabled={isBusy}>
										Reset
									</FormButton>
								</div>
								<FormButton
									type="button"
									onClick={handleSubmit}
									disabled={isBusy || !columnId}
									loading={isBusy}
									variant={['is-outlined', 'is-ui-button']}
								>
									Upload
								</FormButton>
							</>
						)}
					</div>
				</Slot>
			) : null}
		</Card>
	);
};

export default FilterUploadForm;
