import { FC, useState, MouseEvent } from "react"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { FilterType } from "../../store/reducers/todolists-reducer/todolists-reducer"

type FilterPropsType = {
  id: string
  changeFilter: (filter: FilterType, id: string) => void
}

export const Filter: FC<FilterPropsType> = ({ id, changeFilter }) => {
  const [alignment, setAlignment] = useState("all")

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color='primary'
      value={alignment}
      exclusive
      size='small'
      onChange={handleChange}
      aria-label='Filter type'
    >
      <ToggleButton
        value={"all"}
        onClick={() => changeFilter("all", id)}
      >
        ALL
      </ToggleButton>
      <ToggleButton
        value={"active"}
        onClick={() => changeFilter("active", id)}
      >
        ACTIVE
      </ToggleButton>
      <ToggleButton
        value={"completed"}
        onClick={() => changeFilter("completed", id)}
      >
        COMPLETED
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
