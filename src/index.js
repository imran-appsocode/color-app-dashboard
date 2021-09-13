import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '20px',
  transition: 'scale'
}
ReactDOM.render((
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
