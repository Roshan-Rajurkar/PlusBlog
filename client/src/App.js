import './App.css';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';
import Login from './components/login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register/Register';
import Layout from './components/layout/Layout';
import { UserContextProvider } from './components/context/UserContext';
import CreatePost from './components/pages/CreatePost';
import PostPage from './components/post/PostPage';
import EditPost from './components/pages/EditPost';

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route exact path='/' element={
          <main>
            <Layout Children={<Posts />} />
          </main>
        } />
        <Route exact path='/login' element={
          <main>
            <Layout Children={<Login />} />
          </main>
        } />
        <Route exact path='/register' element={
          <main>
            <Layout Children={<Register />} />
          </main>
        } />
        <Route exact path='/create' element={
          <main>
            <Layout Children={<CreatePost />} />
          </main>
        } />
        <Route exact path='/post/:id' element={
          <main>
            <Layout Children={<PostPage />} />
          </main>
        } />
        <Route exact path='/edit/:id' element={
          <main>
            <Layout Children={<EditPost />} />
          </main>
        } />
        <Route exact path='/*' element={
          <main>
            <Layout Children={<p>404 page not found</p>} />
          </main>
        } />



        <Route exact path='/post/:id' element={<Post />} />
      </Routes>

    </UserContextProvider>
  );
}

export default App;
