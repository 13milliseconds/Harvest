//components
import BrandForm from '../../components/BrandForm';
import BrandsTable from '../../components/BrandsTable';


export default function PlantsPage() {
  return (
    <main className="min-h-screen p-24">
        <div className="">
          <BrandsTable />
        </div>
        <div className="pt-6">
         <BrandForm />
        </div>
    </main>
  )
}
