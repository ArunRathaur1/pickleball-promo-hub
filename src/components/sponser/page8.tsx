const MinorLeagueSection = () => {
  return (
    <div
      id="container06"
      className="w-full bg-gray-100 py-12 flex justify-center"
    >
      <div className="max-w-5xl w-full px-6">
        <div className="flex flex-col items-center text-center">
          {/* Image Section */}
          <div id="image03" className="border rounded-md shadow-md p-4 mb-6">
            <span className="block">
              <img
                src="/Partner with The Dink_files/image03.png"
                alt="The Dink Minor League"
                title="The Dink Minor League"
                className="rounded-md"
              />
            </span>
          </div>

          {/* Title */}
          <h3 id="text18" className="text-2xl font-bold text-orange-600 mb-4">
            The Largest Amateur Team Circuit
          </h3>

          {/* Table Section */}
          <div
            id="table02"
            className="w-full max-w-md bg-white shadow-md rounded-md p-6 mb-6"
          >
            <table className="w-full text-center">
              <thead>
                <tr className="text-xl font-bold text-orange-600">
                  <th>20k</th>
                  <th>300</th>
                  <th>8</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="pt-2 text-sm">Players</td>
                  <td className="pt-2 text-sm">Events</td>
                  <td className="pt-2 text-sm">Countries</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Description */}
          <p
            id="text23"
            className="text-lg text-gray-700 leading-relaxed max-w-3xl"
          >
            Minor League Pickleball is the team-based amateur tour where
            everyday players battle like pros. Across the U.S. and now
            internationally, teams compete in local, state, and regional events,
            with division winners earning the coveted Dream Ticket — an
            invitation to the $100K winner-take-all National Championship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinorLeagueSection;
