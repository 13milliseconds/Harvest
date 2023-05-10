import { db } from '../../../context/authContext';
import { doc, getDoc, deleteDoc } from '@firebase/firestore';

export default async function (req,res) {
  // if (req.method !== 'GET') {
  //   res.status(405).send({ message: 'Only GET requests allowed' })
  //   return
  // }

  const id = req.query.id
  const docRef = doc(db, 'users', id);
  
  if(req.method == 'DELETE'){
    await deleteDoc(docRef)
    
    res.status(200).json({success: true})
  }

  if(req.method == 'GET'){
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such user");
    }
    
    res.status(200).json(docSnap.data())
  }
  

}