export function QuoteCard({ quote, author, likeCount, like }) {
  return (
    <section className="p-5 rounded-lg bg-slate-200 shadow max-w-xl my-5 mx-auto">
      <p>{quote}</p>
      <p>{author}</p>
      <p className="text-green-400">
        {like} {likeCount}
      </p>
    </section>
  );
}
