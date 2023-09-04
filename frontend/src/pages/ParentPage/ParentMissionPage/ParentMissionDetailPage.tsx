import React from 'react';
import { useParams } from 'react-router-dom';

const ParentMissionDetailPage = () => {

    const { missionid } = useParams<{ missionid: string }>();

    return (
        <div>
            <h1>미션제목:{missionid}</h1>
        </div>
    );
};

export default ParentMissionDetailPage;