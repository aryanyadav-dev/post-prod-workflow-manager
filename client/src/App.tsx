import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Router } from '../src/components/Router';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
