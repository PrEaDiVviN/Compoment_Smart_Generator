import React from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import GenerationPage from './components/generation/GenerationPage';

function App() {
  return (
    <BrowserRouter>
        <div className={styles.app}>
            {/* <Header /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generation" element={<GenerationPage />} />
                <Route path="*" element={<Navigate to={'/'} />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
