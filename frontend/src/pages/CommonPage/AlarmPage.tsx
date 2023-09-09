import React from 'react';
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
const AlarmPage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div>
            <Typography variant="h2">알람 페이지</Typography>
            </div>
            <div>
      <List className="w-100 lg:w-[40vw] ">
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              알람 제목
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              알람 내용을 여기에 띄울 예정임.
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="alexander" src="/img/face-2.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Alexander
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Backend Developer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src="/img/face-3.jpg" />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emma Willever
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              UI/UX Designer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
      </List>
      </div>
    </div>
    );
};

export default AlarmPage;