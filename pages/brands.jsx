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
    const brandsnapshot = await getDocs(brandsCol)
    const brandList = brandsnapshot.docs.map(doc => doc.data())
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
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex">
        Seed to Fruit
      </div>
        <div className="grid grid-cols-4">
        {state.brands.map((brand) => 
          <div key={brand.ID} className='plant p-6 bg-white rounded'>
            { brand['name'] }
          </div>
        )}
        </div>
        <div className="add-form">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
            <input type="submit" value="Add Brand" className='' />
          </form>
        </div>
    </main>
  )
}
