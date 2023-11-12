import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { Component } from 'react';
// import { createPortal } from 'react-dom';

// const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>{this.props.children}</div>
      </div>
    );
  }
}

Modal.propTypes = {
  onCLose: PropTypes.func,
  children: PropTypes.node.isRequired,
};
