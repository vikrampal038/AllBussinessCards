import { useState } from "react";
import { generateVCard, saveVCardFile } from "../utils/vcard";

const CONTACT_ITEMS = [
  {
    key: "phone",
    icon: "📞",
    label: "Phone",
    href: (contact) => contact.phoneHref,
    value: (contact) => contact.phone,
    external: false,
  },
  {
    key: "address",
    icon: "📍",
    label: "Address",
    href: (contact) =>
      `https://maps.google.com?q=${encodeURIComponent(contact.address)}`,
    value: (contact) => contact.address,
    external: true,
  },
  {
    key: "website",
    icon: "🌐",
    label: "Website",
    href: (contact) => contact.websiteHref,
    value: (contact) => contact.website,
    external: true,
  },
  {
    key: "email",
    icon: "✉️",
    label: "Email",
    href: (contact) => contact.emailHref,
    value: (contact) => contact.email,
    external: false,
  },
];

export default function BusinessCard({ contact }) {
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    const vCard = generateVCard(contact);
    saveVCardFile(vCard, `${contact.founderFirst}_${contact.founderLast}.vcf`);
    setToast(true);
    window.setTimeout(() => setToast(false), 2500);
  };

  return (
    <article className="card" role="region" aria-label="business card" style={contact.theme}>
      <div className="banner">
        <div className="company-badge">
          <div className="company-logo">
            <img src={contact.logoSrc} alt={`${contact.companyName} logo`} />
          </div>
          <span className="company-name">{contact.companyName}</span>
        </div>
        <div className="avatar-wrap">
          <div className="avatar">
            <img
              src={contact.profileSrc}
              alt={`${contact.founderFirst} ${contact.founderLast}`}
            />
          </div>
        </div>
      </div>

      <div className="body">
        <div className="founder-info">
          <div className="founder-name">
            {contact.founderFirst} <em>{contact.founderLast}</em>
          </div>
          <div className="founder-title">{contact.title}</div>
        </div>

        <div className="services">
          {contact.services.map((service) => (
            <span key={service} className="service-tag">
              {service}
            </span>
          ))}
        </div>

        <div className="divider" />

        <div className="socials">
          {contact.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="social-btn"
              title={social.label}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="divider" />

        <div className="contact-list">
          {CONTACT_ITEMS.map((item) => {
            const href = item.href(contact);
            const isExternal = item.external;

            return (
              <a
                key={item.key}
                href={href}
                className="contact-row"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-text">
                  <div className="contact-label">{item.label}</div>
                  <div className="contact-value">{item.value(contact)}</div>
                </div>
                <span className="contact-arrow">›</span>
              </a>
            );
          })}
        </div>

        <div className="cta-row">
          <a href={contact.phoneHref} className="cta-btn cta-call">
            📞 Call Now
          </a>
          <button
            type="button"
            onClick={handleSave}
            className="cta-btn cta-save"
          >
            💾 Save Contact
          </button>
        </div>
      </div>

      <div className={`save-toast ${toast ? "show" : ""}`}>
        ✓ Contact saved to your device
      </div>
    </article>
  );
}


