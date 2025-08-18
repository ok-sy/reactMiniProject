import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { rootSx } from "../../styles/Item";
import CheckBox from "./CheckBox";
import Text from "./Text";
interface ItemProps {
  onClickCheckBox(id: number): void;
  onClickDeleteButton(id: number): void;
  completed?: boolean;
  text: string;
  id: number;
}
const Item = ({
  onClickCheckBox,
  onClickDeleteButton,
  completed,
  text,
  id,
}: ItemProps) => {
  return (
    <Box sx={rootSx} display="flex" className="itemContainer">
      <CheckBox checked={completed} onClick={() => onClickCheckBox(id)} />
      <Text completed={completed}>{text}</Text>
      <IconButton onClick={() => onClickDeleteButton(id)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Item;
