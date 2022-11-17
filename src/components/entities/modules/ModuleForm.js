import useLoad from '../../api/useLoad.js';
import Form from '../../UI/Form.js';


const emptyModule = {
  ModuleName: "Dummy Module Name",
  ModuleCode: "XY0123",
  ModuleLevel: 4,
  ModuleYearID: 1,
  ModuleLeaderID: 0,
  ModuleImageURL: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
};

export default function ModuleForm({ onCancel, onSubmit, initialModule=emptyModule }) {
  // Initialisation ------------------------------
  const validation = {
    isValid: {
      ModuleName: (name) => name.length > 8,
      ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
      ModuleLevel: (level) => (level > 2) && (level < 8),
      ModuleYearID: (id) => id !== 0,
      ModuleLeaderID: (id) => true,
      ModuleImageURL: (url) => /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(url)
    },
    errorMessage: {
      ModuleName: "Module name is too short",
      ModuleCode: "Module code is not in a valid format",
      ModuleLevel: "Invalid module level",
      ModuleYearID: "No delivery year has been selected",
      ModuleLeaderID: "No module leader has been selected",
      ModuleImageURL: "Image URL is not a valid URL string"
    }
  }

  const conformance = ['ModuleLevel','ModuleYearID','ModuleLeaderID'];

  // State ---------------------------------------
  const [module, errors, handleChange, handleSubmit] = Form.useForm(initialModule, conformance, validation, onCancel, onSubmit);
  const [years, , loadingYearsMessage,] = useLoad('/years');
  const [leaders, , loadingLeadersMessage,] = useLoad('/users/staff');

  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>

      <Form.Item
        label="Module name"
        htmlFor="ModuleName"
        advice="Please enter the name of the module"
        error={errors.ModuleName}
      >
        <input
          type="text"
          name="ModuleName" 
          value={module.ModuleName}
          onChange={handleChange}
        />
      </Form.Item>
      
      <Form.Item
        label="Module code"
        htmlFor="ModuleCode"
        advice="Please enter the module code"
        error={errors.ModuleCode}
      >
        <input
          type="text"
          name="ModuleCode" 
          value={module.ModuleCode}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="Module level"
        htmlFor="ModuleLevel"
        advice="Choose a level between 3 and 7 inclusive"
        error={errors.ModuleLevel}
      >
        <select
          name="ModuleLevel" 
          value={module.ModuleLevel}
          onChange={handleChange}
        >
          <option value="0" disabled>None selected</option>
          {
            [3, 4, 5, 6, 7].map((level) => <option key={level}>{level}</option>)  
          }
        </select>
      </Form.Item>

      <Form.Item
        label="Module year"
        htmlFor="ModuleYearID"
        advice="Select year of delivery"
        error={errors.ModuleYearID}
      >
        {
          !years
            ? <p>{loadingYearsMessage}</p>
            : years.length === 0
              ? <p>No records found</p>
              : <select
                  name="ModuleYearID"
                  value={module.ModuleYearID}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    years.map((year) => <option key={year.YearID} value={year.YearID}>{year.YearName}</option>)
                  }
                </select>
        }
      </Form.Item>
 
      <Form.Item
        label="Module leader"
        htmlFor="ModuleLeaderID"
        advice="Select module leader"
        error={errors.ModuleLeaderID}
      >
        {
          !leaders
            ? <p>{loadingLeadersMessage}</p>
            : leaders.length === 0
              ? <p>No records found</p>
              : <select
                  name="ModuleLeaderID"
                  value={module.ModuleLeaderID}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    leaders.map((leader) => <option key={leader.UserID} value={leader.UserID}>{leader.UserFirstname} {leader.UserLastname}</option>)
                  }
                </select>
        }
      </Form.Item>

      <Form.Item
        label="Module image URL"
        htmlFor="ModuleImageURL"
        advice="Please enter the URL of the module's image"
        error={errors.ModuleImageURL}
      >
        <input
          type="text"
          name="ModuleImageURL" 
          value={module.ModuleImageURL}
          onChange={handleChange}
        />
      </Form.Item>
      
    </Form>
  );
}