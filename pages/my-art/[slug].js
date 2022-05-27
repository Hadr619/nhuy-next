import { createClient} from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
  
  export const getStaticPaths = async () => {
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
     const res = await client.getEntries({ content_type: 'artwork' })
  
     if(!items.length){
       return {
         redirect: {
           destination: '/',
           permanent: false
         }
       }
     }
  
     return {
       props: { post: items[0],
                 },
       revalidate: 1
     }
  }

  export default function ArtWork(post) {
      console.log(post.post.fields);
      const {title, description, metaDescription} = post.post.fields;
      return(
        <section className="c-pg__section c-pg-section__artwork">
                <div className="o-cont c-pg-section__container">
                    <ul className="c-grid_artwork">
                        <li className="c-grid-artwork--item o-image lazy">
                            <a className="c-ga-item--link" href="#">
                                <div className="c-ga-item__info">
                                    <h3 className="c-ga-item--title">{title}</h3>
                                    <div className="c-ga-item--description">{description}</div>
                                </div>
                            </a>
                        </li>
                                {/* <span className="u-none-added">Sorry, but there is currently no artork uploaded. Please check back.</span> */}
                    </ul>
                </div>
            </section>
      )
  }