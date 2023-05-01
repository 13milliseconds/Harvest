import { useState} from 'react';
import { useAddDocument } from '../hooks/useAPI';


export default function BrandForm(){
    const [inputText, setinputText] = useState('')
    const [loadingAdd, errorAdd , addBrand] = useAddDocument('brands');
    
    const handleSubmit = async function(e){
        e.preventDefault()
        const addRequest = await addBrand({
            'name': inputText,
        })
        addRequest && setinputText('')  
    }

    return  <form onSubmit={(e)=>handleSubmit(e)}>
    <label htmlFor="name">Name</label>
    <input 
        id="name" 
        type="text" 
        value={inputText} 
        onChange={(e)=> setinputText(e.target.value)}
        className="block p-1 mb-1 text-black"
    />
    <input 
        type="submit" 
        value={loadingAdd ? 'Saving' : 'Add Brand'} 
        className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-black my-2 p-1 px-2 rounded" 
    />
    <div className="error">
        <div className="add-error">{errorAdd}</div>
    </div>
  </form>
}