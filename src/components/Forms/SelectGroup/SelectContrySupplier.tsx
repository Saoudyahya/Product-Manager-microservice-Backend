import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const SelectGroupTwo: React.FC = ({ onCountryChange, onRegionChange }) => {
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  const selectCountry = (val: string) => {
    setCountry(val);
    onCountryChange(val); // Pass selected country to parent component
  };

  const selectRegion = (val: string) => {
    setRegion(val);
    onRegionChange(val); // Pass selected region to parent component
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        Select Country - region 
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <CountryDropdown
          value={country}
          onChange={(val) => selectCountry(val)}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => selectRegion(val)}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white mt-3"
        />
      </div>
    </div>
  );
};

export default SelectGroupTwo;
