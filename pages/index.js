import Masthead from "../components/Masthead/Masthead";
import { createClient} from 'contentful';
import LatestCreations from "../components/LatestCreations/LatestCreations";
import Image from 'next/image'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });
const artwork = await client.getEntries({ content_type: 'artwork' })
return {
  props: {
    artwork: artwork.items,
    
  },
  revalidate: 1
}

}

export default function Home({artwork}) {
  // console.log(artwork)
  return (
    <main className="page">
      <Masthead 
        title="NhuyReid"
        description="Printmaker"
        hazBtn={true}
        btnText="Contact Me"
        />
        <LatestCreations artwork={artwork}/>
    </main>
  )
}
