import { createClient} from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import ArtImage from '../ArtImage/ArtImage';
import styles from "./LatestCreations.module.scss";


export default function LastestCreations({artwork}) {
    // const {title} = artwork.fields;

    return (
<section className={styles.latestwork}>
    <div className={styles.container}>
        <h5 className={styles.header}>Latest Creations</h5>
        <h4 className={styles.title}>A Collection of Prints</h4>

        <ul className={styles.latestGrid}> 

    {artwork.map((art, index) =>{
        // console.log(art.fields.title)
        return(
            <li key={art.sys.id}>

                        {/* <Image 
                            src={`https:${art.fields.image.fields.file.url}`}
                            layout="fill"
                            objectFit="cover"
                            className={styles.image}
                            alt={art.fields.title}
                            priority={index === 0 ? true : false}
                        />                       */}

                    <ArtImage  art={art} link={art.fields.slug}/>
            </li>
        )
    })}

        </ul>
    </div>
</section>
    
    )
}