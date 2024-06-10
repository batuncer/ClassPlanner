import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  const handleLogoClick = () => {
    window.location.href = '/main';
  };
  return (
    <div>
      <AppBar position="fixed" >
        <Toolbar style={{ backgroundColor: "white" }}>
          <img
            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
            style={{ height: '90px', margin: '5px 0px' }}
            onClick={handleLogoClick}
          />
          <Typography variant="h2"
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              justifyContent: 'flex-end',
              display: 'flex',
              fontFamily: "'Arvo', serif",
              letterSpacing: '-4px',
              fontWeight: 'bold'
            }}>
            Class Planner
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
