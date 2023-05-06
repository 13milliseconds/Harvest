import { dbContext } from '../context/databaseContext';
import { useContext, useEffect} from 'react';
import { useGetDocuments } from '../hooks/useAPI'

//Components
import BrandRow from './BrandRow';
import { 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

export default function BrandsTable(){
  const state = useContext(dbContext)
  const [loadingBrands, errorLoadingBrands,  getBrands] = useGetDocuments('brands');

    useEffect(() => {
        if( !state.brands.loaded) getBrands()
      }, [])

    return   <TableContainer component={Paper}>
      <div className="errors">{errorLoadingBrands}</div>
      {loadingBrands ? <div className="loading">Loading...</div>
      :  <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Name</TableCell>
              <TableCell scope="col">Qty</TableCell>
              <TableCell scope="col">Edit</TableCell>
              <TableCell scope="col">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {state.brands.documents?.map((brand, index) => 
              <BrandRow key={brand.id} brand={brand} index={index} />
          )}
      </TableBody>
    </Table>
      }
    </TableContainer>
}