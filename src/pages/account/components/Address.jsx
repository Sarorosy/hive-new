import React, { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { useAuth } from "../../../utils/idb";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const { user, setBillingAddress, logout } = useAuth();
  const navigate = useNavigate();
  const effectiveUser = user;
  const existingBillingAddress = useMemo(() => {
    return effectiveUser?.billing_address || effectiveUser?.billling_address || null;
  }, [effectiveUser]);


  const [isFormOpen, setIsFormOpen] = useState(false);
  const [savedBillingAddress, setSavedBillingAddress] = useState(existingBillingAddress);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    company_name: "",
    country: "Wallis and Futuna",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);


  // Load countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (formValues.country) {
      const selectedCountry = countries.find(c => c.name === formValues.country);
      if (selectedCountry) {
        setStates(State.getStatesOfCountry(selectedCountry.isoCode));
      } else {
        setStates([]);
      }
      setFormValues(prev => ({ ...prev, state: "", city: "" }));
      setCities([]);
    }
  }, [formValues.country, countries]);

  // Load cities when state changes
  useEffect(() => {
    if (formValues.state) {
      const selectedCountry = countries.find(c => c.name === formValues.country);
      const selectedState = states.find(s => s.name === formValues.state);
      if (selectedCountry && selectedState) {
        setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
      } else {
        setCities([]);
      }
      setFormValues(prev => ({ ...prev, city: "" }));
    }
  }, [formValues.state, states, formValues.country, countries]);


  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };


  const hasBillingAddress = Boolean(savedBillingAddress);



  const onSubmit = async (event) => {
    event.preventDefault();

    const newBillingAddress = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      company_name: formValues.company_name.trim() || undefined,
      country: formValues.country,
      address_1: formValues.address_1.trim(),
      address_2: formValues.address_2.trim() || undefined,
      city: formValues.city.trim(),
      state: formValues.state.trim(),
      postal_code: formValues.postal_code.trim(),
      phone: formValues.phone.trim(),
    };

    try {
      setSubmitting(true);
      const token = effectiveUser?.token;

      const response = await axios.post(
        `${API_URL}/api/user/update_billing_address`,
        { billing_address: newBillingAddress },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = response.data;
      if (data?.status) {
        setBillingAddress(newBillingAddress);
        setSavedBillingAddress(newBillingAddress);
        setIsFormOpen(false);
        toast.success(data?.message || "Billing address saved successfully!", { autoClose: 2000 });
      } else {
        if(data?.message === "Token expired") {
          toast.error("Please login to save billing address");
          logout();
          navigate("/account/login?SESSION_EXPIRED=true");
        }else{
          toast.error(data?.message || "Failed to save billing address");
        }
      }
    } catch (error) {
      toast.error("Failed to save billing address");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper to color the required asterisk red
  const Label = ({ text }) => (
    <label className="text-sm font-medium mb-1">
      {text.split("*")[0]} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div className="w-full border border-gray-300 rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">Billing address</h2>

      {!hasBillingAddress && !isFormOpen && (
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            The following addresses will be used on the checkout page by default.
          </p>

          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-base font-medium">Billing address</span>
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="text-sm px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-800"
              >
                Add
              </button>
            </div>
            <p className="text-sm text-gray-600">
              You have not set up this type of address yet.
            </p>
          </div>
        </div>
      )}

      {isFormOpen && (
        <form onSubmit={onSubmit} className="mt-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label text="First name *" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={onChange}
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="flex flex-col">
              <Label text="Last name *" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={onChange}
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Company name (optional)</label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              value={formValues.company_name}
              onChange={onChange}
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col">
            <Label text="Country" />
            <select
              id="country"
              name="country"
              value={formValues.country}
              onChange={onChange}
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
            >
              <option value="">Select country</option>
              {countries.map(c => (
                <option key={c.isoCode} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <Label text="Street address *" />
            <input
              id="address_1"
              name="address_1"
              type="text"
              placeholder="House number and street name"
              value={formValues.address_1}
              onChange={onChange}
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
            <input
              id="address_2"
              name="address_2"
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              value={formValues.address_2}
              onChange={onChange}
              className="mt-2 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <Label text="State *" />
              <select
                id="state"
                name="state"
                value={formValues.state}
                onChange={onChange}
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="">Select state</option>
                {states.map(s => (
                  <option key={s.isoCode} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <Label text="Town / City *" />
              <select
                id="city"
                name="city"
                value={formValues.city}
                onChange={onChange}
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
              >
                <option value="">Select city</option>
                {cities.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>



            <div className="flex flex-col">
              <Label text="postal_code / ZIP *" />
              <input
                id="postal_code"
                name="postal_code"
                type="text"
                value={formValues.postal_code}
                onChange={onChange}
                className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label text="Phone *" />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={onChange}
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 disabled:opacity-60">
              {submitting ? "Saving..." : "Save address"}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-md border hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {hasBillingAddress && !isFormOpen && (
        <div className="mt-2 border rounded-md p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Billing address</span>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-700">
            <p>
              {savedBillingAddress.firstName} {savedBillingAddress.lastName}
            </p>
            {savedBillingAddress.company_name && <p>{savedBillingAddress.company_name}</p>}
            <p>{savedBillingAddress.address_1}</p>
            {savedBillingAddress.address_2 && <p>{savedBillingAddress.address_2}</p>}
            <p>
              {savedBillingAddress.city}, {savedBillingAddress.state}{" "}
              {savedBillingAddress.postal_code}
            </p>
            <p>{savedBillingAddress.country}</p>
            <p>Phone: {savedBillingAddress.phone}</p>
          </div>
        </div>
      )}
    </div>
  );
}
