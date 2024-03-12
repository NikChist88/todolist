import { FC, useState, MouseEvent } from "react"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"
import { FilterType } from "../../store/todolists/todolists-reducer"

type FilterPropsType = {
  id: string
  changeFilter: (id: string, filter: FilterType) => void
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
        onClick={() => changeFilter(id, "all")}
      >
        ALL
      </ToggleButton>
      <ToggleButton
        value={"active"}
        onClick={() => changeFilter(id, "active")}
      >
        ACTIVE
      </ToggleButton>
      <ToggleButton
        value={"completed"}
        onClick={() => changeFilter(id, "completed")}
      >
        COMPLETED
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
