//Components
import { 
    Select,
    InputLabel,
    MenuItem,
    FormGroup,
  } from '@mui/material'

export default function SelectForm ({name, label, value, options, onChange}){

    return <FormGroup>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      name={name}
      value={value}
      label={label}
      onChange={onChange}
    >
        {
            options.map((option) => <MenuItem key={option.value} value={option.value}>{ option.label }</MenuItem>)
        }
    </Select>
    </FormGroup>
}