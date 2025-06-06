import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://localhost:3000/api/images";

function App() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [resizedUrl, setResizedUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then((res) => res.json())
      .then(setImages);
  }, []);

  // Image upload
  const handleUpload = async (e) => {
    setSelected(null);
    const file = e.target.files[0];
    if (!file || file.type !== "image/jpeg") {
      setError("Invalid file format !! Only .jpg files are allowed.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    const updatedImages = await fetch(`${API_URL}/gallery`).then((res) =>
      res.json()
    );

    setImages(updatedImages);
  };

  // Image resize form
  const handleResizeSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selected || !dimensions.width || !dimensions.height) {
      setError("Select an image and enter valid dimensions !");
      return;
    }

    const requestUrl = `${API_URL}/resize?filename=${selected}&width=${dimensions.width}&height=${dimensions.height}`;

    try {
      const response = await axios.get(requestUrl);
      // console.log(response)
      const resizedUrl = `${response.data.url}`;
      setResizedUrl(resizedUrl);
    } catch (error) {
      if(error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong ! Unexpected !!");
      }
    }
  };

  return (
    <div className="App">
      <h1>Image Gallery</h1>

      <input type="file" accept=".jpg" onChange={handleUpload} />
      {error && <p style={{ color: "yellow" }}>{error}</p>}

      {selected && (
        <form onSubmit={handleResizeSubmit}>
          {selected ? <h3>Resize "{selected}"</h3> : <></>}
          <label>
            Width:
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: e.target.value })
              }
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) =>
                setDimensions({ ...dimensions, height: e.target.value })
              }
            />
          </label>
          <button type="submit">Get Resize URL</button>
        </form>
      )}

      {resizedUrl && (
        <p>
          Resized Image URL:{" "}
          <a href={resizedUrl} target="_blank" rel="noreferrer">
            {resizedUrl}
          </a>
        </p>
      )}

      <div className="gallery">
        {images.map((img, idx) => {
          console.log(`Image >>> ${img}`);
          return (
            <img
              key={idx}
              src={`http://localhost:3000/gallery/${img}`}
              alt=""
              onClick={() => setSelected(img)}
              className={`images {selected === img ? "selected" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
