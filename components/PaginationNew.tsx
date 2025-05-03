import React, { CSSProperties } from 'react';

import FormButtonNew from './form/FormButtonNew';
import IconNewArrowLeft from './icons/IconNewArrowLeft';
import IconNewArrowRight from './icons/IconNewArrowRight';

interface PaginationProps {
	currentPage: number; // 0-indexed
	itemsPerPage: number;
	totalCount: number;
	onPageChange: (newPage: number, newItemsPerPage: number) => void;
	pageSizeOptions?: number[];
}

const PaginationNew: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalCount, onPageChange, pageSizeOptions = [10, 20, 50, 100] }) => {
	const totalPages = Math.ceil(totalCount / itemsPerPage);

	const getPageNumbers = (): (number | string)[] => {
		const pages: (number | string)[] = [];

		if (totalPages <= 7) {
			for (let i = 0; i < totalPages; i++) pages.push(i);
			return pages;
		}

		pages.push(0);

		if (currentPage > 3) {
			pages.push('...');
		}

		const start = Math.max(1, currentPage - 1);
		const end = Math.min(totalPages - 2, currentPage + 2);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (currentPage + 2 < totalPages - 2) {
			pages.push('...');
		}

		pages.push(totalPages - 1);
		return pages;
	};

	const handlePageChange = (page: number) => {
		if (page >= 0 && page < totalPages) {
			onPageChange(page, itemsPerPage);
		}
	};

	const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSize = parseInt(e.target.value, 10);
		onPageChange(0, newSize); // Reset to page 0 on size change
	};

	const buttonStyle: CSSProperties = { height: '2rem', padding: '0 0.75rem' };

	return (
		<div className="pagination-container is-flex is-justify-content-space-between is-align-items-center is-fullwidth">
			<div className="is-flex is-align-items-center mr-auto">
				<div className="select is-small is-flex is-align-items-center mr-2">
					<select value={itemsPerPage} style={{ ...buttonStyle, padding: '0 2rem 0 1rem' }} onChange={handlePageSizeChange}>
						{pageSizeOptions.map((size) => (
							<option key={size} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>
				<span className="ml-2">
					Showing {(currentPage + 1) * itemsPerPage} of {totalCount} enties
				</span>
			</div>

			<nav className="pagination" role="navigation" aria-label="pagination">
				<FormButtonNew
					className="mx-1"
					style={{ height: '2rem', padding: '0 0.75rem' }}
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 0}
				>
					<IconNewArrowLeft width={6} />
					<span className="ml-1">Previous</span>
				</FormButtonNew>
				<ul className="is-flex is-align-items-center">
					{getPageNumbers().map((page, index) =>
						page === '...' ? (
							<li key={`ellipsis-${index}`}>
								<span className="pagination-ellipsis">&hellip;</span>
							</li>
						) : (
							<li key={page} className="mx-1">
								<FormButtonNew
									variant={page === currentPage ? 'active' : 'default'}
									style={buttonStyle}
									onClick={() => handlePageChange(Number(page))}
								>
									{Number(page) + 1}
								</FormButtonNew>
							</li>
						)
					)}
				</ul>
				<FormButtonNew className="mx-1" style={buttonStyle} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
					<span className="mr-1">Next</span>
					<IconNewArrowRight width={6} />
				</FormButtonNew>
			</nav>
		</div>
	);
};

export default PaginationNew;
