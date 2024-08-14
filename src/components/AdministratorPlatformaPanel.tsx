import ProfilPanel from './ProfilPanel';
import SpecializarePanel from './SpecializarePanel';
import AniClasaPanel from './AniClasaPanel';
import ListaLiceePanel from './ListaLiceePanel';
import AdaugaLiceuPanel from './AdaugaLiceuPanel';
import SchimbareDateUtilizatorPanel from './SchimbareDateUtilizatorPanel';
import AdaugaMateriePanel from './AdaugaMateriePanel';
import ListaMateriiPanel from './ListaMateriiPanel';
import SchimbareDateMateriePanel from './SchimbareDateMateriePanel';

const AdministratorPlatformaPanel: React.FC = () => {
  
    return (
        <>

            <ProfilPanel></ProfilPanel>
            <SpecializarePanel></SpecializarePanel>
            <AniClasaPanel></AniClasaPanel>
            <SchimbareDateUtilizatorPanel></SchimbareDateUtilizatorPanel>
            <AdaugaMateriePanel></AdaugaMateriePanel>
            <ListaMateriiPanel></ListaMateriiPanel>
            <SchimbareDateMateriePanel></SchimbareDateMateriePanel>
            <ListaLiceePanel></ListaLiceePanel>
            <AdaugaLiceuPanel></AdaugaLiceuPanel>
        </>
    );
  };
  
  export default AdministratorPlatformaPanel;