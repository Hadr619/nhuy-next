import { createClient} from 'contentful';
import { NextSeo } from 'next-seo';
import Image from "next/image";
import BackButton from "../../components/BackButton/BackButton";
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
    if(!art){
      return <Skeleton />
     }else{
    const {title, description, image, metaDescription, slug} = art.fields;

      return(
        <Page>
      <NextSeo 
      title={title}
      description={``}
      openGraph={{
        type: 'website',
        url: `https://www.nhuyreid.com/my-art/${slug}`,
        title: `${title}`,
        description: `${metaDescription}`,
        images: [
          {
            url: `https:${image.fields.file.url}`,
            width: `${image.fields.file.details.image.width}`,
            height: `${image.fields.file.details.image.height}`,
            alt: 'Artwork image',
          },
        ],
      }}
      />
          <Section>

              <BackButton
                link="/my-art"
                pageName="my art" />

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
                  </div>
              </div>
      </Section>
    </Page>
      )
    }
  }