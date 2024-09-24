import React, { Component } from 'react';
import './App.css';
import {
  Navigation,
  Logo,
  ImageLinkForm,
  Rank,
  ParticlesContainer,
  Signin,
  Register,
} from './components/';
import detectCelebrity from './Clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      name: '',
      router: 'signin',
      isSignIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      },
    };
  }

  loadUser = (data) => {
    console.log('data', data);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  componentDidMount() {
    fetch('http://localhost:3001/api/users')
      .then((response) => response.json())
      .then(console.log)
      .catch(console.log);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onBtnSubmit = async () => {
    console.log('click');
    this.setState({ imageUrl: this.state.input });
    const result = await detectCelebrity(this.state.input);
    const response = await fetch('http://localhost:3001/api/users/image', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    });
    const user = await response.json();
    this.setState(Object.assign(this.state.user, { entries: user.entries }));

    // Make first letter uppercase
    let { celebrityName, box } = result;
    console.log('result', result);
    console.log('celebrityName', celebrityName);
    console.log('Helloooo #############');
    celebrityName = celebrityName
      .split(' ')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    this.setState({
      name: celebrityName,
      box: box,
    });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignIn: false, router: 'signin' });
    } else if (route === 'home') {
      this.setState({ isSignIn: true });
    }
    this.setState({ router: route });
  };

  render() {
    const { box, name, imageUrl, isSignIn, user } = this.state;
    console.log(this.state.router);
    console.log('user', user);
    return (
      <div className="App">
        <ParticlesContainer />
        <Navigation isSignIn={isSignIn} onRouteChange={this.onRouteChange} />
        {this.state.router === 'home' ? (
          <>
            <Logo />
            <Rank user={user} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onBtnSubmit={this.onBtnSubmit}
            />
            {this.state.imageUrl && (
              <FaceRecognition name={name} box={box} imageUrl={imageUrl} />
            )}
          </>
        ) : this.state.router === 'register' ? (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        ) : (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )}
      </div>
    );
  }
}

export default App;
