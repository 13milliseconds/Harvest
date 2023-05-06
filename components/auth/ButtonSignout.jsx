import { logout } from '../../firebaseConfig'
import Button from '@mui/material/Button'

export default function ButtonSignout () {

    return <>
    <Button variant="contained" onClick={() => logout()} >Sign Out</Button>
    </>
}