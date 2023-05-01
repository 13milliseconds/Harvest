import { useDeleteDocument } from '../hooks/useAPI'

//Components
import Button from '../components/Button'
import Link from 'next/link'

export default function PlantRow(props){
    const plant = props.plant
    const index = props.index
    const [loadingDelete, errorDelete, deletePlant] = useDeleteDocument('plants')

    return <tr key={plant.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-slate-50 dark:bg-slate-300'} border-b text-black`}>
    <th scope="row" className="px-6 py-4">{ plant.data['common-name'] }</th>
    <td className="px-6 py-4">0</td>
    <td className="px-6 py-4"><Link href={`/plants/${plant.id}`}>Edit</Link></td>
    <td className="px-6 py-4">
      <Button onClick={() => { deletePlant(plant.id) }} label={loadingDelete ? 'Deleting' : 'Delete'} />
      <div className="error">{errorDelete}</div>
    </td>
</tr>
}