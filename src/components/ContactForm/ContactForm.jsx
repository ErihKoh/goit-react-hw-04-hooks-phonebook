import { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({ ...this.state, id: shortid.generate() });
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label className={s.name}>Name</label>
        <input
          className={s.inputName}
          type="text"
          name="name"
          value={this.state.name}
          autoComplete="off"
          onChange={this.handleInputChange}
        />
        <label className={s.number}>Number</label>
        <input
          className={s.inputNumber}
          type="tel"
          name="number"
          value={this.state.number}
          autoComplete="off"
          onChange={this.handleInputChange}
        />
        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
