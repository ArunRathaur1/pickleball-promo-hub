import { useState, useEffect } from "react";

export default function InstagramEmbedExtractor() {
  const [embedCode, setEmbedCode] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const extractInstagramUrl = () => {
    const match = embedCode.match(
      /https:\/\/www\.instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+/
    );

    const extractedUrl = match ? match[0] : null;

    if (extractedUrl) {
      setPostUrl(extractedUrl);
      sendUrlToServer(extractedUrl);
    } else {
      setMessage("Invalid embed code. Please try again.");
    }
  };

  const sendUrlToServer = async (url) => {
    setLoading(true);
    setMessage(""); // Clear previous messages
    try {
      const response = await fetch("http://localhost:5000/instagram/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ ${data.message} (ID: ${data.data._id})`);
      } else {
        setMessage(`❌ Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Failed to send data to server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postUrl.startsWith("http")) {
      const existingScript = document.querySelector(
        'script[src="https://www.instagram.com/embed.js"]'
      );
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
    }
  }, [postUrl]);

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-bold">Instagram URL Extractor</h2>
      <input
        type="text"
        placeholder="Paste Instagram embed code here..."
        value={embedCode}
        onChange={(e) => setEmbedCode(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={extractInstagramUrl}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Saving..." : "Extract & Save"}
      </button>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      {postUrl && postUrl.startsWith("http") && (
        <div className="mt-4">
          <strong>Extracted URL:</strong>{" "}
          <a
            href={postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {postUrl}
          </a>
          <div className="mt-4">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={postUrl}
              data-instgrm-version="14"
            ></blockquote>
          </div>
        </div>
      )}
    </div>
  );
}
