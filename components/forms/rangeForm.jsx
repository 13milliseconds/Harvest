//Components
import { 
    InputLabel,
    Slider,
    Box,
  } from '@mui/material'

export default function RangeForm (props){
    const {
        name, 
        label,
        value, 
        unit,
        defaultValue,
        max, 
        onChange
    } = props

    const unitText = (currentValue) => {
        return currentValue + unit;
      }

    return <Box>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Slider
          labelId={`${name}-label`}
          getAriaLabel={()=>label}
          value={value}
          defaultValue={defaultValue}
          max={max}
          name={name}
          onChange={onChange}
          valueLabelDisplay="auto"
          getAriaValueText={unitText}
        />
    </Box>
}