import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand">
              <Image
                src="/logo.png"
                alt="Smart Agriculture Logo"
                width={40}
                height={40}
                className="footer__logo"
              />
              <span className="footer__name">Smart Agriculture Training</span>
            </div>
            <p className="footer__desc">
              Implemented by the DA-Bureau of Agriculture and Fisheries
              Engineering (BAFE), Digital Transformation Division. Equipping
              Agricultural and Biosystems Engineers with IoT and electronics
              skills for a smarter, more productive Philippine agriculture.
            </p>
          </div>

          <div>
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#modules">Modules</a>
              </li>
              <li>
                <a href="#schedule">Schedule</a>
              </li>
              <li>
                <a href="#details">Venue & Details</a>
              </li>
              <li>
                <a href="#outcomes">Outcomes</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__links footer__contact">
              <li>Rey Carlo Rotol</li>
              <li>Charles Purwel</li>
              <li>
                <a
                  href="https://sites.google.com/bafe.da.gov.ph/instrumentationandelectronics2/home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BAFE Training Site →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bar">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Smart Agriculture Training. All rights
            reserved.
          </span>
          <span className="footer__org">
            DA-Bureau of Agriculture and Fisheries Engineering (BAFE)
          </span>
        </div>
      </div>
    </footer>
  );
}
