import slugify from 'slugify';
import React, { CSSProperties, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { Storage } from '@aws-amplify/storage';
import { useDropzone } from 'react-dropzone';
import { Upload } from '../types';
import { notifyError } from '../utils/helper-utils';
import IconUpload from './icons/IconUpload';
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

const Uploader = ({ uploads = [], maxSize = 100, onUpload }: { uploads: Upload[]; maxSize?: number; onUpload: (uploads: Upload[]) => void }) => {
	const [isBusy, setIsBusy] = useState(false);
	const [error, setError] = useState<Error>();

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
					const binaryStr = reader.result;
					const slug = slugify(file.name);
					const key = `${v4()}/${slug}`;
					await Storage.put(key, binaryStr, {
						level: 'public',
					});
					const s3Key = `public/${key}`;
					await onUpload([...uploads, { key: s3Key, name: file.name, size: file.size, createdAt: +new Date() }]);
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
				<IconUpload width={20} />
				<p className="has-text-weight-light">Click to upload or drag a file</p>
				{isBusy && (
					<div className="is-overlay has-background-white" style={{ opacity: 0.9 }}>
						<Loader />
					</div>
				)}
			</div>
		</>
	);
};

export default Uploader;
