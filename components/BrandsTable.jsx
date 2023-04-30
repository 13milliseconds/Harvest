import { dbContext } from '../context/databaseContext';
import { useContext, useEffect} from 'react';
import BrandRow from './BrandRow';
import { useGetDocuments } from '../hooks/useAPI'

export default function BrandsTable(){
  const state = useContext(dbContext)
  const [loadingBrands, errorLoadingBrands,  getBrands] = useGetDocuments('brands');

    useEffect(() => {
        if( !state.brands.loaded) getBrands()
      }, [])

    return <div className="brand-table">
      <div className="errors">{errorLoadingBrands}</div>
      {loadingBrands ? <div className="loading">Loading...</div>
      :  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Edit</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
          {state.brands.documents?.map((brand, index) => 
              <BrandRow key={brand.id} brand={brand} index={index} />
          )}
      </tbody>
    </table>
      }
    </div>
}