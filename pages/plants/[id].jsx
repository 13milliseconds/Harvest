import { getAllDocumentsID, getSingleDocument } from '../../lib/requests'

//Components
import { Link } from '@mui/material'

export default function SinglePlant({plant}) {

  return (
    <main className="min-h-screen p-24">
        <header><Link href="/plants">Back</Link></header>
        <h1 className="s-6 text-xl">{plant['common-name']}</h1>
    </main>
  )
}

export async function getStaticProps({params}) {

  try {
    const plant = await getSingleDocument('plants', params.id)
    return {
        props: {
            plant,
            protected: true,
        }
    }
  } catch (error) {
      console.log(error);
  }
}

export async function getStaticPaths() {
  const plants = await getAllDocumentsID('plants')

  // Get the paths we want to prerender
  const paths = plants.map((plant) => ({
    params: { id: plant.id },
  }))

  return {
    paths,
    fallback: false, 
  };
}