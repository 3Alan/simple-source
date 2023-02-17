export default function Card({ text, result, onClick, showResult, children }) {
  return (
    <div className="card">
      <button onClick={onClick}>{text}</button>
      {showResult && <p>result: {result}</p>}
      {children}
    </div>
  );
}
