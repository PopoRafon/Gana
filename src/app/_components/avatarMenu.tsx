import { useEffect, useRef } from 'react';
import { useUserContext } from '@/contexts/user/userContext';
import { getCSRFToken } from '@/utils/client/tokenRefresh';
import { useRouter } from 'next/navigation';
import styles from './navigation.module.css';
import Image from 'next/image';
import Link from 'next/link';

type AvatarMenuProps = {
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AvatarMenu({ setShowMenu }: AvatarMenuProps) {
    const router = useRouter();
    const { user, setUser } = useUserContext();
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

    if (!user.isAuthenticated) {
        return null;
    }

    return (
        <div
            className={styles['avatar-menu']}
            ref={menuRef}
        >
            <div className={styles['avatar-menu-username']}>{user.username}</div>
            <Link
                href="/notifications"
                className={styles['avatar-menu-button']}
                onClick={() => setShowMenu(false)}
            >
                <Image
                    src="/images/icons/notifications.svg"
                    width={18}
                    height={18}
                    alt="Notifications image"
                />
                <span>Notifications</span>
            </Link>
            <button
                onClick={handleLogout}
                className={styles['avatar-menu-button']}
            >
                <Image
                    src="/images/icons/logout.svg"
                    width={18}
                    height={18}
                    alt="Logout image"
                />
                <span>Logout</span>
            </button>
        </div>
    );
}
