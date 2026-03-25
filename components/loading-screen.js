"use client";

export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <div className="loading-screen__spinner">
          <div className="loading-screen__ring" />
          <div className="loading-screen__ring loading-screen__ring--delayed" />
          <svg
            className="loading-screen__icon"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <p className="loading-screen__text">{message}</p>
        <div className="loading-screen__bar">
          <div className="loading-screen__bar-fill" />
        </div>
      </div>
    </div>
  );
}
