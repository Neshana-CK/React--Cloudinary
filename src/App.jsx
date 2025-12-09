import React, { useState } from "react";
import "./App.css"

function App() {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "first_time_using_cloudinary");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drtdfrjw3/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadImageURL = await res.json();
      console.log("Image URL:", uploadImageURL.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-container">
        <div className="upload-icon">
          {loading ? "Uploading..." : "Upload a File"}
        </div>

        {/* Visible default browser file button */}
        <input
          type="file"
          className="file-input-visible"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  );
}

export default App;
