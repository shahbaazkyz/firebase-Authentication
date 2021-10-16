import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  console.log(currentUser);
  let userName =
    "https://edent.github.io/github_id/#" + currentUser.providerData[0].uid;
  console.log(userName);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt=""
              className="img float-left rounded  "
            />
          )}
          <br />
          <br />
          <strong>Email:</strong> {currentUser.email}
          {currentUser.providerData[0].providerId === "github.com" ? (
            <a
              href={userName}
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-100 button button--social-login button--github mt-3">
                <i className="icon fa fa-github"></i> Go to Profile
              </Button>
            </a>
          ) : (
            <a
              href="https://github.com"
              style={{ textDecoration: "none", color: "white" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-100 button button--social-login button--github mt-3">
                <i className="icon fa fa-github"></i> Go to Github
              </Button>
            </a>
          )}
          {currentUser.providerData[0].providerId === "github.com" ? (
            <> </>
          ) : (
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
          )}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
