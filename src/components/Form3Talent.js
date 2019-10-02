import React from 'react';
import PropTypes from 'prop-types';

const Form3Talent = props => {
  const { rol, getUserData, changeSteps, steps, ambassador, id, ambassadorState } = props;
  return (
    <form className="form-box" onSubmit={changeSteps} id="talent" data-userid={id}>

      <div className="input-container">
        <label htmlFor="ambassador">Embajador</label>
        <input
          type="text"
          id="ambassador"
          name="ambassador"
          disabled={(steps.talent || !(rol === 'talent')) && 'disabled'}
          onChange={getUserData}
          value={ambassadorState || ambassador}
          required />
      </div>

      {(rol === 'talent') && <input type="submit" disabled={(steps.talent)} value="Confirmar" />}
    </form>
  );
}

Form3Talent.propTypes = {
  steps: PropTypes.object.isRequired,
  rol: PropTypes.string.isRequired,
  getUserData: PropTypes.func.isRequired,
  changeSteps: PropTypes.func.isRequired,
  ambassadorState: PropTypes.string.isRequired,
}

export default Form3Talent;