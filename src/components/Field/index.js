import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
};

const Field = ({ type = FIELD_TYPES.INPUT_TEXT, label, name, placeholder }) => {
  const handleInputChange = (e) => {
    e.target.value = e.target.value.toLowerCase(); // Forcer les minuscules
  };
  let component;

  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          autoCapitalize="none" // Désactiver les majuscules automatiques
          spellCheck="false" // Désactiver la correction automatique
          autoComplete="off" // Désactiver l'auto-complétion
          onInput={handleInputChange}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          data-testid="field-testid"
          autoCapitalize="none" // Désactiver les majuscules automatiques
          spellCheck="false" // Désactiver la correction automatique
        />
      );
      break;
    default:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          autoCapitalize="none" // Désactiver les majuscules automatiques
          spellCheck="false" // Désactiver la correction automatique
          autoComplete="off" // Désactiver l'auto-complétion
          onInput={handleInputChange}
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)), // Type de champ (input ou textarea)
  name: PropTypes.string, // Nom du champ
  label: PropTypes.string, // Étiquette du champ
  placeholder: PropTypes.string, // Texte indicatif dans le champ
};

Field.defaultProps = {
  label: "",
  placeholder: "",
  type: FIELD_TYPES.INPUT_TEXT,
  name: "field-name",
};

export default Field;