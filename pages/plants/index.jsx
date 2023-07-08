//components
import FormPlant from '@/components/PlantForm';
import TablePlants from '@/components/PlantsTable';
import Container from '@mui/material/Container';
import TypoTitle from '@/components/typography/title';


export default function PlantsPage() {
  return (
      <Container maxWidth="lg">
        <TypoTitle text="Plants" />
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