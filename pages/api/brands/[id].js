import { db } from '../../../firebaseConfig';
import { doc, deleteDoc } from '@firebase/firestore';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req,res) => {
  // if (req.method !== 'GET') {
  //   res.status(405).send({ message: 'Only GET requests allowed' })
  //   return
  // }

  const id = req.query.id
  
  if(req.method == 'DELETE'){
    await deleteDoc(doc(db, 'brands', id))
    
    res.status(200).json({success: true})
  }
  

}
