import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth.js';
import API from '../api/API.js';
import ModulePanels from '../entities/modules/ModulePanels.js';
import './Pages.scss';

export default function MyModules() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();
  const endpoint = `/modules/users/${loggedinUser.UserID}`;

  // State ---------------------------------------
  const [modules, setModules] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  // Context -------------------------------------
  // Methods -------------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setModules(response.result)
      : setLoadingMessage(response.message)
  };
  
  useEffect(() => { apiCall(endpoint) }, [endpoint]);
      
  // View ----------------------------------------
  return (
    <section>
      <h1>My Modules</h1>
      {
        !modules 
          ? <p>{loadingMessage}</p>
          : modules.length === 0
            ? <p>No modules found</p>
            : <ModulePanels modules={modules} />
      }
    </section>
  );
}
