export default function NavigationBar(props) {
      return (
        <div className="nav-bar-wrapper">
          <div className="nav-bar-items"
            onClick={props.handleBackToHomePageFromCollection}
          >Home</div>

          <div className="nav-bar-items"
            onClick={props.goToFirstSetOfCollections}
          >Collection List</div>
        </div>
      )

}