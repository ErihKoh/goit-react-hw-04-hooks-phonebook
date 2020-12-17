import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ value, onChange }) {
  return (
    <div className={s.block}>
      <label className={s.label} htmlFor="filter">
        Find contacts by name
      </label>
      <input
        className={s.input}
        id="filter"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

Filter.protoTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
