'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface ContextProps {
	isOpen?: boolean;
	isCompact?: boolean;
	isDrawerOpen?: boolean;
	onToggle: () => void;
	onCompactToggle: () => void;
	onOpen: () => void;
	onClose: () => void;
	onDrawerToggle: () => void;
	onDrawerOpen: () => void;
	onDrawerClose: () => void;
}

const HeaderContext = createContext<ContextProps>({
	isOpen: false,
	isDrawerOpen: false,
	onToggle: () => { },
	onCompactToggle: () => { },
	onOpen: () => { },
	onClose: () => { },
	onDrawerToggle: () => { },
	onDrawerOpen: () => { },
	onDrawerClose: () => { },
});

export const HeaderContextProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false);
	
	const [isCompact, setIsCompact] = useState(false);

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	useEffect(() => {
		document.body.classList.add('body');
	}, []);

	useEffect(() => {
		if (window.innerWidth > 1024) {
			setIsOpen(true);
			setIsCompact(false);
			setIsDrawerOpen(true);
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('is-open');
		} else {
			document.body.classList.remove('is-open');
		}
	}, [isOpen]);

	useEffect(() => {
		if (isCompact) {
			document.body.classList.add('is-compact');
		} else {
			document.body.classList.remove('is-compact');
		}
	}, [isCompact]);

	useEffect(() => {
		if (isDrawerOpen) {
			document.body.classList.add('is-drawer-open');
		} else {
			document.body.classList.remove('is-drawer-open');
		}
	}, [isDrawerOpen]);

	const onToggle = () => {
		setIsOpen(!isOpen);
	};

	const onCompactToggle = () => {
		setIsCompact(!isCompact);
	};

	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	const onDrawerToggle = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const onDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const onDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<HeaderContext.Provider value={{ isOpen, isCompact, isDrawerOpen, onToggle, onCompactToggle, onOpen, onClose, onDrawerToggle, onDrawerOpen, onDrawerClose }}>
			{children}
		</HeaderContext.Provider>
	);
};

export const useHeader = () => useContext(HeaderContext);
