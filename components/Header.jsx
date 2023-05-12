import { useAuth, logout } from '../context/authContext'
import { useState } from 'react'
import Router from 'next/router'

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
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    Router.push('/')
    logout()
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
        { user && <div>
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
      <MenuItem component={Link} href='/account' onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
    </Menu>
    </div>
    }
      </Toolbar>
    </Container>
    </AppBar>
}