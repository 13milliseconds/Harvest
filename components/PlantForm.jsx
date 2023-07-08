import { dbContext } from '@/context/databaseContext';
import { useContext, useState, useEffect} from 'react';
import { useGetDocuments, useAddDocument } from '../hooks/useAPI';
import { 
    Alert, 
    Autocomplete, 
    Button, 
    Box, 
    TextField 
} from '@mui/material'


export default function PlantForm(){
    const [inputText, setinputText] = useState('')
    const state = useContext(dbContext)
    const [loadingBrands, errorLoadingBrands ,  getBrands] = useGetDocuments('brands');
    const [loadingAdd, errorAdd , addPlant] = useAddDocument('plants');

    useEffect(() => {
        if( !state.plants.brands) getBrands()
    }, [])
    
    const handleSubmit = async function(e){
        e.preventDefault()
        try{
            await addPlant({
                'name': inputText,
            })
            setinputText('')  
        } catch(e){
            console.log(e)
            return
        }
    }

    let brandOptions = state.brands.documents
    ?state.brands.documents.map(brand => { 
        return {
            label: brand.data.name,
            value: brand.id,
        }
    })
    : []

    return  <Box
    component="form"
    autoComplete="on"
    >
    <TextField id="name" label="Name" variant="outlined" value={inputText} 
        onChange={(e)=> setinputText(e.target.value)} />
    <Autocomplete
        disablePortal
        id="brandsSelect"
        options={brandOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={loadingBrands ? "Loading" : "Brands"} />}
        />
    <Button variant="contained" onClick={(e)=>handleSubmit(e)}>{loadingAdd ? 'Saving' : 'Add Plant'}</Button>
    <div className="error">
        {errorLoadingBrands && <Alert severity="error">{errorLoadingBrands}</Alert>}
        {errorAdd && <Alert severity="error">{errorAdd}</Alert>}
    </div>
    </Box>
}