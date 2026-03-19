import BusinessCard from "./components/BusinessCard";
import { CONTACT } from "./data/contact";

export default function App() {
  return (
    <main className="page-shell">
      <section className="card-container" aria-label="Business card preview">
        {CONTACT.map((contact, index) => (
          <BusinessCard key={index} contact={contact} />
        ))}
      </section>
    </main>
  );
}
