import { Typography } from "@mui/material"

export default function TypoTitle ({text}) {
    return <Typography
    variant="h4"
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
    {text}
  </Typography>
}