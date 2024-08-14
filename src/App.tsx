import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EcranLogare from './components/EcranLogare';
import Acasa from './components/Acasa';
import Neautorizat from './components/Neautorizat';
import RolAdministratorPlatformaRoute from './components/RolAdministratorPlatformaRoute';
import LiceuAdministratorPlatforma from './components/LiceuAdministratorPlatforma';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EcranLogare />} />
        <Route path="/acasa" element={<Acasa />} />
        <Route
                    path="/liceu/:id"
                    element={
                        <RolAdministratorPlatformaRoute>
                            <LiceuAdministratorPlatforma />
                        </RolAdministratorPlatformaRoute>
                    }
                />
                <Route path="/unauthorized" element={<Neautorizat />} />
      </Routes>
    </Router>
  );
}
export default App;