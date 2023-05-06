import { useDeleteDocument } from '../hooks/useAPI'

//Components
import {
  Button, 
  TableRow,
  TableCell
} from '@mui/material' 

export default function PlantRow(props){
    const plant = props.plant
    const index = props.index
    const [loadingDelete, errorDelete, deletePlant] = useDeleteDocument('plants')

    return <TableRow key={plant.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-slate-50 dark:bg-slate-300'} border-b text-black`}>
    <TableCell scope="row" className="px-6 py-4">
      { plant.data['common-name'] }
    </TableCell>
    <TableCell className="px-6 py-4">0</TableCell>
    <TableCell className="px-6 py-4">
      <Button href={`/plants/${plant.id}`}>Edit</Button>
      </TableCell>
    <TableCell className="px-6 py-4">
      <Button onClick={() => { deletePlant(plant.id) }} >{loadingDelete ? 'Deleting' : 'Delete'}</Button>
      <div className="error">{errorDelete}</div>
    </TableCell>
</TableRow>
}