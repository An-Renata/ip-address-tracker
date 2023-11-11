function DisplayInfo({ country, isp, IPaddress, city, region, timezone }) {
  return (
    <div className="main-info-container">
      <div>
        <p>ip address</p>
        <p>{IPaddress}</p>
      </div>
      <div>
        <p>location</p>
        <p>
          {country}, {city}, {region}
        </p>
      </div>
      <div>
        <p>timezone</p>
        <p>{timezone}</p>
      </div>
      <div>
        <p>ISP</p>
        <p>{isp}</p>
      </div>
    </div>
  );
}

export default DisplayInfo;
