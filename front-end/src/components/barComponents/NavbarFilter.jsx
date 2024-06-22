import React, { useEffect, useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from '../../utils/axios';
import { useAuthContext } from "../../auth/useAutContext";

const ITEM_HEIGHT = 78;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelectCheckmarks({ onSelectRegions }) {
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios.get("/cities");

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const dataRegions = response.data;
                setRegionData(dataRegions);
                setError(null);
            } catch (error) {
                console.error("Error fetching region data:", error);
                setError("Error fetching region data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const handleChangeRegions = (event) => {
        const { value } = event.target;
        setSelectedRegions(value);
        onSelectRegions(value);
    };

    return (
        <div >
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel style={{ color: 'white' }} id="demo-multiple-checkbox-label">
                    Region
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedRegions}
                    onChange={handleChangeRegions}
                    input={<OutlinedInput label="Tag" sx={{ borderColor: 'white' }} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {loading && <MenuItem disabled>Loading...</MenuItem>}
                    {error && <MenuItem disabled>Error: {error}</MenuItem>}
                    {!loading &&
                        regionData.map((region) => (
                            <MenuItem key={region.id} value={region.name}>
                                <Checkbox checked={selectedRegions.indexOf(region.name) > -1} />
                                <ListItemText primary={region.name} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
}
