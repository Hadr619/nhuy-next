import styles from "./Section.module.scss";

export default function Section({children}){
    return(
        <section className={styles.section}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    )
}