import Image from "next/image";
import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import styles from "../../styles/pages/about/about.module.scss";

export default function About() {
    return (
        <Page>
        <Masthead 
            title="About Me"
            description="Who am I."
         />
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className="c-bq--image o-image lazy"></div>                    
                    <div className={styles.text}>
                        <div className={styles.inner}>
                        ABOUT VERBIAGE
                        </div>
                    </div>
                    {/* <div className="c-gq-image--floating"></div> */}
                </div> 
            </div>
        </section>
        </Page>
    )
    
}