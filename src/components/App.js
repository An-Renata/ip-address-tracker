import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import DisplayInfo from "./DisplayInfo";
import Map from "./Map";

const initialState = {
  lat: 54.6912,
  long: 25.2816,
  IPaddress: "",
  country: "",
  region: "",
  city: "",
  timezone: "",
  isp: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "firstPosition":
      return { ...state, lat: action.payload.lat, long: action.payload.long };
    case "renderInitial":
      return {
        ...state,
        ip: action.payload.ip,
        country: action.payload.country,
        region: action.payload.region,
        city: action.payload.city,
        timezone: action.payload.timezone,
        isp: action.payload.isp,
        lat: action.payload.lat,
        long: action.payload.long,
      };
    case "renderSearch":
      return {
        ...state,
        lat: action.payload.lat,
        long: action.payload.long,
        ip: action.payload.ip,
        country: action.payload.country,
        region: action.payload.region,
        city: action.payload.city,
        timezone: action.payload.timezone,
        isp: action.payload.isp,
      };
    case "reset":
      return { initialState };
    default:
      return state;
  }
}

function App() {
  const [{ lat, long, ip, country, region, city, timezone, isp }, dispatch] =
    useReducer(reducer, initialState);

  const [searchValue, setSearchValue] = useState("");

  function getPosition() {
    console.log("SUCCESS");
  }

  function handleSearchValue(e) {
    if (e.key === "Enter") {
      // preventDefault
      e.preventDefault();
      setSearchValue(e.target.value);
      // Clear input box after the user presses enter
      e.target.value = "";
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, (error) =>
        console.error("Error getting location:", error)
      );

      async function getLocation() {
        const res = await fetch(`https://ipapi.co/json/`);
        const data = await res.json();
        dispatch({
          type: "renderInitial",
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
      }
      getLocation();
    }

    // return () => dispatch({ type: "reset" });
  }, []);

  useEffect(() => {
    if (!searchValue) return;

    async function getNewIPInfo() {
      const res = await fetch(`http://ip-api.com/json/${searchValue}`);
      const data = await res.json();

      console.log(data);
      dispatch({
        type: "renderSearch",
        payload: {
          ip: data.query,
          country: data.country,
          region: data.region,
          city: data.city,
          timezone: data.timezone,
          isp: data.isp,
          lat: data.lat,
          long: data.lon,
        },
      });
    }
    getNewIPInfo();
  }, [searchValue]);

  return (
    <div>
      <Header>
        <SearchBar onSearchValue={handleSearchValue} />
      </Header>

      <DisplayInfo
        IPaddress={ip}
        isp={isp}
        country={country}
        region={region}
        city={city}
        timezone={timezone}
      />
      <Map lat={lat} long={long} />
    </div>
  );
}
export default App;
