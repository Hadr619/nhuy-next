import { createClient} from 'contentful';
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../../components/Skeleton/Skeleton";
import Page from "../../components/Page/Page";
import Section from "../../components/Section/Section";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  
  export async function getStaticPaths() {
    const res = await client.getEntries({
      content_type: 'artShow'
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
       content_type: 'artShow',
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
       props: { artShow: items[0],
                 },
       revalidate: 1
     }
  }

  export default function Art({artShow}) {
    // console.log(artShow.fields);
    if(!artShow){
      return <Skeleton />
     }else{
    const {title, slug, featuredImage, description, date, address, eventWebsite} = artShow.fields;

      return(
        <Page>
          <Section>
            <h1>{title}</h1>
          </Section>
    </Page>
      )
    }
  }