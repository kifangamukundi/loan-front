import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useDependencyDropdown = (url) => {
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  
  // New states for selected values
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get(`${url}/countries/all/no-auth`);
      setCountries(data.data.item);
    };

    fetchCountries();
  }, [url]);

  const handleCountryChange = useCallback(async (countryId) => {
    console.log(`Fetching regions for country ID: ${countryId}`);
    const { data } = await axios.get(`${url}/countries/by/regions/${countryId}`);
    setRegions(data.data.item);
    setCities([]); // Clear cities when changing country
    setSelectedCountry(countryId); // Update selected country
    setSelectedRegion(''); // Clear the selected region
    setSelectedCity(''); // Clear the selected city
  }, [url]);

  const handleRegionChange = useCallback(async (regionId) => {
    const { data } = await axios.get(`${url}/regions/by/cities/${regionId}`);
    setCities(data.data.item);
    setSelectedRegion(regionId); // Update selected region
    setSelectedCity(''); // Clear the selected city
  }, []);

  return {
    countries,
    regions,
    cities,
    selectedCountry,
    selectedRegion,
    selectedCity,
    setSelectedCountry,
    setSelectedRegion,
    setSelectedCity,
    handleCountryChange,
    handleRegionChange,
  };
};

export default useDependencyDropdown;