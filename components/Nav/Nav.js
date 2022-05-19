import Link from 'next/link';
import styles from './Nav.module.scss';
export default function Nav() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.topnav}>
                <li className={styles.navItem}>
                    <Link href="/"><a className={styles.link}>Home</a></Link>
                </li>
            </ul>
        </nav>
    )
}