import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function BottomNav() {
  const [value, setValue] = React.useState<number>(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="알림" icon={<RestoreIcon />} />
        <BottomNavigationAction label="홈" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="메뉴" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}
