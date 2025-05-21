import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";

const GroupsList = ({ groups, handleSelectGroup, selectedGroup }) => {
  const memoizedGroups = React.useMemo(() => groups, [groups]);

  return (
    <List className="groups-list">
      {memoizedGroups.map(({ id, name }) => (
        <ListItem key={id} button selected={id === selectedGroup} onClick={() => handleSelectGroup(id)}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupsList;
