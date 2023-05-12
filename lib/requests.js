import { doc, collection, getDoc, getDocs } from "firebase/firestore"
import { db } from "../context/authContext"

const getSingleDocument = async (type, id) => {
    const docRef = doc(db, type, id)
    const docSnap = await getDoc(docRef)

    return docSnap.data()
}

const getAllDocumentsID = async (type) => {
    const brandsCol = collection(db, type)
    const brandsnapshot = await getDocs(brandsCol)
    const brandList = brandsnapshot.docs.map(doc => ({id: doc.id}))

    return brandList
}

export {
    getSingleDocument,
    getAllDocumentsID
}