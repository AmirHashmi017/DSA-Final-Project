import React, { useEffect } from "react";
import { useTopVisitedLocations } from "../utils/TopVisitedLocationsContext";

const TopVisitedLocations = ({ userId }) => {
  const { locations, loading, error, fetchTopLocations } = useTopVisitedLocations();

  useEffect(() => {
    if (userId) {
      fetchTopLocations(userId);
    }
  }, [userId, fetchTopLocations]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && locations.length === 0 && <p>No locations found.</p>}
      {locations.length > 0 && (
        <ul>
          {locations.map((location, index) => (
            <li key={index}>
              {location.route} - <strong>{location.count} visits</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopVisitedLocations;
