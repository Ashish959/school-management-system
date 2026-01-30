import { useState } from "react";
import api from "../services/api";
import "../styles/BulkStudentUploadModal.css";

const BulkStudentUploadModal = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- FILE VALIDATION -------- */

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const allowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (!allowed.includes(f.type)) {
      setError("Only Excel (.xlsx) or CSV files allowed");
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB");
      return;
    }

    setFile(f);
    setError("");
    setResult(null);
    setProgress(0);
  };

  /* -------- UPLOAD -------- */

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = new FormData();
      data.append("file", file);

      const res = await api.post("/students/bulk-upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setResult(res.data);
      onSuccess();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Bulk upload failed. Please check file format."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div className="modal-top">
          <h2>Bulk Student Upload</h2>
          <button className="icon-close" onClick={onClose}>×</button>
        </div>

        {/* CONTENT */}
        <div className="modal-content">

          <label className="upload-area">
            <input
              type="file"
              hidden
              accept=".xlsx,.csv"
              onChange={handleFileChange}
            />
            <p>{file ? file.name : "Click to upload Excel or CSV"}</p>
            <span>Max 10MB • .xlsx / .csv</span>
          </label>

          <a
            href="/sample/student-upload-sample.xlsx"
            download
            className="sample-link"
          >
            ⬇ Download Sample Excel
          </a>

          {/* PROGRESS */}
          {loading && (
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>
          )}

          {/* RESULT */}
          {result && (
            <div className="upload-result">
              <p>✅ Uploaded: <strong>{result.successCount}</strong></p>
              <p>❌ Failed: <strong>{result.failedCount}</strong></p>

              {result.errorFileUrl && (
                <a href={result.errorFileUrl} download>
                  ⬇ Download Failed Rows
                </a>
              )}
            </div>
          )}

          {error && <p className="error-text">{error}</p>}
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn-outline" onClick={onClose}>
            Close
          </button>
          <button
            className="btn-primary"
            disabled={loading}
            onClick={handleUpload}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BulkStudentUploadModal;
