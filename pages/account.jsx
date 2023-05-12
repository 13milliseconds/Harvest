import {useEffect, useContext, useState} from 'react'
import { useAuth } from '../context/authContext';
import { dbContext } from '../context/databaseContext'
import { useGetUser, useDeleteAccount } from '../hooks/useAPI'
import { 
    Button,
    Container,
    Typography,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle
 } from '@mui/material';

export default function Home() {
  const {user: userAuth} = useAuth()
  const { user } = useContext(dbContext)
  const [ loading, error, getUser ] = useGetUser()
  const [ loadingDelete, errorDelete, deleteAccount ] = useDeleteAccount()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(()=>{
      if (!user.loaded) getUser(userAuth.uid)
  }, [userAuth])

  //Log Errors
  if(error) console.log(error)
  if(errorDelete) console.log(errorDelete)

  // Button Actions
  const handleOpen = () => {
    setDeleteDialogOpen(true)
  }
  const handleClose = () => {
    setDeleteDialogOpen(false)
    }
    const handleDelete = () => {
      deleteAccount(userAuth.uid)
    }

  return (
    <Container maxWidth="lg">

       {loading 
       ? <div>Loading...</div>
       :<div>
            <Typography variant="h1" >My Account</Typography>
            <p>Email: {user.email}</p>
            <Button onClick={handleOpen}>Delete</Button>
            <Dialog
            open={deleteDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you would like to delete your account?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Your data will be deleted forever.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
                {loadingDelete ? 'Deleting' : 'Delete'}
            </Button>
            </DialogActions>
        </Dialog>
          </div> 
      }
      
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