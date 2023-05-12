import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

//Components
import { Link } from '@mui/material'

export default function SinglePlant() {
  const router = useRouter()
  const { id } = router.query
  const [plant, setPlant] = useState({id})

  useEffect(() => {
    if (router.isReady) getPlant()
  }, [router.isReady])
    
  const getPlant = async function (){
    console.log('getPlant')
    
    try{
      const documentQuery = await axios.get(`/api/plants/${id}`);
      console.log(documentQuery.data)
      setPlant(documentQuery.data)
    } catch(e){
      console.log(e)
      return
    }
  }

  return (
    <main className="min-h-screen p-24">
        <header><Link href="/plants">Back</Link></header>
        <h1 className="s-6 text-xl">{plant['common-name']}</h1>
    </main>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}
