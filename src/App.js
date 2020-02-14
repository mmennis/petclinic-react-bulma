import React from 'react';
import './App.css';
import Owners from './components/owners';
import { Section, Hero, Container, Heading, Navbar } from 'react-bulma-components';

function App() {

  //const BASE_API_URL = process.env.REACT_APP_PETCLINIC_APP_API_ENDPOINT;
  
  return (
    <div className="App">
      <Section paddingless marginless>
        <Hero color="primary" gradient paddingless>
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
        <Navbar active={false} transparent={false} color="light" >
          <Navbar.Brand>
            <Navbar.Item renderAs="a" href="#">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" 
                alt="Bulma: a modern CSS framework"/>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu >
            <Navbar.Container>
              <Navbar.Item textWeight="bold" href="#" paddingless={true}>
                <Navbar.Link arrowless={true} >
                  Owners
                </Navbar.Link>
              </Navbar.Item>
              <Navbar.Item href="#" textWeight="bold" paddingless={true}>
                <Navbar.Link arrowless={true} >
                  Vets
                </Navbar.Link>
              </Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position="end" paddingless={true}>
              <Navbar.Item >
                Home
              </Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>
        </Navbar>
      </Section>
      <Owners />
    </div>
  );
}

export default App;
