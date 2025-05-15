import "./styles.css";
export function QuoteCard({ quote, author, likeCount }) {
  return (
    <section className="quote-card">
      <p>{quote}</p>
      <p>{author}</p>
      <p>{likeCount}</p>
    </section>
  );
}
