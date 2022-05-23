import Button from "../Button/Button";
import styles from "./Masthead.module.scss";

export default function Masthead({title, description, hazBtn, btnText}) {
    const contactClick = () => {
        console.log('clicked')

        if (typeof window !== "undefined") {
        // window.open('/contact', '_self');
        }
    }
    return (
    <section className={styles.masthead}>
        <div className={styles.overlay}>
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <h4 className={styles.subtitle}>{description}</h4>
            {hazBtn ? <Button btnText={btnText} className={styles.btn} click={() => contactClick}/> : ""}
        </div>
        </div>
    </section>
    )
}