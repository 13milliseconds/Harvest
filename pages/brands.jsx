import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import { dbDispatchContext, dbContext, dbActions } from '../context/databaseContext';
import { useEffect, useContext, useState } from 'react';


export default function Brands() {
  const dispatch = useContext(dbDispatchContext)
  const state = useContext(dbContext)
  const brandsCol = collection(db, 'brands')
  const [inputText, setinputText] = useState('')

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async function (){
    let brandsnapshot

    try{
      brandsnapshot = await getDocs(brandsCol)
    } catch(e){
      console.log(e)
      return
    }

    const brandList = brandsnapshot.docs.map(doc => {
      return {id: doc.id, data: doc.data()}
    })
    console.log(brandList)
    dispatch({
      type: dbActions.LOAD_BRANDS,
      payload: {
        brands: brandList,
        loaded: true,
        loading: false
      }
    })
  }

  const handleSubmit = async function(e){
    e.preventDefault()

    try{
      await addDoc(brandsCol, {
        name: inputText,
      });
    } catch(e){
      console.log(e)
      return
    }

    setinputText('')
    dispatch({
      type: dbActions.ADD_BRAND,
      payload: {
        brand: {name: inputText},
      }
    })
  }

  return (
    <main className="min-h-screen p-24">
        <div className="grid grid-cols-4">
        {state.brands.map((brand) => 
          <div key={brand.id} className='plant p-3 m-3 bg-white rounded'>
            { brand.data['name'] }
          </div>
        )}
        </div>
        <div className="pt-6">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
            <input type="submit" value="Add Brand" className='' />
          </form>
        </div>
    </main>
  )
}
