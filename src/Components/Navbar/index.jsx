import "./styles.css";
export function Navbar({ setCurrentPage, pages }) {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <button
              className="btn btn-nav"
              onClick={() => setCurrentPage(pages.home)}
            >
              {pages.home}
            </button>
          </li>
          <li>
            <button
              className="btn btn-nav"
              onClick={() => setCurrentPage(pages.profile)}
            >
              {pages.profile}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
