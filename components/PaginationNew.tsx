// components/Pagination.tsx
import React from 'react';

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

	return (
		<div className="pagination-container is-flex is-justify-content-space-between is-align-items-center">
			<div className="select">
				<select value={itemsPerPage} onChange={handlePageSizeChange}>
					{pageSizeOptions.map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>
			</div>

			<nav className="pagination" role="navigation" aria-label="pagination">
				<a
					className="pagination-previous"
					onClick={() => handlePageChange(currentPage - 1)}
					style={{ pointerEvents: currentPage === 0 ? 'none' : 'auto', opacity: currentPage === 0 ? 0.5 : 1 }}
				>
					Previous
				</a>
				<a
					className="pagination-next"
					onClick={() => handlePageChange(currentPage + 1)}
					style={{ pointerEvents: currentPage === totalPages - 1 ? 'none' : 'auto', opacity: currentPage === totalPages - 1 ? 0.5 : 1 }}
				>
					Next
				</a>

				<ul className="pagination-list">
					{getPageNumbers().map((page, index) =>
						page === '...' ? (
							<li key={`ellipsis-${index}`}>
								<span className="pagination-ellipsis">&hellip;</span>
							</li>
						) : (
							<li key={page}>
								<a className={`pagination-link ${page === currentPage ? 'is-current' : ''}`} onClick={() => handlePageChange(Number(page))}>
									{Number(page) + 1}
								</a>
							</li>
						)
					)}
				</ul>
			</nav>
		</div>
	);
};

export default PaginationNew;
