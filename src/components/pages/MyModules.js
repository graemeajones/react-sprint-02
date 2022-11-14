import { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth.js';
import API from '../api/API.js';
import { ActionTray, ActionAdd } from '../UI/Actions.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import ModulePanels from '../entities/modules/ModulePanels.js';
import ModuleForm from '../entities/modules/ModuleForm.js';
import './Pages.scss';

export default function MyModules() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();
  //const endpoint = `/modules/users/${loggedinUser.UserID}`;
  const endpoint = '/modules';

  // State ---------------------------------------
  const [modules, setModules] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState('Loading records ...');

  const [showNewModuleForm, setShowNewModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);

  // Context -------------------------------------
  // Methods -------------------------------------
  const getModules = async () => {
    const response = await API.get(`/modules`);
    response.isSuccess
      ? setModules(response.result)
      : setLoadingMessage(response.message)
  };
  
  useEffect(() => { getModules() }, []);

  const handleAdd = () => setShowNewModuleForm(true);
  const handleJoin = () => setShowJoinModuleForm(true);
  const handleDismissAdd = () => setShowNewModuleForm(false);
  const handleDismissJoin = () => setShowJoinModuleForm(false);
  
  const handleSubmit = async (module) => {
    const response = await API.post(endpoint, module);
    return response.isSuccess
      ? getModules() || true
      : false;
  }

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

      <p>&nbsp;</p>
      <ActionTray>
        <ToolTipDecorator message="Add new module">
          <ActionAdd showText onClick={handleAdd} buttonText="Add new module"/>
        </ToolTipDecorator>
        <ToolTipDecorator message="Join a module">
          <ActionAdd showText onClick={handleJoin} buttonText="Join a module"/>
        </ToolTipDecorator>
      </ActionTray>

      {
        showNewModuleForm && <ModuleForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      }
      {
        showJoinModuleForm && <p>{"<JoinModuleForm />"}</p>
      }

    </section>
  );
}
