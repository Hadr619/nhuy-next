import { createClient} from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import ArtImage from '../ArtImage/ArtImage';
import styles from "./LatestCreations.module.scss";


export default function LastestCreations({artwork}) {
    return (
<section className={styles.latestwork}>
    <div className={styles.container}>
        <h5 className={styles.header}>Latest Creations</h5>
        <h4 className={styles.title}>A Collection of Prints</h4>

        <ul className={styles.latestGrid}> 

    {artwork.map((art, index) =>{
        return(
            <li key={art.sys.id}>
                    <ArtImage  art={art} link={art.fields.slug}/>
            </li>
        )
    })}

        </ul>
    </div>
</section>
    
    )
}