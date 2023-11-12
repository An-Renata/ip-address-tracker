import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

function SetViewOnChange({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());

  return null;
}

function Map({ lat, long }) {
  const coords = [lat, long];
  return (
    <div className="map-container">
      <MapContainer
        center={coords}
        zoom={13}
        style={{
          maxWidth: "1440px",
          height: "60vh",
          maxHeight: "80vh",
        }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}></Marker>
        <SetViewOnChange coords={coords} />
      </MapContainer>
    </div>
  );
}

export default Map;
