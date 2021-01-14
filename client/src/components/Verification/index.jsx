import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { Button } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
const Verification = () => {
  const { verify } = useAuth();
  const [error, setError] = useState(false);
  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const onClick = () => {
    setError(false);
    setloading(true);
    setsuccess(false);
    verify(
      () => {
        setloading(false);
        setsuccess({
          message: `A verification mail has been sent to your email.`,
        });
      },
      (err) => {
        setloading(false);
        setError(err);
      }
    );
  };
  return (
    <div className="verification py-5 my-5">
      <section className="content border px-3 rounded">
        <div className="row">
          <div className="col-12">
            <h1 className="text-lg">Welcome</h1>
            <div className="text-md text-color">Tech Kit</div>
            <div>
              <Button
                onClick={onClick}
                variant="contained"
                color="primary"
                endIcon={<CheckIcon />}
              >
                Verify Account
              </Button>
              <span className="px-2">
                {error && !loading && (
                  <div className="alert my-2 alert-danger">{error.message}</div>
                )}
                {success && !loading && (
                  <div className="alert my-2 alert-success">
                    {success.message}
                  </div>
                )}
              </span>
            </div>
            <p className="regular-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
              delectus id molestiae consectetur quod rerum sint Iste unde.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verification;
