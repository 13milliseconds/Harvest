import { getAllDocumentsID, getSingleDocument } from '../../lib/requests'

//Components
import { Link } from '@mui/material'

export default function SingleBrand({brand}) {

  return (
    <main className="min-h-screen p-24">
        <header><Link href="/brands">Back</Link></header>
        <h1 className="s-6 text-xl">{brand['name']}</h1>
    </main>
  )
}

export async function getStaticProps({params}) {

  try {
    const brand = await getSingleDocument('brands', params.id)
    return {
        props: {
          brand,
            protected: true,
        }
    }
  } catch (error) {
      console.log(error);
  }
}

export async function getStaticPaths() {
  const brands = await getAllDocumentsID('brands')

  // Get the paths we want to prerender
  const paths = brands.map((brand) => ({
    params: { id: brand.id },
  }))

  return {
    paths,
    fallback: false, 
  };
}