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
import IconInfo from '../icons/IconInfo';
import IconClose from '../icons/IconClose';
import Uploader from '../Uploader';
import { Enrichment, Upload } from '../../types';
import IconEnrichBulk from '../icons/IconEnrichBulk';
import FormSelect from '../form/FormSelect';
import { formatNumber, getErrorMessage } from '../../utils/helper-utils';
import FormCheckbox from '../form/FormCheckbox';

const EnrichUploadForm = ({
	isActive,
	onSubmit,
	onCancel,
	onUpgrade,
}: {
	isActive?: boolean;
	onSubmit: (value: Enrichment) => void;
	onCancel: () => void;
	onUpgrade: () => void;
}) => {
	// busy and error
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	// current credits of user
	const [credits, setCredits] = useState(0);

	// number of records in csv
	const [noOfCsvRecords, setNoOfCsvRecords] = useState(0);

	// list of csv fields
	const [csvFields, setCsvFields] = useState<string[]>([]);

	// sample row from csv file
	const [sample, setSample] = useState<Record<string, string>>({});

	// user selected fields
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [linkedin, setLinkedin] = useState('');
	const [facebook, setFacebook] = useState('');

	const [phoneRequired, setphoneRequired] = useState(false)
	const [workEmailRequired, setworkEmailRequired] = useState(false)

	// current uploads
	const [uploads, setUploads] = useState<Upload[]>([]);

	// csv upload status
	const [isUploaded, setIsUploaded] = useState(false);

	// current user
	const { user } = useAuthContext();
	const groupname = user?.attributes['custom:group_name'];

	const getInput = async (body: any) => {
		const options = {
			body,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
			},
		};
		return options;
	};

	const onUpload = async (uploads: Upload[]) => {
		try {
			setError(undefined);
			const params = await getInput({ key: uploads[0].key, groupId: groupname });
			const response: { credits: number; csv: { headers: string[]; records: number; sample: Record<string, string> } } = await API.post(
				'restApiExpress',
				'/restapi/enrich/preview',
				params
			);
			setUploads(uploads);
			setCsvFields(response.csv.headers);
			setNoOfCsvRecords(response.csv.records);
			setSample(response.csv.sample);
			setCredits(response.credits);
			setIsUploaded(true);
			setEmail(response.csv.headers.find((value) => value.toLowerCase().includes('email')) || '');
			setPhone(response.csv.headers.find((value) => value.toLowerCase().includes('phone')) || '');
			setLinkedin(response.csv.headers.find((value) => value.toLowerCase().includes('linkedin')) || '');
			setFacebook(response.csv.headers.find((value) => value.toLowerCase().includes('facebook')) || '');
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

		if (!email && !phone && !linkedin && !facebook) {
			setError(new Error('You must select at least one of facebook, linkedin, email or phone'));
			return false;
		}

		if (credits < noOfCsvRecords) {
			// setError(new Error("You don't have enough credits in your account"));
			// return false;
		}

		return isValid;
	};

	const handleSubmit = async (e: FormEvent) => {
		debugger;
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
			const params = await getInput({ ...uploads[0], groupId: groupname, userId: user?.attributes.sub, email, phone, linkedin, facebook, phoneRequired, workEmailRequired });
			const newEnrichment: any = await API.post('restApiExpress', '/restapi/enrich/start', params);
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
		width: '14rem',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	}

	const isColumnSelected = email || phone || linkedin || facebook;

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<Card>
				<Slot slot="header">
					<>
						<CardTitle>Bulk Enrichment</CardTitle>
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
									<span className="tag is-success ml-3">Uploaded</span>
								</span>
								<span className="is-flex is-align-items-center">
									<strong>{formatNumber(noOfCsvRecords.toString())}</strong>
									<span>&nbsp;rows</span>
								</span>
							</div>
							<div className="panel-block is-block py-6">
								<ErrorNotificaition error={error} className="has-text-centered pb-4" />
								<p className="mb-5">Map at least one of the following fields:</p>
								<div className="columns is-mobile is-align-items-center is-multiline">
									<div className="column is-3 ">
										<strong className="has-text-grey ml-2">Our Fields</strong>
									</div>
									<div className="column is-4 is-flex is-justify-content-center">
										<strong className="has-text-grey">File Column Header</strong>
									</div>
									<div className="column is-5 is-flex is-justify-content-center">
										<strong className="has-text-grey">Example Data</strong>
									</div>

									<div className="column is-3">
										<span>LinkedIn URL</span>
									</div>
									<div className="column is-4">
										<FormSelect placeholder="None" options={csvOptions} value={linkedin} onChange={setLinkedin} />
									</div>
									<div className="column is-5 is-flex is-justify-content-center">
										<span style={style} title={sample?.[linkedin]}>{sample?.[linkedin]}</span>
									</div>

									<div className="column is-3">
										<span>Email Address</span>
									</div>
									<div className="column is-4">
										<FormSelect placeholder="None" options={csvOptions} value={email} onChange={setEmail} />
									</div>
									<div className="column is-5 is-flex is-justify-content-center">
										<span style={style} title={sample?.[email]}>{sample?.[email]}</span>
									</div>

									<div className="column is-3">
										<span>Phone Number</span>
									</div>
									<div className="column is-4">
										<FormSelect placeholder="None" options={csvOptions} value={phone} onChange={setPhone} />
									</div>
									<div className="column is-5 is-flex is-justify-content-center">
										<span style={style} title={sample?.[phone]}>{sample?.[phone]}</span>
									</div>

									<div className="column is-3">
										<span>Facebook URL</span>
									</div>
									<div className="column is-4">
										<FormSelect placeholder="None" options={csvOptions} value={facebook} onChange={setFacebook} />
									</div>
									<div className="column is-5 is-flex is-justify-content-center">
										<span style={style} title={sample?.[facebook]}>{sample?.[facebook]}</span>
									</div>
								</div>
								<p className='mb-5'><strong className="has-text-grey">Show contacts that must contain:</strong></p>
								<div className='is-block'>
									<FormCheckbox
										value={phoneRequired}
										label='Phone Number'
										isChecked={phoneRequired}
										onChange={setphoneRequired}
									/>
									<FormCheckbox
										value={workEmailRequired}
										label='Work Email'
										isChecked={workEmailRequired}
										onChange={setworkEmailRequired}
									/>
								</div>
								
							</div>
						</>
					) : (
						<div className="panel-block is-block">
							<ErrorNotificaition error={error} className="has-text-centered pb-5" />
							<Uploader uploads={uploads} onUpload={onUpload} />
							<div className="is-flex is-align-items-center my-6">
								<IconBulb width={32} />
								<p className="ml-3">
									Your file must be a CSV format and contain at lease one column with email addresses, phone numbers, or personal LinkedIn or FaceBook 
									profile URLs.
								</p>
							</div>
						</div>
					)}
				</Slot>
				{isUploaded ? (
					<Slot slot="footer">
						<div className="is-fullwidth is-flex is-align-items-center is-justify-content-space-between py-2">
							{credits >= noOfCsvRecords ? (
								<>
									<div className="is-flex is-align-items-center">
										<p>You will use up to {noOfCsvRecords} credits.</p>
									</div>
									<FormButton
										type="submit"
										onClick={handleSubmit}
										disabled={isBusy || !isColumnSelected}
										loading={isBusy}
										variant={['is-outlined', 'is-ui-button']}
									>
										Enrich
									</FormButton>
								</>
							) : (
								<>
									<div className="is-flex is-align-items-center">
										<IconInfo />
										<p className="ml-3">
											You don’t have enough credits. <br />
											Upgrade or upload a smaller file.
										</p>
									</div>
									<FormButton type="button" onClick={onUpgrade} disabled={isBusy} loading={isBusy} variant={['is-outlined', 'is-ui-button']}>
										Upgrade
									</FormButton>
								</>
							)}
						</div>
					</Slot>
				) : null}
			</Card>
		</form>
	);
};

export default EnrichUploadForm;
