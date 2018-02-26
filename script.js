class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {

     var stylesForm = {
        background: '#ccc',
        width: '60%',
        textAlign: 'center',
        margin: '10px auto',
        padding: '20px',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '25px',
        textShadow: '2px 2px 2px black',
      };

      var stylesInput = {
        height: '25px',
        margin: '0 15px',
      };

      var stylesList = {
        width: '60%',
        margin: '10px auto',
        padding: '20px',
        fontSize: '20px',
      };


    return (
      <div style={stylesList}>
        <form onSubmit={event => this.onSubmit(event)} style={stylesForm}>
          <label htmlFor="searchText">Search by user name</label >
          <input
            style={stylesInput}
            type="text"
            id="searchText"
            onChange={event => this.onChangeHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList style={stylesList} users={this.state.users}/>
      </div>
    );
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}


class User extends React.Component {
  render() {
    return (
      <div style={{float: 'left'}}>
        <img src={this.props.user.avatar_url} style={{maxWidth: '150px', margin: '20px'}}/>
        <a style={{margin: '0 -150px'}} href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);