import React, { CSSProperties, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import slugify from 'slugify';
import { v4 } from 'uuid';

import { uploadData } from '@aws-amplify/storage';

import { Upload } from '../types';
import { humanFileSize, notifyError, sleep } from '../utils/helper-utils';
import FormButtonNew from './form/FormButtonNew';
import IconNewBulkEnrichUpload from './icons/IconNewBulkEnrichUpload';
import IconNewCsv from './icons/IconNewCsv';
import IconNewTrash from './icons/IconNewTrash';
import Loader from './Loader';
import ErrorNotificaition from './notifications/ErrorNotification';

const baseStyle: CSSProperties = {
	position: 'relative',
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: 180,
	padding: '2rem',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#789',
	borderStyle: 'dashed',
	backgroundColor: 'transparent',
	color: '#789',
	cursor: 'pointer',
	outline: 'none',
	transition: 'border .24s ease-in-out',
};

const focusedStyle: CSSProperties = {
	borderColor: '#2196f3',
};

const acceptStyle: CSSProperties = {
	borderColor: '#00e676',
};

const rejectStyle: CSSProperties = {
	borderColor: '#ff1744',
};

const Uploader = ({
	uploadPath,
	uploads = [],
	maxSize = 100,
	onUpload,
}: {
	uploadPath: string;
	uploads: Upload[];
	maxSize?: number;
	onUpload: (s3Key: string, file: File) => void;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

	const [binaryStr, setBinaryStr] = useState<string | ArrayBuffer | null>();
	const [file, setFile] = useState<File>();

	const [totalBytes, setTotalBytes] = useState(0);
	const [transferredBytes, setTransferredBytes] = useState(0);

	const onDrop = (acceptedFiles: File[]) => {
		setIsBusy(true);
		acceptedFiles.forEach((file: File) => {
			setIsBusy(true);
			const reader = new FileReader();
			reader.onabort = () => {
				const msg = `${file.name} upload aborted`;
				console.log(msg);
				setError(new Error(msg));
				setIsBusy(false);
			};
			reader.onerror = () => {
				const msg = `${file.name} reading has failed`;
				console.log(msg);
				setError(new Error(msg));
				setIsBusy(false);
			};
			reader.onload = async () => {
				try {
					const maxFileSize = maxSize * 1000 * 1000; // bytes * kilobytes * megabytes =  100mb
					if (file.size > maxFileSize) {
						setError(new Error('Maximum allowed file size is 100 mb'));
						setIsBusy(false);
						return;
					}
					if (file.type != 'text/csv') {
						setError(new Error('Only CSV files are supported'));
						setIsBusy(false);
						return;
					}
					setFile(file);
					setBinaryStr(reader.result);
				} catch (err) {
					const msg = `Error uploading ${file.name}`;
					console.log(msg, err);
					setError(new Error(msg));
					notifyError(null, msg);
				}
				setIsBusy(false);
			};
			reader.readAsArrayBuffer(file);
		});
	};

	const onSubmit = async () => {
		if (!file || !binaryStr) {
			return;
		}
		setIsBusy(true);
		try {
			const slug = slugify(file.name);
			const key = `${uploadPath}/${v4()}/${slug}`;
			await uploadData({
				path: key,
				data: binaryStr as ArrayBuffer,
				options: {
					contentType: file.type,
					onProgress: async (e) => {
						setTotalBytes(e.totalBytes || 0);
						setTransferredBytes(e.transferredBytes);
						if (e.transferredBytes !== e.totalBytes) {
							return;
						}
						await sleep(1000);
						const s3Key = key;
						await onUpload(s3Key, file);
						setIsBusy(false);
					},
				},
			});
		} catch (err) {
			console.log('onSubmit - error', err);
			const msg = `Error uploading ${file.name}`;
			console.log(msg, err);
			setError(new Error(msg));
			notifyError(null, msg);
			setIsBusy(false);
		}
	};

	const onCancel = async () => {
		setFile(undefined);
		setBinaryStr(undefined);
	};

	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		maxFiles: 1,
		maxSize: 1000 * 1000 * 100,
	});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<>
			<ErrorNotificaition error={error} className="has-text-centered pb-5" />
			<div className="has-border has-radius is-clipped" {...getRootProps({ style })}>
				<input {...getInputProps()} accept=".csv" />
				<IconNewBulkEnrichUpload width={56} />
				<p>
					<strong className="has-text-link">Click to upload</strong>
					&nbsp;
					<span>or drag and drop</span>
				</p>
				{isBusy && (
					<div className="is-overlay has-background-white" style={{ opacity: 0.9 }}>
						<Loader />
					</div>
				)}
			</div>
			{file ? (
				<>
					<div className="has-border has-radius is-clipped p-5 is-flex is-align-items-center my-5">
						<IconNewCsv width={32} />
						<span className="ml-3">
							<strong>{file.name}</strong>
							<br />
							<span>{humanFileSize(file.size)}</span>
							{transferredBytes ? <span>{Math.round((transferredBytes / totalBytes) * 100)}% uploaded</span> : null}
						</span>
						<span className="ml-auto is-clickable">
							<IconNewTrash width={20} onClick={onCancel} />
						</span>
					</div>
				</>
			) : null}
			<div className="is-flex is-justify-content-flex-end mt-5">
				<FormButtonNew type="button" variant="default" className="mr-5" onClick={onCancel} disabled={!file}>
					Back
				</FormButtonNew>
				<FormButtonNew type="button" variant="active" onClick={onSubmit} disabled={!file}>
					Next
				</FormButtonNew>
			</div>
		</>
	);
};

export default Uploader;
