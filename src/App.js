import React, { useState } from 'react';

function ModalForm() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email) {
      alert('All fields are required');
      return;
    }
    if (editIndex === null) {
      setData([...data, formData]);
    } else {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setEditIndex(null);
    }
    setFormData({ name: '', email: '' });
    handleClose();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(data[index]);
    handleShow();
  };
  const handleDelete = (index) => {
    if (window.confirm(`Are you sure you want to delete the record of ${data[index].name}?`)) {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    }
  };

  return (
    <>
      <div className='container mx-auto'>
        <div className='text-center mt-5 mb-5'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleShow}>
            Open Form
          </button>
        </div>
      </div>
      {show && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='modal bg-white p-8 rounded shadow-lg'>
            <button className='absolute top-2 right-2 text-gray-600 hover:text-gray-800' onClick={handleClose}>
              Close
            </button>
            <h2 className='text-2xl font-semibold mb-4'>Modal Form</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                  Name
                </label>
                <input
                  className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                  Email
                </label>
                <input
                  className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className='text-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='container mx-auto mt-3'>
        <table className='w-full border-collapse border border-gray-300'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border border-gray-300 px-4 py-2'>Name</th>
              <th className='border border-gray-300 px-4 py-2'>Email</th>
              <th className='border border-gray-300 px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className='border border-gray-300 px-4 py-2'>{item.name}</td>
                <td className='border border-gray-300 px-4 py-2'>{item.email}</td>
                <td className='border border-gray-300 px-4 py-2'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2'
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ModalForm;
