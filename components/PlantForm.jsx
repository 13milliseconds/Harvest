import axios from 'axios'
import { dbDispatchContext, dbContext } from '../context/databaseContext';
import {dbActions} from '../context/databaseReducer'
import { useContext, useState} from 'react';

export default function PlantForm(){
    const [inputText, setinputText] = useState('')
    const dispatch = useContext(dbDispatchContext)
    const state = useContext(dbContext)
    
    const handleSubmit = async function(e){
    e.preventDefault()

    try{
        const docRef = await axios.post('/api/plants', {
        document: {
            'common-name': inputText,
        }
        });
        setinputText('')
        dispatch({
        type: dbActions.ADD_DOCUMENT,
        payload: {
            type: "plants",
            document: {
            id: docRef.id,
            data: {
                'common-name': inputText
            }
            },
        }
        })
    } catch(e){
        console.log(e)
        return
    }
    }

    return  <form onSubmit={(e)=>handleSubmit(e)}>
    <label for="name">Name</label>
    <input id="name" type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
    <label for="brand">Brand</label>
    <select>
      { state.brands.documents?.map(brand => 
      <option key={brand.id} value={brand.id}>{brand.name}</option>
      )}
    </select>
    <input type="submit" value="Add Plant" className='' />
  </form>
}