import { useEffect, useRef } from 'react';
import { useUserContext } from '@/contexts/user/userContext';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { useRouter } from 'next/navigation';
import styles from './navigation.module.css';
import Image from 'next/image';

type AvatarMenuProps = {
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarMenu({ setShowMenu }: AvatarMenuProps) {
    const router = useRouter();
    const { setUser } = useUserContext();
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const clickEvent = (event: globalThis.MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', clickEvent);

        return () => {
            document.removeEventListener('click', clickEvent);
        };
    }, [setShowMenu]);

    async function handleLogout() {
        const csrfToken: string = await getCSRFToken();
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            setUser({ isAuthenticated: false });
            router.push('/');
        }
    }

    return (
        <div
            className={styles['avatar-menu']}
            ref={menuRef}
        >
            <button
                onClick={handleLogout}
                className={styles['avatar-menu-button']}
            >
                Logout
                <Image
                    src="/images/icons/logout.svg"
                    width={24}
                    height={24}
                    alt="Logout image"
                />
            </button>
        </div>
    );
}
