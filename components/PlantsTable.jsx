import axios from 'axios'
import { dbDispatchContext, dbContext } from '../context/databaseContext';
import {dbActions} from '../context/databaseReducer'
import { useContext, useEffect} from 'react';
import PlantRow from './PlantRow';

export default function PlantsTable(){
    const dispatch = useContext(dbDispatchContext)
    const state = useContext(dbContext)

    useEffect(() => {
        if( !state.plants.loaded) loadPlants()
      }, [])
    
      const loadPlants = async function (){
    
        try{
          const documents = await axios.get('/api/plants', {});
          dispatch({
            type: dbActions.LOAD_DOCUMENTS,
            payload: {
              documents: documents.data,
              type: 'plants'
            }
            })
        } catch(e){
          console.log(e)
          return
        }
      }

    return <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3">Qty</th>
        <th scope="col" class="px-6 py-3">Edit</th>
        <th scope="col" class="px-6 py-3">Delete</th>
      </tr>
    </thead>
    <tbody>
    {state.plants.documents?.map((plant, index) => 
        <PlantRow key={plant.id} plant={plant} index={index} />
    )}
</tbody>
</table>
}