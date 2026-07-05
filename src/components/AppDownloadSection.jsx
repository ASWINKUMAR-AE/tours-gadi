import React, { useEffect, useState } from "react";
import "./AppDownloadSection.css";

const AppDownloadSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
  <section id="download-tourgadi-apps" className="ad-container">
      <h1 className="ad-title">Download TourGadi Apps</h1>
      <p className="ad-subtitle">If the download doesn’t start, open this page directly in your mobile browser.</p>

      <div className="ad-grid">
        {/* TourGadi User App */}
        <div className={`ad-card ${visible ? "visible" : ""}`}>
          <h2 className="ad-card-title">TourGadi User App</h2>
          <p className="ad-card-desc">Explore, book, and enjoy curated tour packages and convenient rides.</p>
          <p className="ad-card-size">File Size: 121 MB</p>
          <a
            href="https://www.wavecabs.com/uploads/APKs/TourGadi-User.apk"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="ad-button"
          >
            Download APK
          </a>
        </div>

        {/* TourGadi Driver App */}
        <div className={`ad-card ad-card--delay ${visible ? "visible" : ""}`}>
          <h2 className="ad-card-title">TourGadi Driver App</h2>
          <p className="ad-card-desc">Accept rides and earn on your schedule with our driver app.</p>
          <p className="ad-card-size">File Size: 110 MB</p>
          <a
            href="https://www.wavecabs.com/uploads/APKs/TourGadi-Driver.apk"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="ad-button"
          >
            Download APK
          </a>
        </div>

        {/* TourGadi Vendor App */}
        <div className={`ad-card ad-card--delay-2 ${visible ? "visible" : ""}`}>
          <h2 className="ad-card-title">TourGadi Vendor App</h2>
          <p className="ad-card-desc">Publish tour packages, manage bookings, and grow your tour agency.</p>
          <p className="ad-card-size">File Size: 98 MB</p>
          <a
            href="https://www.wavecabs.com/uploads/APKs/TourGadi-Vendor.apk"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="ad-button"
          >
            Download APK
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
