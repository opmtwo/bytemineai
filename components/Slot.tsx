import { ReactNode } from 'react';

const Slot = ({ children, slot }: { children: ReactNode; slot: string }) => <>{children}</>;

export default Slot;
