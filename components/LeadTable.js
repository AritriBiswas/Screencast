import React from "react";
import Leadertable from "../components/Leadertable";
import Layout from "../components/Layout";

export default function leaderboard() {
  return (
    <Layout>
        <div className="head">
        <div
            className="container neon-box"
            style={{
              textAlign: "center",
              padding:"5px 5px 5px 5px",
              fontSize: "30px",
              fontFamily: "'Russo One', sans-serif",
            }}
          >
            <span className="flicker">LEADERBOARD</span>
        </div>
          </div>
        <div style={{padding:"5px 5px 5px 5px",}} className="leadWrapper">
        <Leadertable />
        </div>
      {/* </div> */}
    </Layout>
  );
}