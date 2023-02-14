import { createClient} from 'contentful';
import { NextSeo } from 'next-seo';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { format } from 'date-fns'
import Link from "next/link";
import Image from "next/image";
import Page from "../../components/Page/Page";
import Masthead from "../../components/Masthead/Masthead";
import Section from "../../components/Section/Section";
import styles from "../../styles/pages/shows/shows.module.scss";


export async function getStaticProps() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  const artshows = await client.getEntries({ content_type: 'artShow' })
  return {
    props: {
      artshows: artshows.items,
      
    },
    revalidate: 1
  }
  
  }

export default function Shows({artshows}) {
    return(
        <Page>
        <NextSeo 
        title="Art Shows"
        description="A list of art shows, past and future" />
            <Masthead 
                title="Art Shows"
                description="Where you can see my art"
            />

<Section>
            <ul className={styles.shows}>
                {

               artshows.length > 0 ? (artshows.map(show => {
                const { title, slug, featuredImage, description, date, address, eventWebsite } = show.fields;

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

                // const newDate = format(date, 'mm/dd/yyyy');
                const dateParse = Date.parse(date);
                const parseDate = new Date(dateParse);
                const monthName = months[parseDate.getMonth()];
                const newDate =  parseDate.getDate();
                const year = parseDate.getFullYear();
                const dayName = days[parseDate.getDay()];
                const time = parseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const expiredView = `${newDate}/${parseDate.getMonth()}/${year}`;
                const formatted = `${dayName}, ${newDate} ${monthName} ${year} at ${time}`;

                const displayDate = () =>{
                    if(isInThePast(parseDate))
                    return true
                }

                    return (
                        <li key={show.sys.id} className={styles.item}>
                        <div className={styles.image}>
                            <Image 
                                src={`https:${featuredImage.fields.file.url}`}
                                layout="fill"
                                objectFit="cover"
                                className={styles.image}
                                alt={show.fields.title}
                            />
                        </div>
                    <div className={styles.info}>
                    
                    <div className="c-gs-info__date-location">
                        <p className={styles.dateLocation}><span>Event:</span><span>{title}</span></p>
                        <p className={styles.dateLocation}><span>When:</span><span className={isInThePast(parseDate) ? styles.expired : ''}>{isInThePast(parseDate) ? `This event was on ${expiredView}` : formatted}</span></p>
                        <p className={styles.dateLocation}><span>Where:</span><span>{address}</span></p>
                    </div>
                    <div className={styles.description}>       
                    {documentToReactComponents(description)}
                    </div>
                    <Link href={`/shows/${slug}`}><a className={styles.link}>Learn More</a></Link>
                    </div>
                    </li>
                    )
                })) : "Sorry, but there are no shows currently added. Please check back at a later date."
                
                }
            </ul>

    </Section>
        </Page>
    )
}