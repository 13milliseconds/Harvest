import { dbContext } from '../context/databaseContext';
import { useContext, useEffect} from 'react';
import { useGetDocuments } from '../hooks/useAPI'

//Components
import PlantRow from './PlantRow';
import { 
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material'

export default function PlantsTable(){
  const state = useContext(dbContext)
  const [loadingPlants, errorLoadingPlants,  getPlants] = useGetDocuments('plants');

    useEffect(() => {
        if( !state.plants.loaded) getPlants()
      }, [])

    return <TableContainer component={Paper}>
      <div className="errors">{errorLoadingPlants}</div>
      {loadingPlants ? <div className="loading">Loading...</div>
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
          {state.plants.documents?.map((plant, index) => 
              <PlantRow key={plant.id} plant={plant} index={index} />
          )}
      </TableBody>
    </Table>
      }
    </TableContainer>
}