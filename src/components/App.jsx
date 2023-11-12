import React, { Component } from 'react';
import { Modal } from './Modal/Modal.jsx';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import imagesAPI from 'api/api.js';
import { ToastContainer, toast } from 'react-toastify';
import { MagnifyingGlass } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchValue: '',
    images: [],
    page: 1,
    isLoading: false,
    isEndCollection: false,
    isShowModal: false,
    modalImageURL: '',
    tags: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchValue } = this.state;
    if (prevState.page !== page || prevState.searchValue !== searchValue) {
      this.setState({ isLoading: true });

      try {
        const response = await imagesAPI.getImages(searchValue, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
        }));

        if (!response.totalHits) {
          return toast.error(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }

        const totalPages = Math.ceil(response.totalHits / 12);

        if (page === totalPages) {
          this.setState({ isEndCollection: true });
          toast.success('No more pictures');
        }
      } catch (error) {
        console.log('Error', error.message);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  openModal = (url, tags) => {
    console.log(tags);
    this.setState(prevState => ({
      ...prevState,
      isShowModal: true,
      modalImageURL: url,
      tags: [tags],
    }));
  };

  closeModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isShowModal: false,
      modalImageURL: '',
      tags: '',
    }));
  };

  formSubmitHandle = searchValue => {
    this.setState({ searchValue, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      isShowModal,
      modalImageURL,
      tags,
      images,
      isLoading,
      isEndCollection,
    } = this.state;

    console.log(isShowModal);

    return (
      <div className={css.App}>
        {isShowModal && (
          <Modal onClose={this.closeModal}>
            <img src={modalImageURL} alt={tags} />
          </Modal>
        )}
        <Searchbar onSubmit={this.formSubmitHandle} />
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.openModal} />
        )}
        {images.length > 0 && !isEndCollection && (
          <Button
            onClick={() => {
              this.handleLoadMore();
            }}
          />
        )}
        {isLoading && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
