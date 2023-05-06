import { useState} from 'react';
import { useAddDocument } from '../hooks/useAPI';

// Components
import { TextField, Button } from '@mui/material';


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

    return  <>
    <TextField 
        id="name" 
        type="text" 
        label="Name"
        value={inputText} 
        onChange={(e)=> setinputText(e.target.value)}
    />
    <Button variant="contained" onClick={(e)=>handleSubmit(e)} >{loadingAdd ? 'Saving' : 'Add Brand'} </Button>
    <div className="error">
        <div className="add-error">{errorAdd}</div>
    </div>
  </>
}