import ArtImage from "../../components/ArtImage/ArtImage";
import { createClient} from 'contentful';
import Masthead from "../../components/Masthead/Masthead";
import styles from "./myart.module.scss";

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
        <>
        <Masthead 
        title="My Art"
        description="What I Do."
        />
        <section className={styles.section}>
        <div className={styles.container}>

            <ul className={styles.grid}>
                {artwork.map(art => {
                    return (      
                         
                        <ArtImage key={art.sys.id} art={art} link={art.fields.slug}/>
                        
                    )
                })}

                        {/* <span className="u-none-added">Sorry, but there is currently no artork uploaded. Please check back.</span> */}
            </ul>
        </div>
    </section>
    </>
    )
}