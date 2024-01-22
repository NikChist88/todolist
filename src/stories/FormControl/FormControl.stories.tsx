import { FormControl } from '../../components/formControl/FormControl'

export default {
  title: 'FormControl Component',
  component: FormControl,
}

export const FormControlExample = (props: any) => {
  return (
    <FormControl
      label="Form control"
      action={() => {
        alert('action')
      }}
    />
  )
}
