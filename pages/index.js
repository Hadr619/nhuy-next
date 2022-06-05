import Masthead from "../components/Masthead/Masthead";
import { createClient} from 'contentful';
import LatestCreations from "../components/LatestCreations/LatestCreations";
import Image from 'next/image'
import Page from "../components/Page/Page";

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
    <Page>
      <Masthead 
        title="NhuyReid"
        description="Printmaker"
        btnText="Contact Me"
        fullHeight={true}
        />
        <LatestCreations artwork={artwork}/>
    </Page>
  )
}
