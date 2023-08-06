import { NavLink } from 'react-router-dom';

export default function NavigationBar(props) {
  return (
    <nav>
      <div className="nav-bar-wrapper">
        <div className="nav-bar-items"
          onClick={props.handleBackToHomePage}
        ><NavLink to="/">Home</NavLink></div>
        
        <div className="nav-bar-items"
          onClick={props.goToFirstSetOfCollections}
        >
          <NavLink to="/collection-list">Collection List</NavLink>
        </div>
      </div>
    </nav>
  )
}