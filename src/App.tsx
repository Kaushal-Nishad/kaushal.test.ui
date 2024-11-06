import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateUser from './pages/CreateUser';
import UserList from './pages/UserList';
import UpdateUser from './pages/UpdateUser';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/user/edit/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
