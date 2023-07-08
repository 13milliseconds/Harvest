import { useContext } from 'react';
import { dbContext } from '@/context/databaseContext';
import TypoTitle from '@/components/typography/title';
import { 
    Container, 
 } from '@mui/material';

export default function LoginPage () {
    const {user} = useContext(dbContext)

    return <Container maxWidth="lg">
        <TypoTitle text="My Plants" />
        {user.plants 
        ? 'Here are your plants'
        : 'No plant in your library'
        }
    </Container>
}