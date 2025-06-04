import { useEffect, useState } from "react";
import "./App.css";

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

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "image/jpeg") {
      setError("Only .jpg files are allowed.");
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
    setImages((prev) => [...prev, data.filename]);
  };

  const handleResizeSubmit = (e) => {
    e.preventDefault();
    if (!selected || !dimensions.width || !dimensions.height) return;
    console.log(
      "Width and height sent from client  >>> ",
      dimensions.width,
      dimensions.height
    );
    const url = `${API_URL}/resize?filename=${selected}&width=${dimensions.width}&height=${dimensions.height}`;
    setResizedUrl(url);
  };

  return (
    <div className="App">
      <h1>📷 Image Gallery</h1>

      <input type="file" accept=".jpg" onChange={handleUpload} />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="gallery">
        {images.map((img, idx) => {
          console.log(`Image >>> ${img}`)
          return (
            <img
              key={idx}
              src={`http://localhost:3000/gallery/${img}`}
              alt=""
              onClick={() => setSelected(img)}
              className={selected === img ? "selected" : ""}
            />
          );
        })}
      </div>

      {selected && (
        <form onSubmit={handleResizeSubmit}>
          <h3>Resize "{selected}"</h3>
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
          <a href={resizedUrl} target="_blank">
            {resizedUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
