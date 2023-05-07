import { useAuth } from '../context/authContext'
import { useState } from 'react'

//Components
import {
  AppBar,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Button,
  Typography,
  Link,
  Box,
  IconButton
} from '@mui/material'
import {AccountCircle} from '@mui/icons-material'

export default function Header () {
  const user = useAuth()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  }


    return <AppBar position='fixed'>
    <Container maxWidth="xl">
    <Toolbar disableGutters>
    <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase'
            }}
          >
            Seed to Fruit
          </Typography>
        { user && 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button href="/plants">Plants</Button>
        <Button href="/brands">Brands</Button>
      </Box>
      }
      <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={handleMenu}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem href='/profile'>Profile</MenuItem>
      <MenuItem href='/account'>My account</MenuItem>
      <MenuItem href='/signout'>Sign Out</MenuItem>
    </Menu>
      </Toolbar>
    </Container>
    </AppBar>
}