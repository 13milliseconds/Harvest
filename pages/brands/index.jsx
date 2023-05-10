//components
import { useState } from 'react';
import BrandsTable from '../../components/BrandsTable';
import { useAddDocument } from '../../hooks/useAPI';
import {
  Container,
  Fab,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Alert
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function PlantsPage() {
  const [open, setOpen] = useState(false)
  const [inputText, setinputText] = useState('')
  const [loadingAdd, errorAdd , addBrand] = useAddDocument('brands');
    
  const handleSubmit = async function(e){
      e.preventDefault()
      const addRequest = await addBrand({
          'name': inputText,
      })
      addRequest && setinputText('')
      setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <Container maxWidth="lg">
        <BrandsTable />
        <Fab 
          color="primary" 
          aria-label="add" 
          onClick={handleClickOpen}
          className='fixed bottom-6 right-6'
        >
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Brand</DialogTitle>
        <DialogContent>
          <TextField 
        id="name" 
        type="text" 
        label="Name"
        value={inputText} 
        onChange={(e)=> setinputText(e.target.value)}
    />
    {errorAdd && <Alert severity="error">{errorAdd}</Alert>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>handleSubmit(e)}>{loadingAdd? 'Adding' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
