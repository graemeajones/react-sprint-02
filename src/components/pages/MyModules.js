import { useState } from 'react';
import { useAuth } from '../auth/useAuth.js';
import API from '../api/API.js';
import useLoad from '../api/useLoad.js';
import { ActionTray, ActionAdd } from '../UI/Actions.js';
import ToolTipDecorator from '../UI/ToolTipDecorator.js';
import ModulePanels from '../entities/modules/ModulePanels.js';
import ModuleForm from '../entities/modules/ModuleForm.js';
import JoinModuleForm from '../entities/modules/JoinModuleForm.js';
import './Pages.scss';

export default function MyModules() {
  // Initialisation ------------------------------
  const { loggedinUser } = useAuth();
  const getModulesEndpoint = `/modules/users/${loggedinUser.UserID}`;
  const postModulesEndpoint = '/modules';
  const postModulemembersEndpoint = '/modulemembers';
  

  // State ---------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(getModulesEndpoint);
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const [showJoinModuleForm, setShowJoinModuleForm] = useState(false);

  // Context -------------------------------------
  // Methods -------------------------------------
  const toggleAddForm = () => setShowAddModuleForm(!showAddModuleForm);
  const toggleJoinForm = () => setShowJoinModuleForm(!showJoinModuleForm);
  const cancelAddForm = () => setShowAddModuleForm(false);
  const cancelJoinForm = () => setShowJoinModuleForm(false);

  const handleAddSubmit = async (module) => {
    const response = await API.post(postModulesEndpoint, module);
    return response.isSuccess;
  }

  const handleJoinSubmit = async (modulemember) => {
    const response = await API.post(postModulemembersEndpoint, modulemember);
    return response.isSuccess
      ? loadModules(getModulesEndpoint) || true
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
          <ActionAdd showText onClick={toggleAddForm} buttonText="Add new module"/>
        </ToolTipDecorator>
        <ToolTipDecorator message="Join a module">
          <ActionAdd showText onClick={toggleJoinForm} buttonText="Join a module"/>
        </ToolTipDecorator>
      </ActionTray>

      {
        showAddModuleForm && <ModuleForm onCancel={cancelAddForm} onSubmit={handleAddSubmit} />
      }
      {
        showJoinModuleForm && <JoinModuleForm onCancel={cancelJoinForm} onSubmit={handleJoinSubmit}/>
      }

    </section>
  );
}
