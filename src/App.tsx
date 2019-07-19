import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch, RouteComponentProps } from 'react-router-dom'

const Home = () => (
  <>
    <img src={logo} className="App-logo" alt="logo" />
    <p>Edit <code>src/App.tsx</code> and save to reload.</p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
    Learn React
    </a>
  </>
)

const About = () => (
  <h2>About</h2>
)

const Topic = ({ match }: RouteComponentProps<{ id: string }>) => (
  <h3>Requested Param: {match.params.id}</h3>
)

const Topics = ({ match }: RouteComponentProps) => (
  <>
    <h2>Topics</h2>

    <ul>
      <li><Link className="App-link" to={`${match.url}/components`}>Components</Link></li>
      <li><Link className="App-link" to={`${match.url}/props-v-state`}>Props v. State</Link></li>
    </ul>

    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
    <Route path={`${match.path}/:id`} component={Topic} />
  </>
)

const Header = () => (
  <header>
    <ul>
      <li><Link className="App-link" to="/">Home</Link></li>
      <li><Link className="App-link" to="/about">About</Link></li>
      <li><Link className="App-link" to="/topics">Topics</Link></li>
    </ul>
  </header>
)

const NoMatch = ({ location }: RouteComponentProps) => (
  <h3>No match for <code>{location.pathname}</code></h3>
)

const App = () => (
  <div className="App-header">
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </div>
)

export default App
