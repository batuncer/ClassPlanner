import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  const handleLogoClick = () => {
    window.location.href = '/main';
  };
  return (
    <div className='header'>
      <AppBar position="fixed" >
        <Toolbar style={{ backgroundColor: "white" }}>
          <img  className='logo'
            src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
            style={{ height: '90px', margin: '5px 0px' }}
            onClick={handleLogoClick} alt='logo'
          />
          <Typography variant="h2" 
          className="class-planner-title" 
            component="div"
            sx={{
              flexGrow: 1,
              color: "black",
              justifyContent: 'flex-end',
              display: 'flex',
              fontFamily: "'Arvo', serif",
              letterSpacing: '-4px',
              fontWeight: 'bold',
              '@media (max-width: 860px)': {
                display: 'none',
              },
            }}>
            Class Planner
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header;
