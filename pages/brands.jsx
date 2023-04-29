import axios from 'axios'
import { dbDispatchContext, dbContext, dbActions } from '../context/databaseContext';
import { useEffect, useContext, useState } from 'react';

//components
import Button from '../components/Button'


export default function Brands() {
  const dispatch = useContext(dbDispatchContext)
  const state = useContext(dbContext)
  
  const [inputText, setinputText] = useState('')
  let APItest

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async function (){
    const documents = await axios.get('/api/brands', {});

    dispatch({
      type: dbActions.LOAD_DOCUMENTS,
      payload: {
        documents: documents.data,
        type: 'brands',
        loaded: true,
        loading: false
      }
    })
  }

  const handleSubmit = async function(e){
    e.preventDefault()

    if(!inputText) return;

    let docRef
    try{
      docRef = await addDoc(brandsCol, {
        name: inputText,
      });
    } catch(e){
      console.log(e)
      return
    }

    setinputText('')
    dispatch({
      type: dbActions.ADD_DOCUMENT,
      payload: {
        type: 'brands',
        document: {
          id: docRef.id,
          data: {
            name: inputText
          }
        },
      }
    })
  }

  const handleDelete = async (id) => {
    try{
      await deleteDoc(doc(db, "brands", id))
    } catch(e){
      console.log(e)
      return
    }

    dispatch({
      type: dbActions.DELETE_DOCUMENT,
      payload: {
        type: 'brands',
        id
      }
    })
  }

  return (
    <main className="min-h-screen p-24">
        <div className="">
          {APItest}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Edit</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
        {state.brands.map((brand, index) => 
            <tr key={brand.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-grey-50'} border-b`}>
            <th scope="row" className="px-6 py-4">{ brand.data['name'] }</th>
            <td className="px-6 py-4">0</td>
            <td className="px-6 py-4"><Button onClick={() => { }} label="Edit" /></td>
            <td className="px-6 py-4"><Button onClick={() => { handleDelete(brand.id) }} label="delete" /></td>
          </tr>
        )}
        </tbody>
        </table>
        </div>
        <div className="pt-6">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
            <input type="submit" value="Add Brand" className='bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full' />
          </form>
        </div>
    </main>
  )
}
