import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

import { ProgrammingLanguage } from "../../types"
import api from "../../api";
import { Link } from "react-router";



const ProglangsPage: React.FC = () => {
  const [proglangs, setProglangs] = useState<ProgrammingLanguage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProglangs = async () => {
      try {
        const { data } = await api.get("/proglangs");
        setProglangs(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };
    fetchProglangs();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <BarLoader color="#646cff" loading={true} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (proglangs.length === 0) {
    return <div>No programming languages found</div>;
  }

  return (
    <div>
      <h1>Programming Languages Page</h1>
      <ul>
        {proglangs.map((proglang) => (
          <li key={proglang._id}>
            <Link to={`/proglangs/${proglang._id}`}>{proglang.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProglangsPage;