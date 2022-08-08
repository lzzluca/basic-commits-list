import React, {useEffect}  from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import CommitsListContainer from "./features/commits/commits-list-container";
import { fetchPage, fetchTotalCount } from './features/commits/commits-thunk';
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();

  // triggers the fetch for the commits list and total
  useEffect(() => {
    dispatch(fetchPage(1));
    dispatch(fetchTotalCount());
  }, []);
  
  return (
      <Router>
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<CommitsListContainer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
      </Router>
  );
};

export default App;