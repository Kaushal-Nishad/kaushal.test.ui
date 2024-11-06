import React, { useEffect, useState } from 'react';
import { User } from '../../types';

type UserFormProps = {
  existingUser?: User | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onSuccess: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onSuccess, existingUser }) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    phone: '',
    description: '',
    avatar: null,
  });

  useEffect(() => {
    if (existingUser && existingUser._id) {
      setFormData(existingUser);
    }
  }, [existingUser]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form: any = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('description', formData.description);

    if (formData.avatar) {
      form.append('avatar', formData.avatar);
    }

    try {
      await onSubmit(form);
      onSuccess();
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 mx-auto mt-5">
          <div className="card shadow-lg">
            <div className="card-header">
              <h3 className="mb-0">{existingUser?._id ? 'Update User' : 'Create User'}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Write a brief description"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">Avatar</label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {existingUser && (<img src={`http://localhost:3033/uploads/${existingUser.avatar}`} alt='user image' width={70} height={70} />)}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
