import { db } from '../firebaseConfig';
import { collection, doc, getDocs, addDoc, deleteDoc } from '@firebase/firestore';
import { dbDispatchContext, dbContext, dbActions } from '../context/databaseContext';
import { useEffect, useContext, useState } from 'react';

//components
import Button from '../components/Button'


export default function Plants() {
  const dispatch = useContext(dbDispatchContext)
  const state = useContext(dbContext)
  const plantsCol = collection(db, 'plants')
  const [inputText, setinputText] = useState('')

  useEffect(() => {
    loadPlants()
  }, [])

  const loadPlants = async function (){
    let plantsnapshot

    try{
      plantsnapshot = await getDocs(plantsCol)
    } catch(e){
      console.log(e)
      return
    }

    const plantList = plantsnapshot.docs.map(doc => {
      return {id: doc.id, data: doc.data()}
    })
    dispatch({
      type: dbActions.LOAD_DOCUMENTS,
      payload: {
        documents: plantList,
        type: 'plants',
        loaded: true,
        loading: false
      }
    })
  }

  const handleSubmit = async function(e){
    e.preventDefault()

    let docRef
    try{
      docRef = await addDoc(plantsCol, {
        name: inputText,
      });
    } catch(e){
      console.log(e)
      return
    }

    setinputText('')
    dispatch({
      type: dbActions.ADD_PLANT,
      payload: {
        plant: {
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
      await deleteDoc(doc(db, "plants", id))
    } catch(e){
      console.log(e)
      return
    }

    dispatch({
      type: dbActions.DELETE_PLANT,
      payload: {id}
    })
  }

  return (
    <main className="min-h-screen p-24">
        <div className="">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Qty</th>
                <th scope="col" class="px-6 py-3">Edit</th>
                <th scope="col" class="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
        {state.plants.map((plant, index) => 
            <tr key={plant.id} class={`${index % 2 == 0 ? 'bg-white' : 'bg-grey-50'} border-b`}>
            <th scope="row" class="px-6 py-4">{ plant.data['common-name'] }</th>
            <td class="px-6 py-4">0</td>
            <td class="px-6 py-4"><Button onClick={() => { }} label="Edit" /></td>
            <td class="px-6 py-4"><Button onClick={() => { handleDelete(plant.id) }} label="delete" /></td>
          </tr>
        )}
        </tbody>
        </table>
        </div>
        <div className="pt-6">
          <form onSubmit={(e)=>handleSubmit(e)}>
            <label for="name">Name</label>
            <input id="name" type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
            <label for="brand">Brand</label>
            <select>
              { state.brands.map(brand => 
              <option value="test">{brand.data.name}</option>
              )}
            </select>
            <input type="submit" value="Add Plant" className='' />
          </form>
        </div>
    </main>
  )
}
