import React, { useState } from "react";
import AdDataService from "../services/Ads";

const AddAd = () => {
  const initialAdState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [ad, setAd] = useState(initialAdState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setAd({ ...ad, [name]: value });
  };

  const saveAd = () => {
    var data = {
      title: ad.title,
      description: ad.description
    };

    AdDataService.create(data)
      .then(response => {
        setAd({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newAd = () => {
    setAd(initialAdState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newAd}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={ad.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={ad.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveAd} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAd;