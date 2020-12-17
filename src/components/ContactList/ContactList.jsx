import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ContactEl from '../ContactEl';
import IconBatton from '../IconButton';
import { ReactComponent as DelIcon } from '../../icons/delete.svg';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.item}>
          <ContactEl contact={{ name, number }} />
          <IconBatton onClick={() => onDeleteContact(id)} aria-label="Add todo">
            <DelIcon width="15" height="15" fill="#fff" />
          </IconBatton>
        </li>
      ))}
    </ul>
  );
}

ContactList.protoTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
