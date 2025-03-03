'use client'
import { useState } from 'react';
import { DashboardAroundSpinner, DashboardButtonGroup, DashboardContainerWrapper, DashboardFormWrapper, DashboardHeading, DashboardInput, DashboardInputWrapper, DashboardSelectInput } from 'kifanga-ui-nav';
import { useCreateResourceNoAuth, useDependencyDropdown } from 'kifanga-ui-hooks';
import { BASE_URL } from '@/helpers';

export default function Join() {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    };

    const {
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
    } = useDependencyDropdown(BASE_URL);

    const { data: dataCreated, createResource } = useCreateResourceNoAuth(BASE_URL, 'customers');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = {
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerNumber: formData.customerNumber,
            countryId: selectedCountry ? parseInt(selectedCountry, 10) : null,
            regionId: selectedRegion ? parseInt(selectedRegion, 10) : null,
            cityId: selectedCity ? parseInt(selectedCity, 10) : null,
        };
        await createResource(newResource, '/');
    };

  return (
    <div className="max-w-md mx-auto my-auto">
        <DashboardContainerWrapper>
            <DashboardHeading title="Join Today" />
            {/* {dataCreated.error && !dataCreated.loading && <Messages>{dataCreated.error}</Messages>} */}
            <DashboardFormWrapper>
                <DashboardAroundSpinner loading={dataCreated.loading}>
                    <DashboardInputWrapper>
                        <DashboardInput
                            label="Name"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            width="md:w-1/1"
                        />
                    </DashboardInputWrapper>
                    <DashboardInputWrapper>
                        <DashboardInput
                            label="Email"
                            type='email'
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            placeholder="johndoe@gmail.com"
                            width="md:w-1/1"
                        />
                    </DashboardInputWrapper>
                    <DashboardInputWrapper>
                        <DashboardInput
                            label="Mobile Number"
                            name="customerNumber"
                            value={formData.customerNumber}
                            onChange={handleChange}
                            placeholder="+2547123456789"
                            width="md:w-1/1"
                        />
                    </DashboardInputWrapper>
                    <DashboardInputWrapper>
                        <DashboardSelectInput 
                            label="Country"
                            item={selectedCountry} 
                            change={(e) => handleCountryChange(e.target.value)}
                            options={countries}
                            placeholder="Select Country"
                        />
                    </DashboardInputWrapper>
                    <DashboardInputWrapper>
                        <DashboardSelectInput 
                            label="Region"
                            item={selectedRegion} 
                            change={(e) => handleRegionChange(e.target.value)}
                            options={regions}
                            placeholder="Select Region"
                            disabled={!selectedCountry}
                        />
                    </DashboardInputWrapper>
                    <DashboardInputWrapper>
                        <DashboardSelectInput 
                            label="City"
                            item={selectedCity} 
                            change={(e) => setSelectedCity(e.target.value)}
                            options={cities}
                            placeholder="Select City"
                            disabled={!selectedRegion}
                        />
                    </DashboardInputWrapper>
                </DashboardAroundSpinner>
                <DashboardButtonGroup onSubmit={handleSubmit} type='button' submitLabel='Join Now' width='w-full' loading={dataCreated.loading} />
            </DashboardFormWrapper>
        </DashboardContainerWrapper>
    </div>
  );
}