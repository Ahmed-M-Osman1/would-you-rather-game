import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './NavBar';
import { handleInitialData } from '@testing-library/react';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render(){
  return (
    <Router>
    <div className="App">
    <NavBar />
    {this.props.loading === true
      ? null
      : <div>
          <Route path='/' exact component={Dashboard} />
          <Route path='/tweet/:id' component={TweetPage} />
          <Route path='/new' component={NewTweet} />
        </div>}
      Ahmed
    </div>
    </Router>
  );
}
}

export default App;
