import { db } from '../../../context/authContext';
import { collection, getDocs, addDoc } from '@firebase/firestore';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req,res) => {
  // if (req.method !== 'GET') {
  //   res.status(405).send({ message: 'Only GET requests allowed' })
  //   return
  // }
  const brandsCol = collection(db, 'plants')
  
  if (req.method == 'GET') {
    const brandsnapshot = await getDocs(brandsCol)
    const brandList = brandsnapshot.docs.map(doc => {
      return {id: doc.id, data: doc.data()}
    })
    
    res.status(200).json(brandList)
  }
  
  if (req.method == 'POST') {
    console.log(req.body)
    const docRef = await addDoc(brandsCol, req.body);
    
    res.status(200).json(docRef)
  }

}
