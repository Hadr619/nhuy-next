// import { createClient} from 'contentful';
// import Image from "next/image";
// import Link from "next/link";
// import styles from './[slug].module.scss';
// const client = createClient({
//     space: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_ACCESS_KEY,
//   });
  
//   export const getStaticPaths = async () => {
//     const res = await client.getEntries({
//       content_type: 'artwork'
//     })
  
//     const paths = res.items.map(item => {
//       return {
//         params: { slug: item.fields.slug }
//       }
//     })
  
//     return {
//       paths,
//       fallback: true
//     }
//   }
  
//   export async function getStaticProps({ params }) {
//      const { items } = await client.getEntries({
//        content_type: 'artwork',
//        'fields.slug': params.slug
//      })
//      const res = await client.getEntries({ content_type: 'artwork' })
  
//      if(!items.length){
//        return {
//          redirect: {
//            destination: '/',
//            permanent: false
//          }
//        }
//      }
  
//      return {
//        props: { post: items[0],
//                  },
//        revalidate: 1
//      }
//   }

//   export default function ArtWork(post) {
//       console.log(post.post.fields);
//       const {title, description, image, metaDescription} = post.post.fields;

//       return(
//         <section className={styles.section}>
//         <div className={styles.container}>
//             <Link href="/my-art "><a className="c-btn--back"><i className="material-icons">keyboard_backspace</i> Back to my art</a></Link>
//             <div className={styles.artworkGrid}>
//               <div className={styles.image}>
//                 <Image 
//                   src={`https:${post.post.fields.image.fields.file.url}`}
//                   layout="responsive"
//                   width={image.fields.file.details.image.width}
//                   height={image.fields.file.details.image.height}
//                   className={styles.image}
//                   alt={title}
//                 />
//               </div>
//                 <div className={styles.info}>
//                     <h3 className={styles.title}>{title}</h3>
//                     <p></p>      
//                     <div className={styles.description}>{description}</div>
//                     <p></p>
//                     <p> editions</p>
//                 </div>
//             </div>
//         </div>
//     </section>
//       )
//   }