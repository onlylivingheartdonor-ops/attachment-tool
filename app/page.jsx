import AttachmentSizeChecker from "./AttachmentSizeChecker"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .eas-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .eas-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .eas-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .eas-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .eas-title em { font-style: italic; color: #1a5ca8; }
  .eas-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .eas-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }
  .eas-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .eas-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .eas-input-wrap { position: relative; }
  .eas-input-wrap::after { content: 'MB'; position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .eas-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 2rem .4rem 0; outline: none; transition: border-color .2s; }
  .eas-input:focus { border-color: #1a5ca8; }
  .eas-field-block { margin-bottom: 1.25rem; }
  .eas-or { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #bbb; text-align: center; margin: 1rem 0; position: relative; }
  .eas-or::before, .eas-or::after { content: ''; position: absolute; top: 50%; width: 42%; height: 1px; background: #e0dbd3; }
  .eas-or::before { left: 0; }
  .eas-or::after { right: 0; }
  .eas-upload-zone { border: 1.5px dashed #c8d8e8; border-radius: 4px; padding: 1.5rem; text-align: center; cursor: pointer; transition: all .2s; background: #f7fbff; }
  .eas-upload-zone:hover, .eas-upload-zone.drag { border-color: #1a5ca8; background: #eef4fc; }
  .eas-upload-icon { font-size: 1.5rem; color: #1a5ca8; margin-bottom: .5rem; }
  .eas-upload-label { font-size: 13px; color: #555; }
  .eas-upload-sub { font-size: 11px; color: #aaa; margin-top: .25rem; }
  .eas-file-preview { background: #f0f4f8; border-radius: 4px; padding: .75rem 1rem; margin-top: .75rem; display: flex; align-items: center; gap: .75rem; }
  .eas-file-icon { font-size: 1.2rem; color: #1a5ca8; }
  .eas-file-name { font-size: 13px; color: #1a1a1a; font-weight: 500; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eas-file-size { font-size: 12px; color: #888; }
  .eas-btn { width: 100%; padding: 1rem; background: #1a1a1a; color: #fff; border: none; font-family: 'DM Mono', monospace; font-size: .9rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: background .2s; margin-top: .25rem; }
  .eas-btn:hover { background: #1a5ca8; }
  .eas-result-banner { border-radius: 4px; padding: 1.25rem 1.5rem; margin-top: 1.5rem; border-left: 3px solid; }
  .eas-result-banner.safe { background: #eaf5ee; border-color: #1a6b3a; }
  .eas-result-banner.warn { background: #fff8e6; border-color: #b07c10; }
  .eas-result-banner.fail { background: #fdf0ee; border-color: #c84b1f; }
  .eas-result-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; margin-bottom: .3rem; }
  .eas-result-banner.safe .eas-result-title { color: #1a6b3a; }
  .eas-result-banner.warn .eas-result-title { color: #7a560a; }
  .eas-result-banner.fail .eas-result-title { color: #c84b1f; }
  .eas-result-sub { font-size: 12px; color: #555; line-height: 1.6; }
  .eas-encoding-note { font-size: 11px; color: #888; margin-top: .5rem; font-style: italic; }
  .eas-providers { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-top: 1.5rem; }
  .eas-provider { background: #fff; padding: .9rem 1.1rem; display: flex; align-items: center; justify-content: space-between; }
  .eas-provider-name { font-size: 13px; color: #1a1a1a; }
  .eas-provider-limit { font-size: 11px; color: #aaa; margin-top: .15rem; }
  .eas-pill { font-size: 11px; padding: .25rem .65rem; border-radius: 20px; font-weight: 500; letter-spacing: .04em; }
  .eas-pill.pass { background: #eaf5ee; color: #1a6b3a; }
  .eas-pill.fail { background: #fdf0ee; color: #c84b1f; }
  .eas-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .eas-prose p:last-child { margin-bottom: 0; }
  .eas-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .eas-prose ul li { margin-bottom: .3rem; }
  .eas-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .eas-info-item { padding: .75rem; border-left: 2px solid #c8d8e8; }
  .eas-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .eas-info-body { font-size: 12px; color: #888; line-height: 1.5; }
  .eas-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .eas-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .eas-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .eas-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .eas-alt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .eas-alt-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #c8d8e8; line-height: 1; margin-bottom: .4rem; }
  .eas-alt-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .eas-alt-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #1a5ca8; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .eas-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .eas-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .eas-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .eas-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .eas-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .eas-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .eas-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .eas-providers, .eas-info-grid, .eas-alt-grid { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "Why does my file sometimes fail even when it's under the size limit?",
    a: "Email providers use MIME encoding to convert binary files into text that can travel over email networks. This encoding adds roughly 33% to the effective file size. A 19 MB file might become ~25 MB after encoding — enough to push it over Gmail's 25 MB limit. This tool shows both the raw and encoded sizes so you know exactly where you stand."
  },
  {
    q: "Do email providers have the same attachment limits for sending and receiving?",
    a: "Not always. Most providers have lower limits for receiving than sending, especially for corporate email systems. Gmail can receive up to 50 MB, but that requires the sender to use Google Drive integration. Outlook.com can receive up to 20 MB. When in doubt, use a cloud sharing link for files over 15 MB."
  },
  {
    q: "What is MIME encoding and why does it matter?",
    a: "MIME (Multipurpose Internet Mail Extensions) encoding converts binary file data into text format that email systems can safely handle. The most common encoding, Base64, increases file size by about 33%. Email providers check the encoded size — not your original file size — when enforcing attachment limits."
  },
  {
    q: "Can I send files larger than the limit by using multiple emails?",
    a: "Yes — splitting a large file across two or more emails works, but it's inconvenient for the recipient who must reassemble the pieces. Cloud storage links (Google Drive, Dropbox, OneDrive) or dedicated file transfer services (WeTransfer, Send Anywhere) are usually better options for files that significantly exceed size limits."
  },
  {
    q: "Why do Outlook and iCloud Mail have lower limits (20 MB) than Gmail and Yahoo (25 MB)?",
    a: "Each provider sets its own infrastructure policies. Microsoft (Outlook) and Apple (iCloud) historically set 20 MB limits and have maintained them, while Google increased Gmail's limit from 25 MB to 50 MB for receiving (but not sending) and Yahoo remains at 25 MB. These limits can change — check provider documentation for current figures."
  },
  {
    q: "Do attachment limits apply to the entire message or just individual files?",
    a: "Provider limits apply to the total size of all attachments combined, not each file individually. For example, three 8 MB files total 24 MB — acceptable for Gmail but not for Outlook. Always check the combined size of everything you're attaching, not just the largest single file."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="eas-wrap">
        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="eas-header">
          <p className="eas-eyebrow">Email Utilities</p>
          <h1 className="eas-title">Attachment<br /><em>Size Checker</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to check if your file can be sent as an email attachment. Enter a file size or drop a file to see which providers will accept it — accounting for MIME encoding automatically.
        </p>

        {/* INTERACTIVE TOOL — client component */}
        <AttachmentSizeChecker />

        {/* HOW IT WORKS */}
        <div className="eas-card">
          <p className="eas-section-title">How this works</p>
          <div className="eas-prose">
            <p>Email providers cap the total size of attachments you can send in a single message. When you enter a file size — or drop a file directly — this tool compares it against the limits used by Gmail, Outlook, Yahoo Mail, and iCloud Mail.</p>
            <p>It also accounts for MIME encoding, the process email systems use to convert binary files into a format that can travel over email networks. This encoding adds approximately 33% to the effective file size. A 15 MB file, for example, becomes roughly 20 MB by the time it reaches the provider's size check — which is why files that seem just under the limit sometimes still fail.</p>
            <p>Surfacing the encoded size gives you a realistic picture of whether your file will go through before you try to send it.</p>
          </div>
          <div className="eas-info-grid">
            <div className="eas-info-item">
              <p className="eas-info-title">MIME encoding</p>
              <p className="eas-info-body">All email attachments are re-encoded in transit, increasing their effective size by around 33%. This tool factors that in automatically.</p>
            </div>
            <div className="eas-info-item">
              <p className="eas-info-title">Per-message limits</p>
              <p className="eas-info-body">Provider limits apply to the entire message — including all attachments combined, not just the largest single file.</p>
            </div>
            <div className="eas-info-item">
              <p className="eas-info-title">File privacy</p>
              <p className="eas-info-body">When you drop a file, only its size is read locally in your browser. No file content is uploaded or transmitted anywhere.</p>
            </div>
            <div className="eas-info-item">
              <p className="eas-info-title">Recipient limits</p>
              <p className="eas-info-body">Your recipient's inbox may have a lower incoming limit than your sending provider allows. When in doubt, use a link instead.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="eas-card">
          <p className="eas-section-title">Why attachment size matters</p>
          <div className="eas-prose">
            <p>Attachment failures are frustratingly invisible. Most email clients don't display size limits upfront, and when a message bounces, the error message is often vague or arrives minutes after sending — by which point the recipient may already be expecting it.</p>
            <p>Checking in advance takes seconds and removes the guesswork entirely. This is especially useful when sending large work documents, design files, reports, or presentations where timing matters and a failed delivery creates friction.</p>
            <p>It also encourages better habits: understanding why files fail helps you choose the right sending method from the start, rather than troubleshooting after the fact.</p>
          </div>
        </div>

        {/* WHAT TO DO IF TOO LARGE */}
        <div className="eas-card">
          <p className="eas-section-title">If your file is too large</p>
          <div className="eas-prose">
            <p>When a file exceeds email limits, there are several reliable alternatives — each suited to different situations:</p>
          </div>
          <div className="eas-alt-grid" style={{ marginTop: "1rem" }}>
            <div>
              <p className="eas-alt-num">01</p>
              <p className="eas-alt-title">Share via cloud storage</p>
              <p className="eas-alt-body">Upload to Google Drive, Dropbox, or OneDrive and share a link instead. No size restrictions, and the recipient doesn't need an account to view most files.</p>
            </div>
            <div>
              <p className="eas-alt-num">02</p>
              <p className="eas-alt-title">Compress the file</p>
              <p className="eas-alt-body">ZIP compression can significantly reduce file size — especially for documents, images, or folders. Some formats compress more than others; PDFs and videos compress less than plain text.</p>
            </div>
            <div>
              <p className="eas-alt-num">03</p>
              <p className="eas-alt-title">Use a transfer service</p>
              <p className="eas-alt-body">Services like WeTransfer or Send Anywhere are designed specifically for large files. They generate a download link and handle delivery without touching your email at all.</p>
            </div>
            <div>
              <p className="eas-alt-num">04</p>
              <p className="eas-alt-title">Split into multiple emails</p>
              <p className="eas-alt-body">If the files must arrive via email, splitting them across two or more messages is a simple workaround — though cloud sharing is usually cleaner for the recipient.</p>
            </div>
          </div>
        </div>

        {/* HOW TO AVOID ISSUES */}
        <div className="eas-card">
          <p className="eas-section-title">How to avoid attachment issues</p>
          <div className="eas-prose">
            <p>Most attachment problems are preventable with a small amount of preparation. The most common causes are uncompressed images, embedded media in documents, and sending multiple large files in one message.</p>
            <ul>
              <li>Resize or compress images before inserting them into documents — embedded images are a frequent culprit behind oversized Word files and presentations</li>
              <li>Export PDFs from design tools at screen resolution rather than print resolution when the recipient only needs to read, not print</li>
              <li>Use cloud links as your default for anything over 10 MB, rather than treating email as a file delivery system</li>
              <li>When sending multiple files, check the combined size — not just the individual files</li>
              <li>Be aware that your recipient's inbox provider may have stricter limits than yours, particularly corporate email systems</li>
            </ul>
            <p>Getting into the habit of checking file size before sending — rather than after a bounce — saves time and avoids awkward follow-up messages explaining why something didn't arrive.</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="eas-card">
          <p className="eas-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="eas-faq-item" key={i}>
              <p className="eas-faq-q">{item.q}</p>
              <p className="eas-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="eas-card">
          <p className="eas-section-title">Related tools</p>
          <p className="eas-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="eas-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="eas-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="eas-disclaimer">
            This tool reads file size locally in your browser. No data is uploaded or stored. Provider limits are based on publicly available information and may change. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="eas-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}