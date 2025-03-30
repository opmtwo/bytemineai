import { useEffect, useState } from 'react';
import { format as formatDate, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import Modal from './modals/Modal';
import Card from './cards/Card';
import Slot from './Slot';
import CardTitle from './CardTitle';
import IconClose from './icons/IconClose';
import 'react-day-picker/dist/style.css';

const DatePicker = ({
	value,
	isActive,
	format = 'dd-MM-yyyy',
	onSubmit,
	onCancel,
}: {
	value: string;
	isActive: boolean;
	format?: string;
	onSubmit: (date: string) => void;
	onCancel: () => void;
}) => {
	const [selected, setSelected] = useState<Date>();

	useEffect(() => {
		if (value) {
			setSelected(parse(value, format, new Date()));
		}
	}, [value]);

	const handleDaySelect = (date: Date) => {
		setSelected(date);
		if (date) {
			onSubmit(formatDate(date, format));
		} else {
			onCancel();
		}
	};

	const onGoToToday = () => {
		const today = new Date();
		setSelected(today);
		onSubmit(formatDate(today, format));
	};

	return (
		<Modal isActive={isActive} onCancel={onCancel}>
			<Card>
				<Slot slot="header">
					<CardTitle>Select Date</CardTitle>
					<span className="is-clickable" onClick={onCancel}>
						<IconClose />
					</span>
				</Slot>
				<Slot slot="body">
					<div
						className="panel-block is-flex-direction-column is-align-items-center is-justify-content-flex-start is-justify-content-center"
						style={{ height: 420 }}
					>
						<DayPicker mode="single" defaultMonth={selected} selected={selected} onSelect={handleDaySelect} />
						<span onClick={onGoToToday} className="has-text-grey is-clickable" style={{ marginTop: 'auto' }}>
							Select Today
						</span>
					</div>
				</Slot>
			</Card>
		</Modal>
	);
};

export default DatePicker;
