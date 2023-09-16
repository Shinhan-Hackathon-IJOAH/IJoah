import React from 'react';
import {PatternContainer} from './ParentPatternPageStyles'
import PatternGraph from '../../../components/ParentPattern/PatternGraph';
import BackPageButton from '../../../components/Common/BackPageButton';
import BottomNav from '../../../components/Common/BottomNav';

const ParentPatternPage = () => {
    return (
        <PatternContainer>
            <BackPageButton/>
            <PatternGraph/>
            <BottomNav/>
        </PatternContainer>
    );
};

export default ParentPatternPage;