import { useEffect, useRef } from 'react';
import { AccessToken } from '@/utils/client/tokenRefresh';
import { useUserContext } from '@/contexts/user/userContext';
import styles from './navigation.module.css';
import Image from 'next/image';
import Cookies from 'js-cookie';

type AvatarMenuProps = {
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarMenu({ setShowMenu }: AvatarMenuProps) {
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
        let csrfToken: string | undefined = Cookies.get('csrftoken');

        if (!csrfToken) {
            await fetch('/api/auth/token/csrf');

            csrfToken = Cookies.get('csrftoken') as string;
        }

        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken // eslint-disable-line @typescript-eslint/naming-convention
            }
        });

        if (response.ok) {
            setUser({ isAuthenticated: false });
            AccessToken.removePeriodicRefresh();
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
