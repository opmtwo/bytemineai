import { MouseEvent, useState } from 'react';

const Summary = ({ text, length = 180 }: { text: string; length?: number }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const onShowMore = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsExpanded(true);
	};

	const onShowLess = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsExpanded(false);
	};

	if (!text) {
		return null;
	}

	// For Text that is shorter than desired length
	if (text.length <= length) {
		return <p>text</p>;
	}

	// If text is longer than desired length & showMore is true
	if (text.length > length && isExpanded) {
		return (
			<>
				<p>{text}</p>
				<span className="is-clickable has-text-primary" onClick={onShowLess}>
					Show Less
				</span>
			</>
		);
	}

	// If text is longer than desired length & showMore is false
	if (text.length > length) {
		return (
			<>
				<p>{text.slice(0, length)}&hellip;</p>
				<span className="is-clickable has-text-primary" onClick={onShowMore}>
					Show More
				</span>
			</>
		);
	}

	return <p>text</p>;
};

export default Summary;
