import { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import styles from './Nav.module.scss';
import clsx from 'clsx';


export default function Nav() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const pathCheck = (path) => {
        if(router.pathname == path){
            return styles.active
        }
    }
    const handleNav = () => {
        setOpen(!open)
        let html = document.getElementsByTagName('html')[0];
        html.classList.toggle('active');
    }
    return (
        <nav className={clsx(styles.topnav, open ? styles.open : '')}>
            <div className={styles.container}>
                <svg className={clsx(styles.bars, open ? styles.active : '')} onClick={() => handleNav() } viewBox="0 0 100 100">
                    <path className={clsx(styles.line, styles.top)} d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"></path>
                    <path className={clsx(styles.line, styles.middle)} d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"></path>
                    <path className={clsx(styles.line, styles.bottom)} d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"></path>
                </svg>
                <div className={styles.logo}><a className={styles.logoLink} href="/"></a></div>
            </div>
            <ul className={clsx(styles.topnav, open ? styles.active : '')}>
                <li className={clsx(pathCheck('/about'), styles.navItem)}><Link href="/about"><a onClick={() => handleNav(true)} className={styles.navLink}>About</a></Link></li>
                <li className={clsx(pathCheck('/my-art'), styles.navItem)}><Link href="/my-art"><a onClick={() => handleNav(true)} className={styles.navLink}>My Art</a></Link></li>
                <li className={clsx(styles.navItem, styles.navHome)}>
                    <Link href="/"><a onClick={() => handleNav(true)} className={clsx(styles.navLink, styles.navItemHome)}><span className={styles.navHomeText}>Home</span></a></Link>
                </li>
                <li className={clsx(pathCheck('/shows'), styles.navItem)}><Link href="/shows"><a onClick={() => handleNav(true)} className={styles.navLink}>Shows</a></Link></li>
                <li className={clsx(pathCheck('/contact'), styles.navItem)}><Link href="/contact"><a onClick={() => handleNav(true)} className={styles.navLink}>Contact</a></Link></li>
            </ul>
        </nav>
    )
}