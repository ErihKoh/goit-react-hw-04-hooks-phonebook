import s from './ContactEl.module.css';

function ContactEl({ contact }) {
  return (
    <div>
      <span className={s.name}>{contact.name}: </span>
      <span className={s.number}>{contact.number}</span>
    </div>
  );
}

export default ContactEl;
