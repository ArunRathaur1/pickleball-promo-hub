
import React from "react";

export const AthleteList = ({ athletes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {athletes.length === 0 ? (
        <p className="text-center text-muted-foreground">No players found.</p>
      ) : (
        athletes.map((athlete) => (
          <div key={athlete._id} className="border border-border bg-card rounded-lg p-4 shadow-md">
            <img 
              src={athlete.imageUrl} 
              alt={athlete.name} 
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold text-foreground">{athlete.name}</h2>
            <p className="text-muted-foreground">🌍 Country: {athlete.country}</p>
            <p className="text-muted-foreground">🔥 Points: {athlete.points}</p>
            <p className="text-muted-foreground">🧑‍🤝‍🧑 Gender: {athlete.gender}</p>
          </div>
        ))
      )}
    </div>
  );
};
