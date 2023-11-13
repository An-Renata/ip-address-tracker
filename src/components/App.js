import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import DisplayInfo from "./DisplayInfo";
import Map from "./Map";
import Main from "./Main";

const ACTIONS = {
  renderInitial: "renderInitial",
  renderSearch: "renderSearch",
};

const initialState = {
  lat: 0,
  long: 0,
  ip: "",
  country: "",
  region: "",
  city: "",
  timezone: "",
  isp: "",
};

function reducer(state, action) {
  switch (action.type) {
    // Initial render depending on the users current location
    case ACTIONS.renderInitial:
      return {
        lat: action.payload.lat,
        long: action.payload.long,
        ip: action.payload.ip,
        country: action.payload.country,
        region: action.payload.region,
        city: action.payload.city,
        timezone: action.payload.timezone,
        isp: action.payload.isp,
      };
    // New info is stored depending on the user input
    case ACTIONS.renderSearch:
      return {
        lat: action.payload.lat,
        long: action.payload.long,
        ip: action.payload.ip,
        country: action.payload.country,
        region: action.payload.region,
        city: action.payload.city,
        timezone: action.payload.timezone,
        isp: action.payload.isp,
      };
    default:
      return state;
  }
}

function App() {
  const [{ lat, long, ip, country, region, city, timezone, isp }, dispatch] =
    useReducer(reducer, initialState);
  // Using state to store search value of the user input
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect function for initial render
  useEffect(() => {
    if (!navigator.geolocation) return;

    if (navigator.geolocation) {
      // get current user location to display the following data
      // using https://ipapi.co/ website to get current position
      async function getLocation() {
        try {
          // Start loading state
          setIsLoading(true);

          const res = await fetch(`https://ipapi.co/json/`);
          const data = await res.json();
          // calling dispatch function to set new values to state object
          dispatch({
            type: ACTIONS.renderInitial,
            payload: {
              ip: data.ip,
              country: data.country,
              city: data.city,
              region: data.region,
              timezone: data.timezone,
              isp: data.org,
              lat: data.latitude,
              long: data.longitude,
            },
          });
          // Turn off loading state
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      }
      getLocation();
    }
  }, []); // only runs on initial render of the app

  // useEffect hook, which will be called when the (searchValue) state changes
  useEffect(() => {
    // if there is no value, do not call the following code, return immediately
    if (!searchValue) return;

    async function getNewIPInfo() {
      try {
        // Start loading state while fetching data
        setIsLoading(true);

        // Fetching data depending on the user input
        const res = await fetch(
          `https://api.techniknews.net/ipgeo/${searchValue}`
        );
        const data = await res.json();

        // if the IP address or domain not found, retun immediately
        if (data.status === "fail") {
          setIsLoading(false);
          return;
        }

        // Update reducer function with the new fetched data
        dispatch({
          type: ACTIONS.renderSearch,
          payload: {
            ip: data.ip,
            country: data.country,
            region: data.region,
            city: data.city,
            timezone: data.timezone,
            isp: data.isp,
            lat: data.lat,
            long: data.lon,
          },
        });
        // Turn off loading state after the fetch is completed
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    getNewIPInfo();
  }, [searchValue]); // useEffect is called on initial render and after searchValue has changed

  return (
    <>
      <Header>
        <SearchBar setSearchValue={setSearchValue} />
      </Header>
      <Main>
        {/* Show loader if data still is being fetched */}
        {isLoading ? (
          <p className="loader">Loading...</p>
        ) : (
          <>
            <DisplayInfo
              IPaddress={ip}
              isp={isp}
              country={country}
              region={region}
              city={city}
              timezone={timezone}
            />
            {/* React leaflet component */}
            <Map lat={lat} long={long} />
          </>
        )}
      </Main>
    </>
  );
}
export default App;
