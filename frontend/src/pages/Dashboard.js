import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [connectingTo, setConnectingTo] = useState(null);

  useEffect(() => {
    setPeople([
      {
        name: "John Doe",
        details: "Details about John",
        user_id: "1",
        skills: ["JavaScript", "React"],
        imageUrl: "https://i.imgur.com/Q9WPlWA.jpeg",
      },
      {
        name: "Jane Doe",
        details: "Details about Jane",
        user_id: "2",
        skills: ["CSS", "HTML"],
        imageUrl: "https://i.imgur.com/OckVkRo.jpeg",
      },
    ]);
  }, []);

  const handleConnect = async (personId, connect) => {
    if (connect) {
      setConnectingTo(personId);
      console.log(`Connecting with ${personId}`);
      setTimeout(() => {
        console.log(`Connected with ${personId}`);
        if (!connectedPeople.includes(personId)) {
          setConnectedPeople([...connectedPeople, personId]);
        }
        setConnectingTo(null);
      }, 100000);
    } else {
      console.log(`Did not connect with ${personId}`);
    }
  };

  const filteredPeople =
    searchTerm.length === 0
      ? people
      : people.filter((person) =>
          person.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );

  return (
    <div className="dashboard">
      <input
        type="text"
        placeholder="Search by skill..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="people-list">
        {filteredPeople.map((person) => (
          <div key={person.user_id} className="person">
            <img
              src={person.imageUrl}
              alt={person.name}
              className="person-image"
            />
            <Link
              to="/skilldisplay"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              {/* Make names clickable to SkillDisplay */}
              <h3>{person.name}</h3>
            </Link>
            <p>{person.details}</p>
            <p>Skills: {person.skills.join(", ")}</p>
            <button onClick={() => handleConnect(person.user_id, true)}>
              {connectingTo === person.user_id ? "Requesting..." : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
