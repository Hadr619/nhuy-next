import Button from "../Button/Button";
import { useRouter } from "next/router";
import clsx from "clsx";
import styles from "./Masthead.module.scss";

export default function Masthead({title, description, btnText, fullHeight}) {
    const router = useRouter();

    const contactClick = () => {
        router.push('/contact');
    }

    const words = title.split(' ');

    return (
    <section className={clsx(styles.masthead, fullHeight ? styles.fullHeight : "")}>
        <div className={styles.overlay}>
        <div className={styles.container}>
            <h1 className={styles.title}>{
                words.map((word, index) => {
                    return (
                        <span key={index}>{word}</span>
                    )
                })
            }</h1>
            <h2 className={styles.subtitle}>{description}</h2>
            {btnText ? <Button btnText={btnText} className={styles.btn} onClick={() => contactClick()}/> : ""}
        </div>
        </div>
    </section>
    )
}