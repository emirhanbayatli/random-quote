import "./styles.css";
export function QuoteCard({ quote, author, count }) {
  return (
    <section className="quote-card">
      <p>{quote}</p>
      <p>{author}</p>
      <p>{count}</p>
    </section>
  );
}
