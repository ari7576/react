import React, {useCallback, useState} from 'react';
import NewsPage from "./pages/NewsPage";
import {Routes,Route} from 'react-router-dom'


const App = () => {
    const [category, setCategory] = useState('all');
    const onSelect = useCallback(category => setCategory(category), [])
    return (
        <div>
            <Routes>
                <Route path="/:category" element={<NewsPage />} />;
            </Routes>
        </div>
    );
};

export default App;
