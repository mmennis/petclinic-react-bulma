import React from 'react';
import './App.css';
import Owners from './components/owners/owners'
import Vets from './components/vets/vets'
import Home from './components/Home'
import { Section, Hero, Container, Heading, Navbar } from 'react-bulma-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LanguageContext } from './components/localization/LanguageContext'
import LanguageSelector from './components/localization/LanguageSelector'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lang:  JSON.parse(localStorage.getItem('petclinic-lang')) || 'en',
      updateLocale: this.updateLocale,
      activeNavbar: false,
    }

    this.updateLocale = this.updateLocale.bind(this)
  }

  updateLocale = (e) => {
    const { value } = e.target
    this.setState({
      lang: value,
    }, () => {
      localStorage.setItem('petclinic-lang', JSON.stringify(this.state.lang))
    })
  }

  render() {
    return (
      <div className="App">
        <LanguageContext.Provider value={this.state}>
          <Router>
            <Section paddingless marginless>
              <Hero color="primary" gradient paddingless>
                <Hero.Head renderAs="header">
                  <div style={ { 'position': 'absolute', 'right': 0 }}>
                    <LanguageSelector />
                  </div>
                </Hero.Head>
                <Hero.Body >
                  <Container>
                    <Heading size={2}>
                      PetClinic UI 
                    </Heading>
                    <Heading subtitle size={5}>
                      React App with Bulma styling
                    </Heading>
                  </Container>
                </Hero.Body>
              </Hero>
            </Section>
            <Section paddingless>
              <Navbar active={this.state.activeNavbar} transparent={false} color="light" >
                <Navbar.Brand>
                  <Navbar.Item renderAs="a" href="#">
                    <img 
                      src="https://bulma.io/images/bulma-logo.png" 
                      width="112" height="28" 
                      alt="Bulma: a modern CSS framework"
                    />
                  </Navbar.Item>
                  <Navbar.Burger onClick={() => this.setState({ activeNavbar: !this.state.activeNavbar }) }/>
                </Navbar.Brand>
                <Navbar.Menu >
                  <Navbar.Container>
                    <Navbar.Item href="/home" textWeight="bold" paddingless={true}>
                      <Navbar.Link arrowless={true} to={'/home'}>
                        Home
                      </Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item textWeight="bold" href="/owners" paddingless={true}>
                      <Navbar.Link arrowless={true} to={'/owners'}>
                        Owners
                      </Navbar.Link>
                    </Navbar.Item>
                    <Navbar.Item href="/vets" textWeight="bold" paddingless={true}>
                      <Navbar.Link arrowless={true} to={'/vets'}>
                        Vets
                      </Navbar.Link>
                    </Navbar.Item>
                  </Navbar.Container>
                  <Navbar.Container position="end" paddingless={true}>
                    <Navbar.Item href="/home">
                      Home
                    </Navbar.Item>
                  </Navbar.Container>
                </Navbar.Menu>
              </Navbar>
            </Section>
            <Switch>
              <Route exact path='/owners' component={Owners}/>
              <Route exact path='/vets' component={Vets} />
              <Route exact path='/home' component={Home} />
            </Switch>
          </Router>
        </LanguageContext.Provider>
      </div>
    )
  }

}

export default App;
