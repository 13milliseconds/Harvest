import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

//Components
import { Link } from '@mui/material'

export default function SingleBrand() {
  const router = useRouter()
  const { id } = router.query
  const [brand, setBrand] = useState({id})

  useEffect(() => {
    if (router.isReady) getBrand()
  }, [router.isReady])
    
  const getBrand = async function (){
    console.log('getBrand')
    
    try{
      const documentQuery = await axios.get(`/api/brands/${id}`);
      console.log(documentQuery.data)
      setBrand(documentQuery.data)
    } catch(e){
      console.log(e)
      return
    }
  }

  return (
    <main className="min-h-screen p-24">
        <header><Link href="/brands">Back</Link></header>
        <h1 className="s-6 text-xl">{brand['common-name']}</h1>
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