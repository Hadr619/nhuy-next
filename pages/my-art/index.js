import ArtImage from "../../components/ArtImage/ArtImage";
import { createClient} from 'contentful';
import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
// import styles from "./myart.module.scss";
import styles from "../../styles/pages/my-art/myart.module.scss";
import Filter from "../../components/Filter/Filter";
import { useState } from "react";
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
	const [activeType, setActiveType] = useState("All");
	const [filtered, setFiltered] = useState([]);
	const printTypes = [];
	artwork.forEach((art) => {
	  printTypes.push(art.fields.printType)
	})
	const uniqueTypes = [...new Set(printTypes)]
// console.log(filtered)
    return(
        <Page>
        <Masthead 
        title="My Art"
        description="What I Do."
        />
        <Section>
			<Filter artwork={artwork} 
				types={uniqueTypes} 
				activeType={activeType} 
				setActiveType={setActiveType} 
				setFiltered={setFiltered}
				className={styles.filter}
				/>
            <ul className={styles.grid}>
                {filtered.map(art => {
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