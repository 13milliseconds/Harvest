import { logout } from '../../firebaseConfig'
import Button from '../Button'

export default function ButtonSignout () {

    return <>
    <Button label="Sign Out" onClick={() => logout()} />
    </>
}