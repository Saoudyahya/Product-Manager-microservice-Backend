import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const SelectGroupTwo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  const selectCountry = (val: string) => {
    setCountry(val);
  };

  const selectRegion = (val: string) => {
    setRegion(val);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        Select Country
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
