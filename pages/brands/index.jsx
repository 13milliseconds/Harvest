//components
import BrandForm from '../../components/BrandForm';
import BrandsTable from '../../components/BrandsTable';
import { useState } from 'react';
import {
  Container,
  Fab,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function PlantsPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
        <BrandsTable />
        <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <BrandForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
