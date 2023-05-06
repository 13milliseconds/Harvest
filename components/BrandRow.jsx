import { useDeleteDocument } from '../hooks/useAPI'

//Components
import Button from '@mui/material/Button'
import {
  TableCell,
  TableRow,
  Link
 } from '@mui/material'

export default function BrandRow(props){
    const brand = props.brand
    const index = props.index
    const [loadingDelete, errorDelete, deleteBrand] = useDeleteDocument('brands')

    return <TableRow key={brand.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-slate-50 dark:bg-slate-300'} border-b text-black`}>
    <TableCell scope="row" className="px-6 py-4">{ brand.data['name'] }</TableCell>
    <TableCell className="px-6 py-4">0</TableCell>
    <TableCell className="px-6 py-4">
      <Link href={`/brands/${brand.id}`}>
        <Button variant="contained">Edit</Button>
      </Link>
    </TableCell>
    <TableCell className="px-6 py-4">
      <Button variant="contained" onClick={() => { deleteBrand(brand.id) }} >{loadingDelete ? 'Deleting...' : 'Delete'}</Button>
      <div className="error">{errorDelete}</div>
    </TableCell>
</TableRow>
}