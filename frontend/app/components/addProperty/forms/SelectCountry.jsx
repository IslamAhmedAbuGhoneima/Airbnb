'use client';
import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

const SelectCountry = ({ value, onChange }) => {
    const { getAllCountries } = useCountries();
    return (
        <Select
            placeholder="Any where"
            isClearable={true}
            options={getAllCountries()}
            value={value}
            onChange={onChange}
        />
    )
}

export default SelectCountry;