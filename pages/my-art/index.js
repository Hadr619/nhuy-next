import ArtImage from "../../components/ArtImage/ArtImage";
import { createClient} from 'contentful';
import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
import styles from "../../styles/pages/my-art/myart.module.scss";
import Filter from "../../components/Filter/Filter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            <motion.ul className={styles.grid}>
			<AnimatePresence>
                {filtered.map(art => {
                    return (      
                        <motion.li key={art.sys.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }} layout>
                          <ArtImage art={art} link={art.fields.slug}/>
                        </motion.li>
                    )
                })}
			</AnimatePresence>
                        {/* <span className="u-none-added">Sorry, but there is currently no artork uploaded. Please check back.</span> */}
            </motion.ul>
    </Section>
    </Page>
    )
}