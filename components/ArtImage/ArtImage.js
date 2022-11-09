import Link from 'next/link';
import Image from 'next/image';
import styles from "./ArtImage.module.scss";

export default function ArtImage({link, art}) {
    return (
        // <Link href={`/artwork/${art.fields.slug}`}>
        <div className={styles.item}>     
        <Link href={`/my-art/${link}`}>
            <a className={styles.link}>
                
            <Image
                src={`https:${art.fields.image.fields.file.url}`}
                layout="fill"
                objectFit="cover"
                className={styles.image}
                alt={art.fields.title}
            />
                <div className={styles.overlay}></div>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{art.fields.title}</h3>
                        <div className={styles.description}>{art.fields.description}</div>
                    </div>
                </a> 
        </Link>
        </div>
    )
}