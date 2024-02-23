import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import Header from '../../../SharedModule/Components/Header/Header';
import noData from '../../../assets/images/nullItem.png';
import DeleteModal from '../../../SharedModule/Components/DeleteModal/DeleteModal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function CategoriesLists() {

  const [show, setShow] = useState(false);
  const handleClose = () => setModelState(false);
  const handleShow = () => setShow(true);
  const [modelState, setModelState] = useState("")
  const [categoriesId, setcategoriesId] = useState(0)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmitAdd = async (data) => {
    let token = localStorage.getItem('adminToken');
    // console.log(data);
    try {
      let response = await axios.post
        ('https://upskilling-egypt.com:443/api/v1/Category/', data,
          { headers: { Authorization: token } });
      getList();
      handleClose();
      toast.success("Add success", {
        position: "top-right"
      });

      // console.log(response);

    } catch (error) {
      // console.log(error);
    }
  }
  const handleUpdate = async (data) => {
    let token = localStorage.getItem('adminToken');
    // console.log(data);
    try {
      let response = await axios.put
        (`https://upskilling-egypt.com:443/api/v1/Category/${categoriesId}`, data,
          { headers: { Authorization: token } });
      getList();
      handleClose();
      toast.success("Update success", {
        position: "top-right"
      });
      // console.log(response);

    } catch (error) {
      // console.log(error);
    }
  }


  const [categoriesList, setcategoriesList] = useState([]);
  const getList = async () => {
    let token = localStorage.getItem('adminToken');
    try {
      let categoriesList = await axios.get
        ('https://upskilling-egypt.com:443/api/v1/Category/?pageSize=10&pageNumber=1',
          { headers: { Authorization: token } });
      setcategoriesList(categoriesList.data.data);
      // console.log(categoriesList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModelUpdate = () => {
    setModelState("update")
  }

  const handleModelDelete = () => {
    setModelState("delete")
  }

  const handleModelAdd = () => {
    setModelState("add")
  }


  const handleDelete = (id) => {
    let token = localStorage.getItem('adminToken');
    // console.log(id);
    // console.log(token);
    axios.delete(`https://upskilling-egypt.com:443/api/v1/Category/${id}`, { headers: { Authorization: token } })
      .then((response) => {
        getList();
        handleClose();
        toast.success("Delete success", {
          position: "top-right"
        });
        // console.log(response);
      })
      .catch((error) => console.log(error))
  }




  useEffect(() => {
    getList();
  }, [])

  return (
    <>

      <Header
        title={'Categories Items'}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <ToastContainer autoClose={2000} />

      <Modal show={modelState === "add"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="input-group mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Categories Name"
                {...register("name", {
                  required: "Categories Name is required",

                })} />
            </div>
            <div>
              {errors.name && (
                <span className="text-danger">
                  {errors.name.message}
                </span>
              )}
            </div>


            <div className='d-flex justify-content-end'>
              <button className='btn btn-success'>Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modelState === "update"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="input-group mb-3">

              <input
                type="text"
                className="form-control"
                placeholder="Categories Name"
                {...register("name", {
                  required: "Categories Name is required",

                })} />
            </div>
            <div>
              {errors.name && (
                <span className="text-danger">
                  {errors.name.message}
                </span>
              )}
            </div>


            <div className='d-flex justify-content-end'>
              <button className='btn btn-success'>update Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>


      <Modal show={modelState === "delete"} onHide={handleClose}>
        <Modal.Header closeButton className='color-danger'>
        </Modal.Header>
        <Modal.Body>
          <DeleteModal
            title={`Delete This Category !?`}
            description={`are you sure you want to delete this item ? if you are sure just click on delete it`}

          />
          <div className='delete-button d-flex justify-content-end p-3'>
            <button onClick={() => { handleDelete(categoriesId) }} className='btn btn-danger'>Delete this item</button>
          </div>
        </Modal.Body>
      </Modal>

      <div className="categories-container ">
        <div className="title-info d-flex justify-content-between align-items-center py-4">
          <div className="title">
            <h5>Categories Table Details</h5>
            <h6>You can check all details</h6>
          </div>
          <div className="btn-container">
            <button className='btn btn-success' onClick={handleModelAdd}>
              Add new categories
            </button>

          </div>
        </div>
        <div className="table-container text-center">
          {categoriesList.length > 0 ?
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {categoriesList.map((cat) =>
                  <tr key={cat.id}>
                    <th scope="row">{cat.id}</th>
                    <td>{cat.name}</td>
                    <td>
                      <button className='btn btn-warning mx-3 ' onClick={() => {
                        handleModelUpdate(),
                        setcategoriesId(cat.id)
                      }}>Update</button>
                      <button
                        className='btn btn-danger'
                        onClick={() => {
                          handleModelDelete(),
                          setcategoriesId(cat.id)
                        }}>Delete</button>
                    </td>

                  </tr>
                )}

              </tbody>
            </table>
            : <img src={noData} />}
        </div>
      </div>
    </>
  )
}
