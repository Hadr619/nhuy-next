import { createClient} from 'contentful';
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../../components/Skeleton/Skeleton";
import Page from "../../components/Page/Page";
import Section from "../../components/Section/Section";
import styles from '../../styles/pages/my-art/slug.module.scss';
const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  
  export async function getStaticPaths() {
    const res = await client.getEntries({
      content_type: 'artwork'
    })
  
    const paths = res.items.map(item => {
      return {
        params: { slug: item.fields.slug }
      }
    })
  
    return {
      paths,
      fallback: true
    }
  }
  
  export async function getStaticProps({ params }) {
     const { items } = await client.getEntries({
       content_type: 'artwork',
       'fields.slug': params.slug
     })
  
     if(!items.length){
       return {
         redirect: {
           destination: '/',
           permanent: false
         },
       }
     }
  
     return {
       props: { art: items[0],
                 },
       revalidate: 1
     }
  }

  export default function ArtWork({art}) {
    // console.log(art.fields);
    if(!art){
      return <Skeleton />
     }else{
    const {title, description, image, metaDescription} = art.fields;

      return(
        <Page>
          <Section>
              <Link href="/my-art "><a className={styles.back}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M3.97 12C3.97 16.41 7.59 20.03 12 20.03C16.41 20.03 20.03 16.41 20.03 12C20.03 7.59 16.41 3.97 12 3.97C7.59 3.97 3.97 7.59 3.97 12M2 12C2 6.46 6.46 2 12 2C17.54 2 22 6.46 22 12C22 17.54 17.54 22 12 22C6.46 22 2 17.54 2 12M10.46 11V8L6.5 12L10.46 16V13H17.5V11" /></svg> Back to my art</a></Link>
              <div className={styles.artworkGrid}>
                <div className={styles.image}>
                  <Image 
                    src={`https:${art.fields.image.fields.file.url}`}
                    layout="responsive"
                    width={image.fields.file.details.image.width}
                    height={image.fields.file.details.image.height}
                    className={styles.image}
                    alt={title}
                  />
                </div>
                  <div className={styles.info}>
                      <h3 className={styles.title}>{title}</h3>
                      <p></p>      
                      <div className={styles.description}>{description}</div>
                      <p></p>
                      <p> editions</p>
                  </div>
              </div>
      </Section>
    </Page>
      )
    }
  }