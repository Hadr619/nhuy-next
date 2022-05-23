import { createClient} from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import styles from "./LatestCreations.module.scss";


export default function LastestCreations({artwork}) {
    // const {title} = artwork.fields;

    return (
<section className={styles.latestwork}>
    <div className={styles.container}>
        <h5 className={styles.header}>Latest Creations</h5>
        <h4 className={styles.title}>A Collection of Prints</h4>

        <ul className={styles.latestGrid}> 

    {artwork.map(art =>{
        // console.log(art.fields.title)
        return(
            <Link href={`/artwork/${art.fields.slug}`} key={art.sys.id}>
            <li>
                <div className={styles.gridItem}> 
                    <div className={styles.image}>
                        <Image 
                            src={`https:${art.fields.image.fields.file.url}`}
                            layout="fill"
                            objectFit="cover"
                            className={styles.image}
                            alt={art.fields.title}
                        />                      
                    </div>

                    <div className={styles.info}>
                    <h3 className={styles.itemTitle}><a className={styles.link} href="">{art.fields.title}</a></h3>
                    <p>{art.fields.year}</p>      
                    <div className={styles.description}>{art.fields.description}</div>
                    <p>{art.fields.size}</p>
                    <p>{art.fields.editions}</p>
                    </div>
                </div>
            </li>
            </Link>
        )
    })}

        </ul>
    </div>
</section>
    
    )
}