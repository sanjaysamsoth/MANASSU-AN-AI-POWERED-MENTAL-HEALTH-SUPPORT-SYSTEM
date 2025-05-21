import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../store/features/supportGroups/supportGroupsSlice";
import {
    Box,
    Button,
    Container,
    FormControl,
    InputAdornment,
    TextField,
} from "@mui/material";

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");

    const dispatch = useDispatch();

    const handleCreateGroup = () => {
        if (groupName.trim() !== "") {
            dispatch(createGroup({ name: groupName }));

            setGroupName("");
        }
    };

    return (
        <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <FormControl fullWidth>
                <TextField
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    onClick={handleCreateGroup}
                                    size="large"
                                >
                                    Create
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
        </Container>
    );
};

export default CreateGroup;
