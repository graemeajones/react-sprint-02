import Panel from '../../UI/Panel.js';
import ObjectTable from '../../UI/ObjectTable.js';

export default function ModulePanels({ modules }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Context -------------------------------------
  // Methods -------------------------------------
  // View ----------------------------------------
  const displayableAttributes = [
    { key: 'ModuleLevel', label: 'Module level' },
    { key: 'ModuleYearName', label: 'Year taken' },
    { key: 'ModuleLeaderName', label: 'Module leader' }
  ];

  return (
    <Panel.Container>
      {
        modules.map((module) =>
          <Panel
            key={module.ModuleCode}
            title={`${module.ModuleCode} ${module.ModuleName}`}
            level={3}
          >
            <Panel.Static level={4}>
              <ObjectTable object={module} attributes={displayableAttributes} />
            </Panel.Static>
          </Panel>
        )
      }
    </Panel.Container>
  );
}
