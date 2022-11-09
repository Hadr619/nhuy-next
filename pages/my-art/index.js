import ArtImage from "../../components/ArtImage/ArtImage";
import { createClient} from 'contentful';
import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
// import styles from "./myart.module.scss";
import styles from "../../styles/pages/my-art/myart.module.scss";
export async function getStaticProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  const artwork = await client.getEntries({ content_type: 'artwork' })
  return {
    props: {
      artwork: artwork.items,
      
    },
    revalidate: 1
  }
  
  }
export default function myArt({artwork}) {

    return(
        <Page>
        <Masthead 
        title="My Art"
        description="What I Do."
        />
        <Section>
            <ul className={styles.grid}>
                {artwork.map(art => {
                    return (      
                         <li key={art.sys.id}>
                        <ArtImage art={art} link={art.fields.slug}/>
                        </li>
                    )
                })}

                        {/* <span className="u-none-added">Sorry, but there is currently no artork uploaded. Please check back.</span> */}
            </ul>
    </Section>
    </Page>
    )
}