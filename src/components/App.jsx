

class App extends React.Component {
  constructor(props) {
    super(props);
    this.search = _.debounce(this.search, 500);
    this.state = {
      videos: [],
      currentQuery: '',
      currentVideo: {
        snippet: {
          title: '',
          description: '',
        },
        id: {
          videoId: ''
        }
      }
    }
  }

  componentDidMount() {
    this.search('cats')
  }

  search(query) {
    var context = this;
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/search',
      type: 'GET',
      contentType: 'application/json',
      data: {
        'q': query,
        'maxResults': '5',
        'part': 'snippet',
        'key': window.YOUTUBE_API_KEY,
        'embeddable': 'true',
        'pageToken': ''
      },
      success: function (response) {
        console.log('GET request success', response);
        console.log('app is', context)
        context.setState({ videos: response.items, currentVideo: response.items[0] })
      },
      error: function (response) {
        console.log('Failed to fetch', response);
      }
    })
  }


  onVideoChange(clickedVideo) {
    this.setState({
      currentVideo: clickedVideo
    })
  }

  onSearch(query) {
    this.setState({
      currentQuery: query,
    })
    
    this.search(query);
  }

  render() {
    return (
      // <Router>
        <div>
          <nav className="navbar">
            <div className="col-md-6 offset-md-3">
              <div><Search onSearch={this.onSearch.bind(this)} /></div>
            </div>
          </nav>
          <div className="row">
            <div className="col-md-7">
              <div><VideoPlayer video={this.state.currentVideo} /></div>
            </div>
            <div className="col-md-5">
              <div><VideoList onVideoChange={this.onVideoChange.bind(this)} videos={this.state.videos} /></div>
            </div>
          </div>
        </div>
      // </Router>

    );
  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
