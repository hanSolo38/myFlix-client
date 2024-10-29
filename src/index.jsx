import { createRoot } from 'react-dom/client';

//* Import Statement to indicate that you need to bundle
import "./index.scss";

//* Main component (will eventually use all the others)
const MyFlixApplication = () => {
    return <MainView />;
};

//* Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

//* Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);