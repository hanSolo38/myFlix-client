import { createRoot } from 'react-dom/client';
import { MainView } from './Components/main-view/main-view';
//import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';

//* Import Statement to indicate that you need to bundle
import "./index.scss";

//* Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return ( 
        <Container>
            <MainView />
        </Container>
    );
};

//* Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//* Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);