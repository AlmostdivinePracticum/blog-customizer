import { useEffect } from 'react';

type TUseClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useClose({ isOpen, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);

			if (isOutsideClick) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, rootRef]);
}
