import NavSocial from "./NavSocial";
import styles from './NavFooter.module.scss';
export default function NavFooter() {
    return (
    <footer>
<div className={styles.footerContainer}>
        <div>
            <p>&copy; Copyright Nhuy Reid <span>{(new Date().getFullYear())}</span></p>
        </div>
        <ul className={styles.container}>
            <li className={styles.navItem}><a href="/about" className={styles.navLink}>about</a></li>
            <li className={styles.navItem}><a href="/my-art" className={styles.navLink}>my art</a></li>
            <li className={styles.navItem}><a href="/shows" className={styles.navLink}>shows</a></li>
            <li className={styles.navItem}><a href="/contact" className={styles.navLink}>contact</a></li>
        </ul>
        <NavSocial />
</div>
    </footer>
    )
}