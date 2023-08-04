export default function NavigationBar(props) {
    const link = {
        width: "100%",
        padding: '1em',
        margin: '0em 0em 0em',
        background: 'azure',
        textDecoration: 'none',
        color: 'black',
      }

      return (
        <div className="nav-bar-wrapper">
          <div className="nav-bar-items"
            style={link}
            onClick={props.handleBackToHomePageFromCollection}
          >Home</div>

          <div className="nav-bar-items"
            style={link}
            onClick={props.goToFirstSetOfCollections}
          >Collection List</div>
        </div>
      )

}