import { createClient} from 'contentful';
import { NextSeo } from 'next-seo';
import Image from "next/image";
import Link from "next/link";
import Skeleton from "../../components/Skeleton/Skeleton";
import Page from "../../components/Page/Page";
import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import BackButton from "../../components/BackButton/BackButton";
import styles from "../../styles/pages/shows/slug.module.scss";

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

    if(!artShow){
      return <Skeleton />
     }else{
    const {title, slug, featuredImage, metaDescription, description, date, address, eventWebsite} = artShow.fields;
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    }
    const days = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ]
    const isInThePast = (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);        
      return date < today;
    }
    const options = {
      renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
              <img src={`https:${fields.file.url}`} height={`${fields.file.details.image.height}`} width={`${fields.file.details.image.width}`} alt={`${fields.description}`}/>,
      },
  };
    const openSite = () => {
      window.open(eventWebsite, '_blank');
    }
    const dateParse = Date.parse(date);
    const parseDate = new Date(dateParse);
    const monthName = months[parseDate.getMonth()];
    const newDate =  parseDate.getDate();
    const year = parseDate.getFullYear();
    const dayName = days[parseDate.getDay()];
    const time = parseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const expiredView = `${newDate}/${parseDate.getMonth()}/${year}`;
    const formatted = `${dayName}, ${newDate} ${monthName} ${year} at ${time}`;
      return(
        <Page>
                <NextSeo 
      title={title}
      description={``}
      openGraph={{
        type: 'website',
        url: `https://www.nhuyreid.com/shows/${slug}`,
        title: `${title}`,
        description: `${metaDescription}`,
        images: [
          {
            url: `https:${featuredImage.fields.file.url}`,
            width: `${featuredImage.fields.file.details.image.width}`,
            height: `${featuredImage.fields.file.details.image.height}`,
            alt: 'Art Show image',
          },
        ],
      }}
      />
          <Section>
            
          <BackButton 
            link="/shows"
            pageName="shows" />
        
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div>
                <Image 
                    src={`https:${featuredImage.fields.file.url}`}
                    layout="responsive"
                    priority={true}
                    width={featuredImage.fields.file.details.image.width}
                    height={featuredImage.fields.file.details.image.height}
                    className={styles.image}
                    alt={title}
                  />
                </div>
                <div className={styles.text}>
                        <p className={styles.item}><span>Event:</span><span>{title}</span></p>
                        <p className={styles.item}><span>When:</span><span className={isInThePast(parseDate) ? styles.expired : ''}>{isInThePast(parseDate) ? `This event was on ${expiredView}` : formatted}</span></p>
                        <p className={styles.item}><span>Where:</span><span>{address}</span></p>
                        { eventWebsite ?(
                        // <a href="" target="_blank" className="c-btn c-btn--primary c-si-text--btn">Visit Event's Website</a>
                        <Button className={styles.btn}
                                btnText="Visit Event's Website" onClick={openSite} />
                        ) : ""}
                </div>
            </div>
            <div className={styles.description}>        
            {documentToReactComponents(description, options)}
            </div>
        </div>



          </Section>
    </Page>
      )
    }
  }