import { Avatar, Box, Button, Container, CssBaseline, IconButton, Link, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { ISingleResult } from '../../interfaces/lemon-api-search';
import { buyStock, search } from '../../services/lemon-markets.service';
import { useAppSelector } from '../../state/reducers';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function StockForm() {
  const classes = useStyles();
  let searchInput = '';
  let [results, setResults] = useState<ISingleResult[]>([]);

  const user = useAppSelector((state) => state.user);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ShoppingCartOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Buy Stock
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="stock-search"
            label="Search stock"
            name="search"
            autoComplete="search"
            autoFocus
            onChange={(event) => searchInput = event.target.value}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async () => {
              console.log(searchInput);
              setResults(await search(searchInput, user.access_token));
            }}
          >
            Search
          </Button>
        </form>
      </div>
      <div>
        <ListStocks stocks={results} accessToken={user.access_token}></ListStocks>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

function ListStocks({stocks, accessToken}: {stocks: ISingleResult[], accessToken: string}, ) {
  return(
    <List>
      {renderStocks(stocks, accessToken)}
    </List>
  );
}

function renderStocks(stocks: ISingleResult[], accessToken: string) {
  return stocks.map(stock => {
    return(
    <ListItem key={stock.isin}>
      <ListItemText
        primary={stock.name}
        secondary={'isin: ' + stock.isin}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="buy" onClick={() => buy(stock.isin, accessToken)}>
          <ShoppingCartOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>);
  });
}

async function buy(isin: string, access_token: string) {
  const success = await buyStock(isin, access_token);
  if (success) {
    alert('Aktie erfolgreich gekauft!');
  } else {
    alert('Fehler beim kaufen der Aktie :(');
  }
}
