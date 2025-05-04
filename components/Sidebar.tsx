'use client';

import classNames from 'classnames';
import Link from 'next/link';
import React, { HTMLAttributeAnchorTarget, MouseEvent, ReactNode, useState } from 'react';

import styles from './Sidebar.module.css';
import IconNewList from './icons/IconNewList';
import { useHeader } from '../providers/header-provider';

export type SidebarMenuItem = {
	label: string;
	icon: ReactNode;
	href: string;
	target?: HTMLAttributeAnchorTarget;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

type SidebarProps = {
	items: SidebarMenuItem[];
	bottomItems?: SidebarMenuItem[];
	compact?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ items, bottomItems = [], compact = false }) => {
	const { isOpen, isCompact, isDrawerOpen, onCompactToggle } = useHeader();

	return (
		<>
			{/* Mobile Toggle */}
			{/* <button className={`button is-white is-hidden-tablet ${styles.mobileToggle}`} onClick={() => setIsMobileOpen(!isMobileOpen)}>
				<IconNewList width={24} />
			</button> */}

			{/* Sidebar */}
			<aside
				className={classNames('sidebar menu has-background-white-bis has-text-weight-semibold', styles.sidebar, {
					[styles.compact]: isCompact,
					[styles.open]: isDrawerOpen,
					[styles.mobile]: true,
					'is-compact': isCompact,
					'has-text-centered': isCompact,
				})}
			>
				{/* Logo */}
				<div className="menu-label has-text-centered mb-5">
					{/* {!isCompact && <h1 className="has-text-danger has-text-weight-bold is-size-4">NIMBLER</h1>} */}
					{/* {!isCompact && <img src="/logo.png" alt="" width={212} />} */}
				</div>

				{/* Top Menu */}
				<ul className="menu-list">
					{items.map(({ label, icon, href, target, onClick }) => (
						<li key={label}>
							<Link
								href={href}
								className={classNames('is-flex is-align-items-center py-4 px-5', { 'is-justify-content-center': isCompact })}
								title={label}
								target={target}
								onClick={onClick}
							>
								{icon}
								{!isCompact && <span className="ml-5">{label}</span>}
							</Link>
						</li>
					))}
				</ul>

				<div className="is-flex-grow-1"></div>

				{/* Bottom Menu */}
				<ul className="menu-list mt-auto">
					{bottomItems.map(({ label, icon, href, target, onClick }) => (
						<li key={label}>
							<Link
								href={href}
								className={classNames('is-flex is-align-items-center py-4 px-5', { 'is-justify-content-center': isCompact })}
								title={label}
								target={target}
								onClick={onClick}
							>
								{icon}
								{!isCompact && <span className="ml-5">{label}</span>}
							</Link>
						</li>
					))}
				</ul>

				{/* Toggle Compact Mode */}
				{/* <div className="mt-4 has-text-centered">
					<button className="button is-small is-light is-rounded" onClick={onCompactToggle}>
						{isCompact ? '➕ Expand' : '➖ Compact'}
					</button>
				</div> */}
			</aside>
		</>
	);
};

export default Sidebar;
