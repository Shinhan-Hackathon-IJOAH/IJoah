import React from 'react';
import {useNavigate} from "react-router-dom";
import { IconButton }   from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {BackPageButtonTag} from './BackPageButtonStyles'
import { useDiaryStore } from '../../store/DiaryStore';

const BackPageButton = () => {
    const navigate = useNavigate();
    const {
        setTitle,
        setContent,
        setWeatherMood,
        setDate,
        setPicture,
      } = useDiaryStore();
    return (
        <BackPageButtonTag>
            <IconButton 
            style={{ marginLeft: '15px', marginTop: '15px' }} 
            onClick={()=>{navigate(-1);
                setTitle('');
          setContent('');
          setWeatherMood('');
          setDate('');
          setPicture([]);
            }}
            className="rounded-full bg-[#ea4335]  hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
       <FontAwesomeIcon icon={faArrowLeft} />
      </IconButton>
        </BackPageButtonTag>
    );
};

export default BackPageButton;