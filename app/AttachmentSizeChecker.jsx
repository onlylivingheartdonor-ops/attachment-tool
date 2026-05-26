"use client"

import { useState, useRef } from "react"

const PROVIDERS = [
  { name: "Gmail",       limit: 25, note: "25 MB limit" },
  { name: "Outlook",     limit: 20, note: "20 MB limit" },
  { name: "Yahoo Mail",  limit: 25, note: "25 MB limit" },
  { name: "iCloud Mail", limit: 20, note: "20 MB limit" },
]

function getStatus(encodedMB) {
  if (encodedMB <= 20) return { key: "safe", title: "Good to go", msg: "This file should send successfully with all major email providers." }
  if (encodedMB <= 25) return { key: "warn", title: "Borderline", msg: "This file may work with Gmail or Yahoo Mail (25 MB limit) but will likely fail with Outlook and iCloud Mail (20 MB limit)." }
  return { key: "fail", title: "Too large for email", msg: "This file exceeds the attachment limits of all major providers. Consider sharing via cloud link or compressing the file first." }
}

export default function AttachmentSizeChecker() {
  const [fileSize, setFileSize] = useState("")
  const [fileName, setFileName] = useState("")
  const [result, setResult] = useState(null)
  const [providers, setProviders] = useState([])
  const [drag, setDrag] = useState(false)
  const fileRef = useRef()

  const encoded = (mb) => parseFloat((mb * 1.33).toFixed(2))

  const runCheck = (mb) => {
    const enc = encoded(mb)
    setResult({ ...getStatus(enc), rawMB: mb, encMB: enc })
    setProviders(PROVIDERS.map(p => ({ ...p, pass: enc <= p.limit })))
  }

  const handleManual = () => {
    const mb = parseFloat(fileSize)
    if (!mb || mb <= 0) return
    runCheck(mb)
  }

  const handleFile = (file) => {
    if (!file) return
    const mb = parseFloat((file.size / (1024 * 1024)).toFixed(2))
    setFileName(file.name)
    setFileSize(mb)
    runCheck(mb)
  }

  const handleUpload = (e) => handleFile(e.target.files[0])
  const handleDrop = (e) => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]) }

  return (
    <div className="eas-card">
      <div className="eas-field-block">
        <label className="eas-field-label" htmlFor="filesize">Enter file size manually</label>
        <div className="eas-input-wrap">
          <input
            id="filesize"
            className="eas-input"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={fileSize}
            onChange={e => setFileSize(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleManual()}
          />
        </div>
        <p className="eas-field-hint">Enter the size of your file in megabytes (MB)</p>
      </div>

      <div className="eas-or">or</div>

      <div
        className={"eas-upload-zone" + (drag ? " drag" : "")}
        onClick={() => fileRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
      >
        <div className="eas-upload-icon">↑</div>
        <p className="eas-upload-label">Drop a file here or click to browse</p>
        <p className="eas-upload-sub">File is read locally — nothing is uploaded</p>
        <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleUpload} />
      </div>

      {fileName && (
        <div className="eas-file-preview">
          <span className="eas-file-icon">📎</span>
          <span className="eas-file-name">{fileName}</span>
          <span className="eas-file-size">{fileSize} MB</span>
        </div>
      )}

      <button className="eas-btn" onClick={handleManual}>Check attachment size →</button>

      {result && (
        <>
          <div className={"eas-result-banner " + result.key}>
            <p className="eas-result-title">{result.title}</p>
            <p className="eas-result-sub">{result.msg}</p>
            <p className="eas-encoding-note">
              Raw size: {result.rawMB} MB · After email encoding: ~{result.encMB} MB
              (attachments grow ~33% during MIME encoding)
            </p>
          </div>

          <div className="eas-providers">
            {providers.map((p, i) => (
              <div className="eas-provider" key={i}>
                <div>
                  <p className="eas-provider-name">{p.name}</p>
                  <p className="eas-provider-limit">{p.note}</p>
                </div>
                <span className={"eas-pill " + (p.pass ? "pass" : "fail")}>
                  {p.pass ? "Will send" : "Too large"}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}