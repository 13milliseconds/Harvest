import { Inter } from 'next/font/google'
import { db } from '../firebaseConfig';
import { Firestore, DocumentData, collection, getDocs } from '@firebase/firestore';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [plants, setPlants] = useState<DocumentData[]>([])

  useEffect(() => {
    getPlants(db)
  }, [])
  
  const getPlants = async (db: Firestore) => {
    const plantsCol = collection(db, 'plants')
    const plantSnapshot = await getDocs(plantsCol)
    const plantList = plantSnapshot.docs.map(doc => doc.data())
    setPlants(plantList)
  }

  console.log(plants)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        Seed to Fruit
      </div>
        <div className="grid grid-cols-4">
        {plants.map((plant) => 
          <div key={plant.ID} className='plant p-6 bg-white rounded'>
            { plant['common-name'] }
          </div>
        )}
        </div>
    </main>
  )
}
