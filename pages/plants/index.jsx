//components
import FormPlant from '../../components/PlantForm';
import TablePlants from '../../components/PlantsTable';
import Container from '@mui/material/Container';


export default function PlantsPage() {
  return (
      <Container maxWidth="lg">
        <div className="">
          <TablePlants />
        </div>
        <div className="pt-6">
         <FormPlant />
        </div>
  </Container>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}