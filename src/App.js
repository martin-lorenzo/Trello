import TaskList from './components/TaskList';
import MainHeader from './components/MainHeader';
import { useState } from 'react';
import User from './user.js';
import LoginForm from './components/LoginForm/LoginForm';


function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showModalHandler() {
    setModalIsVisible(true);
  }

  function handleLogin(username, password) {
    // Perform login logic here, e.g., call an API to authenticate the user.
    // Then, set the currentUser state with the authenticated user data.
  }

  return (
    <>
      {currentUser ? (
        <>
          <MainHeader onCreateTask={showModalHandler} currentUser={currentUser} />
          <main>
            <TaskList
              posting={modalIsVisible}
              stopPosting={hideModalHandler}
              currentUser={currentUser}
            />
          </main>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
