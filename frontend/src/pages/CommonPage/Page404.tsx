import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { useUserStore } from './../../store/UserStore';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export function Page404() {

  const { memberRole } = useUserStore();

  return (
    <div>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, <br></br>page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            해당 페이지를 찾을 수 없습니다.
          </Typography>

          <Box
            component="img"
            src="/illustration_404.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          {/* memberRole에 따라 분기 */}
          {
            memberRole === "PARENT"? (
              <Button to="/parent" size="large" variant="contained" component={RouterLink}>
                홈으로
              </Button>
            ) : ( 
              <Button to="/child" size="large" variant="contained" component={RouterLink}>
                홈으로
              </Button>
            )
          }
        </StyledContent>
      </Container>
    </div>

  );
}
