import useLoad from '../../api/useLoad.js';
import Form from '../../UI/Form.js';

const emptyModulemember = {
  ModulememberModuleID: 0,
  ModulememberUserID: 0,
};

export default function JoinModuleForm({ onCancel, onSubmit, initialModulemember=emptyModulemember }) {
  // Initialisation ------------------------------
  const validation = {
    isValid: {
      ModulememberModuleID: (id) => id !== 0,
      ModulememberUserID: (id) => id !== 0
    },
    errorMessage: {
      ModulememberModuleID: "No module has been selected",
      ModulememberUserID: "No user has been selected"
    }
  }

  const conformance = ['ModulememberModuleID','ModulememberUserID'];

  // State ---------------------------------------
  const [modulemember, errors, handleChange, handleSubmit] = Form.useForm(initialModulemember, conformance, validation, onCancel, onSubmit);
  const [modules, , loadingModulesMessage,] = useLoad('/modules');
  const [students, , loadingStudentsMessage,] = useLoad('/users/student');

  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>

      <Form.Item
        label="Modules"
        htmlFor="ModulememberModuleID"
        advice="Please select a module"
        error={errors.ModuleYearID}
      >
        {
          !modules
            ? <p>{loadingModulesMessage}</p>
            : modules.length === 0
              ? <p>No records found</p>
              : <select
                  name="ModulememberModuleID"
                  value={modulemember.ModulememberModuleID}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    modules.map((module) =>
                      <option key={module.ModuleID} value={module.ModuleID}>
                        {`${module.ModuleCode} ${module.ModuleName}`}
                      </option>)
                  }
                </select>
        }
      </Form.Item>
 
      <Form.Item
        label="Students"
        htmlFor="ModulememberUserID"
        advice="Please select a student"
        error={errors.ModuleLeaderID}
      >
        {
          !students
            ? <p>{loadingStudentsMessage}</p>
            : students.length === 0
              ? <p>No records found</p>
              : <select
                  name="ModulememberUserID"
                  value={modulemember.ModulememberUserID}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    students.map((student) =>
                      <option key={student.UserID} value={student.UserID}>
                        {`${student.UserLastname}, ${student.UserFirstname} (${student.UserEmail})`}
                      </option>)
                }
                </select>
        }
      </Form.Item>
      
    </Form>
  );
}