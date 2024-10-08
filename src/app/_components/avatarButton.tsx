import { useState } from 'react';
import { useUserContext } from '@/contexts/user/userContext';
import Image from 'next/image';
import AvatarMenu from './avatarMenu';
import styles from './navigation.module.css';

export default function AvatarButton() {
    const { user } = useUserContext();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    function handleMenu() {
        setShowMenu(!showMenu);
    }

    if (!user.isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.avatar}>
            <button
                className={styles['avatar-button']}
                onClick={handleMenu}
            >
                <Image
                    src={user.avatar}
                    width={28}
                    height={28}
                    alt="Avatar"
                />
            </button>
            {showMenu && (
                <AvatarMenu
                    setShowMenu={setShowMenu}
                />
            )}
        </div>
    );
}
