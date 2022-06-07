import Image from "next/image";
import Page from "../../components/Page/Page";
import { createClient} from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Masthead from "../../components/Masthead/Masthead";
import styles from "../../styles/pages/about/about.module.scss";

export async function getStaticProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  const about = await client.getEntries({content_type: 'about'})
  return {
    props: {
      about: about.items[0]
      
    },
    revalidate: 1
  }
  
  }
export default function About({about}) {
    console.log(about.fields);
    const {aboutImage, aboutText} = about.fields;
    console.log(aboutImage);
    return (
        <Page>
        <Masthead 
            title="About Me"
            description="Who am I."
         />
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.image}>
                    <Image
                        src={`https:${aboutImage.fields.file.url}`}
                        layout="fill"
                        objectFit="cover"
                        className={styles.image}
                        alt={aboutImage.fields.title}
                    />     
                    </div>
                    <div className={styles.text}>
                        <div className={styles.inner}>
                        {documentToReactComponents(aboutText)}
                        </div>
                    </div>
                    {/* <div className="c-gq-image--floating"></div> */}
                </div> 
            </div>
        </section>
        </Page>
    )
    
}