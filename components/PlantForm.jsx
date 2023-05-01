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
    <input id="name" 
        type="text" 
        value={inputText} 
        onChange={(e)=> setinputText(e.target.value)}
        className="block p-1 mb-1 text-black"
        />
    <label htmlFor="brand">Brand</label>
    <select className="block p-1 mb-1 text-black">
        {loadingBrands ? <option disabled >Loading...</option>
        : state.brands.documents?.map(brand => 
            <option key={brand.id} value={brand.id}>{brand.data.name}</option>
            )
        }
    </select>
    <input type="submit" 
        value={loadingAdd ? 'Saving' : 'Add Plant'} 
        className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-black my-2 p-1 px-2 rounded" 
    />
    <div className="error">
        <div className="load-error">{errorLoadingBrands}</div>
        <div className="add-error">{errorAdd}</div>
    </div>
  </form>
}