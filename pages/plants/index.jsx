//components
import FormPlant from '../../components/PlantForm';
import TablePlants from '../../components/PlantsTable';


export default function PlantsPage() {
  return (
    <main className="min-h-screen p-24">
        <div className="">
          <TablePlants />
        </div>
        <div className="pt-6">
         <FormPlant />
        </div>
    </main>
  )
}
