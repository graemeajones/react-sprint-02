import { useState } from 'react';
import { useAuth } from '../auth/useAuth.js';
import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
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
  const [modules, , loadingMessage, loadModules] = useLoad(endpoint);
  const [showNewModuleForm, setShowNewModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);

  // Context -------------------------------------
  // Methods -------------------------------------
  const handleAdd = () => setShowNewModuleForm(true);
  const handleJoin = () => setShowJoinModuleForm(true);
  const handleCancelAdd = () => setShowNewModuleForm(false);
  const handleCancelJoin = () => setShowJoinModuleForm(false);

  const handleSubmit = async (module) => {
    const response = await API.post(endpoint, module);
    return response.isSuccess
      ? loadModules(endpoint) || true
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
        showNewModuleForm && <ModuleForm onCancel={handleCancelAdd} onSubmit={handleSubmit} />
      }
      {
        showJoinModuleForm && <p>{"<JoinModuleForm />"}</p>
      }

    </section>
  );
}
