class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentInput: ''
    }
  }

  onInputChange(inputText) {
    this.setState({
      currentInput: inputText
    })
    this.props.onSearch(this.state.currentInput)
  }

  render() {
    return (
      <div className="search-bar form-inline">
        <input className="form-control" onChange={(event) => this.onInputChange(event.target.value)} type="text" />
        <button onClick={() => this.props.onSearch(this.state.currentInput)} className="btn hidden-sm-down">
          <span className="glyphicon glyphicon-search"></span>
        </button>
      </div>
    )
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.Search = Search;
