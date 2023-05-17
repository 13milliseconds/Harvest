import { useState } from 'react'
import { getAllDocumentsID, getSingleDocument } from '../../lib/requests'

//Components
import { 
  Link, 
  Typography,
  Container,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  Box,
  Breadcrumbs
} from '@mui/material'
import SelectForm from '../../components/forms/selectForm'
import RangeForm from '../../components/forms/rangeForm'

export default function SinglePlant({plant}) {
  const [state, setState] = useState(plant)

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSwitchChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.checked
    })
  }

  return (
    <Container maxWidth="lg">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Harvest
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/plants"
        >
          Plants
        </Link>
        <Typography color="text.primary">{plant['name']}</Typography>
      </Breadcrumbs>
        <Typography variant="h1">{plant['name']}</Typography>

        <FormControl fullWidth>

        <SelectForm 
          name="exposure" 
          label="Exposure"
          value={state.exposure}
          onChange={handleChange}
          options={[
            {value: 'fullSun', label: 'Full Sun'},
            {value: 'partSun', label: 'Part Sun'},
            {value: 'fullShade', label: 'Full Shade'}
        ]} />

        <SelectForm 
          name="plantingDepth" 
          label="Planting Depth"
          value={state.plantingDepth}
          onChange={handleChange}
          options={[
            {value: '.25', label: '1/4"'},
            {value: '.5', label: '1/2"'},
            {value: '1', label: '1"'}
        ]} />
        </FormControl>

        <FormGroup>
        <FormControlLabel 
          control={<Switch 
            name="coldWeatherCrop"
            checked={state.coldWeatherCrop}
            onChange={handleSwitchChange}
          />} 
          label="Cold Weather Crop" 
        />
        </FormGroup>
        
        <FormGroup>
        <FormControlLabel 
          control={<Switch 
            name="babyGreens"
            checked={state.babyGreens}
            onChange={handleSwitchChange}
          />} 
          label="Baby Green" 
        />
        </FormGroup>

        <RangeForm
          name="spacing" 
          label="Spacing"
          value={state.spacing}
          defaultValue={[0,24]}
          max={24}
          onChange={handleChange}
          unit='"'
        />

        <RangeForm
          name="thinning" 
          label="Thinning Spacing"
          value={state.thinning}
          defaultValue={2}
          max={12}
          onChange={handleChange}
          unit='"'
        />
        
        <RangeForm
          name="germination" 
          label="Days to Germination"
          value={state.germination}
          defaultValue={[0,30]}
          max={90}
          onChange={handleChange}
          unit=' days'
        />
        
        <RangeForm
          name="harvest" 
          label="Days to Harvest"
          value={state.harvest}
          defaultValue={30}
          max={90}
          onChange={handleChange}
          unit=' days'
        />

      <Box className="pt-6">
        { JSON.stringify(state, null, 2) }
      </Box>
  </Container>
  )
}

export async function getStaticProps({params}) {

  try {
    const plant = await getSingleDocument('plants', params.id)
    return {
        props: {
            plant,
            protected: true,
        }
    }
  } catch (error) {
      console.log(error);
  }
}

export async function getStaticPaths() {
  const plants = await getAllDocumentsID('plants')

  // Get the paths we want to prerender
  const paths = plants.map((plant) => ({
    params: { id: plant.id },
  }))

  return {
    paths,
    fallback: false, 
  };
}