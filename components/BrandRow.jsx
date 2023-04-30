import { useDeleteDocument } from '../hooks/useAPI'

//Components
import Button from './Button'
import Link from 'next/link'

export default function BrandRow(props){
    const brand = props.brand
    const index = props.index
    const [loadingDelete, errorDelete, deleteBrand] = useDeleteDocument('brands')

    return <tr key={brand.id} className={`${index % 2 == 0 ? 'bg-white' : 'bg-grey-50'} border-b`}>
    <th scope="row" className="px-6 py-4">{ brand.data['name'] }</th>
    <td className="px-6 py-4">0</td>
    <td className="px-6 py-4"><Link href={`/brands/${brand.id}`}>Edit</Link></td>
    <td className="px-6 py-4">
      <Button onClick={() => { deleteBrand(brand.id) }} label={loadingDelete ? 'Deleting...' : 'Delete'} />
      <div className="error">{errorDelete}</div>
    </td>
</tr>
}