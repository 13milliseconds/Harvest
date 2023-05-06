import { useAuthState } from '../hooks/useAuth';

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
  Box
} from '@mui/material'

export default function Header () {
  const [loading, error, user] = useAuthState();

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
      </Toolbar>
    </Container>
    </AppBar>
}