import { CSSProperties, FormEvent, useState } from 'react';

import { useAuthContext } from '../../providers/auth-data-provider';
import { IBytemineEnrichment, Upload } from '../../types';
import { callApi, getErrorMessage } from '../../utils/helper-utils';
import Card from '../cards/Card';
import CardTitle from '../CardTitle';
import FormButton from '../form/FormButton';
import FormButtonNew from '../form/FormButtonNew';
import FormSelect from '../form/FormSelect';
import IconBulb from '../icons/IconBulb';
import IconClose from '../icons/IconClose';
import IconInfo from '../icons/IconInfo';
import IconNewBulkEnrichment from '../icons/IconNewBulkEnrichment';
import LoaderFullscreen from '../LoaderFullscreen';
import ErrorNotificaition from '../notifications/ErrorNotification';
import Slot from '../Slot';
import Uploader from '../Uploader';

const EnrichUploadForm = ({
	isActive,
	onSubmit,
	onCancel,
	onUpgrade,
}: {
	isActive?: boolean;
	onSubmit: (value: IBytemineEnrichment) => void;
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

	const [file, setFile] = useState<File>();
	const [key, setKey] = useState<string>();
	const [name, setName] = useState<string>();
	const [size, setSize] = useState<number>();

	const [phoneRequired, setphoneRequired] = useState(false);
	const [workEmailRequired, setworkEmailRequired] = useState(false);

	// current uploads
	const [uploads, setUploads] = useState<Upload[]>([]);

	// csv upload status
	const [isUploaded, setIsUploaded] = useState(false);

	// current user
	const { attributes } = useAuthContext();

	const onUpload = async (s3Key: string, file: File) => {
		try {
			setError(undefined);
			setKey(s3Key);
			setFile(file);
			setName(file.name);
			setSize(file.size);
			const response = (await callApi(null, '/api/v1/enrichments/preview', {
				method: 'POST',
				body: JSON.stringify({
					key: s3Key,
				}),
			})) as { credits: number; csv: { headers: string[]; records: number; sample: Record<string, string> } };
			// setUploads(uploads);
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

		// if (!uploads?.length) {
		// 	setError(new Error('You must upload a valid csv file'));
		// 	return false;
		// }

		if (!key || !name || !size) {
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
		e.preventDefault();
		setIsBusy(true);
		const isValid = await isFormValid();
		if (!isValid) {
			setIsBusy(false);
			return;
		}
		try {
			// const params = await getInput({ ...uploads[0], groupId: groupname, userId: user?.attributes.sub, email, phone, linkedin, facebook, phoneRequired, workEmailRequired });
			const newEnrichment = (await callApi(null, 'api/v1/enrichments', {
				method: 'POST',
				body: JSON.stringify({ email, phone, linkedin, facebook, key, name, size }),
			})) as IBytemineEnrichment;
			// const newEnrichment: any = await API.post('restApiExpress', '/restapi/enrich/start', params);
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
	};

	const isColumnSelected = email || phone || linkedin || facebook;

	return (
		<form method="POST" onSubmit={handleSubmit}>
			{isBusy ? <LoaderFullscreen /> : null}
			<Card>
				<Slot slot="body">
					<div className="is-flex is-align-items-center is-justify-content-space-between px-5 pt-5">
						<div className="is-flex is-align-items-center">
							<IconNewBulkEnrichment width={56} className="mr-5" />
							<CardTitle>
								Bulk Enrichment
								<br />
								<small className="has-text-weight-light is-size-6">Upload and attach files to this project.</small>
							</CardTitle>
						</div>
						<span className="is-clickable mb-auto ml-auto" onClick={onCancel}>
							<IconClose />
						</span>
					</div>

					{isUploaded ? (
						<>
							<div className="panel-block is-block">
								<ErrorNotificaition error={error} className="has-text-centered pb-4" />

								{/* {file ? (
									<>
										<div className="has-border has-radius is-clipped p-5 is-flex is-align-items-center mb-5">
											<IconNewCsv width={32} />
											<span className="ml-3">
												<strong>{file.name}</strong>
												<br />
												<span>{humanFileSize(file.size)}</span>
												&nbsp;
												<span>100% uploaded</span>
											</span>
											<span className="ml-auto is-clickable">
												<IconNewTrash width={20} onClick={onCancel} />
											</span>
										</div>
									</>
								) : null} */}

								<p className="has-text-centered mb-5">
									<strong>Map at least one of the following fields:</strong>
								</p>

								<div className="has-border has-radius is-clipped">
									<div className="columns is-mobile is-align-items-center is-multiline p-3 has-background-white-bis">
										<div className="column is-3 ">
											<strong className="has-text-grey">Field</strong>
										</div>
										<div className="column is-4">
											<strong className="has-text-grey">Your CSV Field</strong>
										</div>
										<div className="column is-5">
											<strong className="has-text-grey">Example Data</strong>
										</div>
									</div>

									<div className="columns is-mobile is-align-items-center is-multiline px-3 py-1 has-border-b">
										<div className="column is-3">
											<span>LinkedIn URL</span>
										</div>
										<div className="column is-4">
											<FormSelect placeholder="None" options={csvOptions} value={linkedin} onChange={setLinkedin} />
										</div>
										<div className="column is-5">
											<span style={style} title={sample?.[linkedin]}>
												{sample?.[linkedin]}
											</span>
										</div>
									</div>

									<div className="columns is-mobile is-align-items-center is-multiline px-3 py-1 has-border-b">
										<div className="column is-3">
											<span>Email Address</span>
										</div>
										<div className="column is-4">
											<FormSelect placeholder="None" options={csvOptions} value={email} onChange={setEmail} />
										</div>
										<div className="column is-5 is-flex is-justify-content-center">
											<span style={style} title={sample?.[email]}>
												{sample?.[email]}
											</span>
										</div>
									</div>

									<div className="columns is-mobile is-align-items-center is-multiline px-3 py-1 has-border-b">
										<div className="column is-3">
											<span>Phone Number</span>
										</div>
										<div className="column is-4">
											<FormSelect placeholder="None" options={csvOptions} value={phone} onChange={setPhone} />
										</div>
										<div className="column is-5 is-flex is-justify-content-center">
											<span style={style} title={sample?.[phone]}>
												{sample?.[phone]}
											</span>
										</div>
									</div>

									<div className="columns is-mobile is-align-items-center is-multiline px-3 py-1 pb-5">
										<div className="column is-3">
											<span>Facebook URL</span>
										</div>
										<div className="column is-4">
											<FormSelect placeholder="None" options={csvOptions} value={facebook} onChange={setFacebook} />
										</div>
										<div className="column is-5 is-flex is-justify-content-center">
											<span style={style} title={sample?.[facebook]}>
												{sample?.[facebook]}
											</span>
										</div>
									</div>
								</div>

								{/* <p className="mb-5">
									<strong className="has-text-grey">Show contacts that must contain:</strong>
								</p>
								<div className="is-block">
									<FormCheckbox value={phoneRequired} label="Phone Number" isChecked={phoneRequired} onChange={setphoneRequired} />
									<FormCheckbox value={workEmailRequired} label="Work Email" isChecked={workEmailRequired} onChange={setworkEmailRequired} />
								</div> */}
							</div>
						</>
					) : (
						<div className="panel-block is-block">
							<ErrorNotificaition error={error} className="has-text-centered pb-5" />
							<Uploader uploadPath={`public/${attributes?.sub}/uploads`} uploads={uploads} onUpload={onUpload} />
							<div className="is-flex is-align-items-center pt-5">
								<IconBulb width={32} />
								<p className="ml-3">
									Your file must be a CSV format and contain at lease one column with email addresses, phone numbers, or personal LinkedIn or
									FaceBook profile URLs.
								</p>
							</div>
						</div>
					)}
				</Slot>
				{isUploaded ? (
					<Slot slot="footer">
						<div className="is-fullwidth is-flex is-align-items-center is-justify-content-space-between">
							{credits >= noOfCsvRecords ? (
								<>
									<div className="is-flex is-align-items-center mr-auto">
										<p>You will use up to {noOfCsvRecords} credits.</p>
									</div>
									{/* <FormButton
										type="submit"
										onClick={handleSubmit}
										disabled={isBusy || !isColumnSelected}
										loading={isBusy}
										variant={['is-outlined', 'is-ui-button']}
									>
										Enrich
									</FormButton> */}

									<div className="is-flex is-justify-content-flex-end ml-auto">
										<FormButtonNew type="button" variant="default" className="mr-5" onClick={onCancel} disabled={!file}>
											Back
										</FormButtonNew>
										<FormButtonNew type="button" variant="active" onClick={handleSubmit} disabled={!file || isBusy || !isColumnSelected}>
											Next
										</FormButtonNew>
									</div>
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
