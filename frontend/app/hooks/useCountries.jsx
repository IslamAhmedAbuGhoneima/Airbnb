import countries from "world-countries";

const formattedCountries = countries.map((country) => (
    {
        value: country.cca2,
        label: country.name.common
    }
));
const useCountries = () => {
    const getAllCountries = () => formattedCountries;
    const getByValue = (value) => getAllCountries().find((country) => value === country.value);
    return {
        getAllCountries,
        getByValue
    }
}

export default useCountries