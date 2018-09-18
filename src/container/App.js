// Dependancies
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Components
import Search from '../components/Search/Search';
import Navigation from '../components/Navigation/Navigation';
import PhotoContainer from '../components/PhotoContainer/PhotoContainer';
import NotFound from '../components/NotFound/NotFound';
// config
import apiKey from '../config';
// style
import './App.css';

/**
 * @constant ROUTES routes to be rendered
 */
const ROUTES = [
  { path: '/', search: 'dogs', title: 'Dogs' },
  { path: '/cats', search: 'cats', title: 'Cats' },
  { path: '/birds', search: 'birds', title: 'Birds' },
  { path: '/search', search: '', title: 'Search' },
];

/**
 * container component
 * @function fetchPhotos    fetch photos using flickr API
 * @function onRouteChange  fetch photos on navigation change
 * @function onSearchChange change 'search' value on search input change
 * @function onSearchClick  fetch photos on search button click
 * @function renderRoutes   render routes
 */
class App extends Component {
  state = {
    search: '',
    isPending: false,
    photos: [],
    photoContainerTitle: ''
  }

  componentDidMount() {
    const currentRoute = ROUTES.find(({ path }) => path === window.location.pathname);
    if (currentRoute) {
      const search = currentRoute.search;
      this.setState({
        search: search,
        isPending: true,
        photoContainerTitle: search
      }, () => {
        this.fetchPhotos(this.state.search);
      })
    }
  }

  /**
   * @param {string} text keyword to search
   */
  fetchPhotos = text => {
    fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${text}&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(({ photos }) => {
        if (photos) {
          this.setState({ photos: photos.photo, isPending: false });
        } else {
          this.setState({ photos: [], isPending: false });
        }
      })
      .catch(() => {
        this.setState({ photos: [], isPending: false });
      });
  }

  /**
   * @param {string} search preset keyword to search
   */
  onRouteChange = search => {
    this.setState({
      search: search,
      isPending: true,
      photoContainerTitle: search
    }, () => {
      this.fetchPhotos(search);
    });
  }

  /**
   * @param {string} search keyword to search
   */
  onSearchChange = search => {
    this.setState({ search: search });
  }

  /**
   * call fetchPhotos on search button click
   */
  onSearchClick = () => {
    this.setState({
      isPending: true,
      photoContainerTitle: this.state.search
    }, () => {
      this.fetchPhotos(this.state.search);
    });
  }

  /**
   * @param {array} routes routes to render
   */
  renderRoutes = routes => {
    const { photoContainerTitle, isPending, photos } = this.state;

    return routes.map(({ path }) => {
      return (
        <Route
          key={path}
          exact
          path={path}
          component={() => {
            return (
              <PhotoContainer
                title={photoContainerTitle}
                isPending={isPending}
                photos={photos}
              />
            )
          }}
        />
      )
    })
  }

  render() {
    const pageNotFound = ROUTES
      .find(({ path }) => path === window.location.pathname) === undefined;
      
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>React Flickr Gallery</h1>
          </header>
          <main>
            {pageNotFound === false && (
              <Navigation
                routes={ROUTES}
                onRouteChange={this.onRouteChange}
              />
            )}
            {window.location.pathname === '/search' && (
              <Search
                search={this.state.search}
                onInputChange={this.onSearchChange}
                onButtonClick={this.onSearchClick}
              />
            )}
            <Switch>
              {this.renderRoutes(ROUTES)}
              <Route component={NotFound} />
            </Switch>
          </main>
          <footer>
            <p>Kwanwoo Jeong &copy; 2018</p>
            <p>
              Spinner designed by <a href="http://tobiasahlin.com/spinkit/" target="_blank" rel="noopener noreferrer">SpinKit</a>
            </p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
