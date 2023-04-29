import axios from 'axios'
import { dbDispatchContext } from '../context/databaseContext';
import { dbActions } from '../context/databaseReducer'
import { useContext } from 'react';

//Components
import Button from '../components/Button'
import Link from 'next/link'

export default function PlantRow(props){
    const plant = props.plant
    const index = props.index
    const dispatch = useContext(dbDispatchContext)

    const handleDelete = async (id) => {
        try{
          await axios.delete(`/api/plants/${id}`);
          dispatch({
            type: dbActions.DELETE_DOCUMENT,
            payload: {
              type: 'plants',
              id
            }
          })
        } catch(e){
          console.log(e)
          return
        }
      }

    return <tr key={plant.id} class={`${index % 2 == 0 ? 'bg-white' : 'bg-grey-50'} border-b`}>
    <th scope="row" class="px-6 py-4">{ plant.data['common-name'] }</th>
    <td class="px-6 py-4">0</td>
    <td class="px-6 py-4"><Link href={`/plants/${plant.id}`}>Edit</Link></td>
    <td class="px-6 py-4"><Button onClick={() => { handleDelete(plant.id) }} label="delete" /></td>
</tr>
}