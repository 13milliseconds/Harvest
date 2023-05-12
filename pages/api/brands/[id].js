import { db } from '../../../context/authContext';
import { doc, deleteDoc } from '@firebase/firestore';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async (req,res) => {
  // if (req.method !== 'GET') {
  //   res.status(405).send({ message: 'Only GET requests allowed' })
  //   return
  // }

  const id = req.query.id
  const docRef = doc(db, 'brands', id);
  
  if(req.method == 'DELETE'){
    await deleteDoc(doc(db, 'brands', id))
    
    res.status(200).json({success: true})
  }

  if(req.method == 'GET'){
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
    
    res.status(200).json(docSnap.data())
  }
  

}
