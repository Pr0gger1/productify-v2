import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";


export const TaskCategorySelect = styled(Select)`
  & {
    width: 100%;
    background-color: var(--bgColorFirst);
  }
  
  .Mui-disabled {
    color: var(--fontColor) !important;
  }
  
  .MuiInputBase-input {
    height: 0.5rem;
    color: var(--fontColor);
    flex-grow: 1;
  }
  
  & .MuiSvgIcon-root {
    color: var(--fontColor);
  } 
  
  .MuiPopover-paper {
    background-color: var(--bgColorFirst);
    color: var(--fontColor);
  }
`;