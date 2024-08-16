import styles from './navigation.module.css';
import NavigationLinks from './navigationLinks';
import Logo from './logo';

export default function Navigation() {
    return (
        <nav className={styles.navigation}>
            <Logo />
            <NavigationLinks />
        </nav>
    );
}
