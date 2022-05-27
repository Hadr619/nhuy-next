import Button from "../Button/Button";
import { useRouter } from "next/router";
import styles from "./Masthead.module.scss";

export default function Masthead({title, description, hazBtn, btnText}) {
    const router = useRouter();

    const contactClick = () => {
        router.push('/contact');
    }

    return (
    <section className={styles.masthead}>
        <div className={styles.overlay}>
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <h4 className={styles.subtitle}>{description}</h4>
            {hazBtn ? <Button btnText={btnText} className={styles.btn} onClick={() => contactClick()}/> : ""}
        </div>
        </div>
    </section>
    )
}