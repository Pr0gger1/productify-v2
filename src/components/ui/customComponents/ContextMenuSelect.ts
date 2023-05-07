import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

export const ContextMenuSelect = styled(Select)`
  .MuiInputBase-input {
    height: 0.5rem;
    width: 100%;
    padding: 0;
    color: var(--fontColor);
    //flex: 0 0 100%;
    flex-grow: 1;
  }

  .MuiSelect-root:hover {
    background-color: transparent;
  }

  &:hover {
    border-color: transparent !important;
  }

  & .MuiSelect-select {
    padding: 0.25rem;
  }

  & .MuiSvgIcon-root {
    color: var(--fontColor);
  } 
  
  .MuiPopover-paper {
    background-color: var(--bgColorFirst);
    color: var(--fontColor);
  }

  fieldset {
    border: none;
    outline: none;
  }
`;

