import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="logo" to="/">
            GitHub Search
          </Link>

          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink className="nav__link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink className="nav__link" to="/favorites">
                  Favorites
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
