import { dbContext } from '../context/databaseContext';
import { useContext, useState, useEffect} from 'react';
import { useGetDocuments, useAddDocument } from '../hooks/useAPI';


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
                'common-name': inputText,
            })
            setinputText('')  
        } catch(e){
            console.log(e)
            return
        }
    }

    return  <form onSubmit={(e)=>handleSubmit(e)}>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" value={inputText} onChange={(e)=> setinputText(e.target.value)}/>
    <label htmlFor="brand">Brand</label>
    <select>
        {loadingBrands ? <option disabled >Loading...</option>
        : state.brands.documents?.map(brand => 
            <option key={brand.id} value={brand.id}>{brand.data.name}</option>
            )
        }
    </select>
    <input type="submit" value={loadingAdd ? 'Saving' : 'Add Plant'} className='' />
    <div className="error">
        <div className="load-error">{errorLoadingBrands}</div>
        <div className="add-error">{errorAdd}</div>
    </div>
  </form>
}