import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { StockForm } from './components/stock-search/stock-search';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from './state';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const client_id = process.env.REACT_APP_LEMON_MARKETS_CLIENT_ID!;
  const client_secret = process.env.REACT_APP_LEMON_MARKETS_CLIENT_SECRET!;
  return (
    <div>
      <header>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                ShopStocks
              </Typography>
              <Button color="inherit" onClick={() => login({client_id, client_secret})}>
                Login
              </Button>
            </Toolbar>
          </AppBar>
      </header>

      <main className="App-main">
        <StockForm></StockForm>
      </main>
    </div>
  );
}

export default App;
