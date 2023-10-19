import { useRef } from "react";
import { Map, MapMarker, MapTypeControl } from "react-kakao-maps-sdk";

interface MapInfoProps {
  coord: [number, number];
  setCoord: (coord: [number, number]) => void;
}

export default function MapInfo({ coord, setCoord }: MapInfoProps) {
  const mapRef = useRef<kakao.maps.Map>(null);

  const handleStop = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    setCoord([center.getLat(), center.getLng()]);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "20rem" }}>
      <Map
        center={{ lat: 37.63346463214003, lng: 127.07804230975643 }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        level={3}
        onDragEnd={handleStop}
        onZoomChanged={handleStop}
        ref={mapRef}
      >
        <MapTypeControl position={"TOPRIGHT"} />
        {coord && <MapMarker position={{ lat: coord[0], lng: coord[1] }} />}
      </Map>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "0.5rem",
          height: "0.5rem",
          backgroundColor: "#228BF9",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      ></div>
    </div>
  );
}
