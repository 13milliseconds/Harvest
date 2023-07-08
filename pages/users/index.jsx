//components
import Container from '@mui/material/Container';
import TypoTitle from '@/components/typography/title';


export default function UsersPage() {
  return (
    <Container maxWidth="lg">
        <TypoTitle text="Users" />
        <div className="">
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