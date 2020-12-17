import PropTypes from 'prop-types';
import s from './Section.module.css';

function Section({ title, children }) {
  return (
    <div className={s.section}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Section.protoType = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Section;
