import React, {useEffect}  from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { debounce } from "debounce";
import { useAppDispatch } from './app/hooks';
import store from "./app/store";
import CommitsListContainer from "./features/commits/commits-list-container";
import { fetchCommits } from './features/commits/commits-thunk';
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();

  // triggers the fetch for the commits list
  useEffect(() => {
    dispatch(fetchCommits());
  }, []);
  
  return (
      <Router>
          <div className="content-wrapper">
            <Routes>
              <Route path="/commits" element={<CommitsListContainer />} />
              <Route path="*" element={<Navigate to="/commits" replace />} />
            </Routes>
          </div>
      </Router>
  );
};

export default App;