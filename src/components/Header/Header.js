import React from 'react'
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import {
  useWalletDispatch,
  useWalletState,
  connectMetamask
} from '../../context/WalletContext'
import SideMenu from '../SideMenu/SideMenu'
import PortisBtn from '../Portis/PortisBtn'

const Header = () => {
  const classes = useStyles()
  const { handleWalletConnect, activeUser, connectStatus } = useHeaderLogic()

  const ButtonsOrAddress = () => {
    return (
      <Grid>
        {!activeUser ? (
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleWalletConnect}
          >
            CONNECT WALLET
          </Button>
        ) : (
          <Grid>
            <Typography variant='h5'>{activeUser}</Typography>
          </Grid>
        )}

        <PortisBtn />
      </Grid>
    )
  }

  return (
    <AppBar>
      <Toolbar className={classes.toolBar} elevation={0}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <SideMenu />
        <Typography variant='h6' className={classes.title}>
          LICENTIA
        </Typography>

        {connectStatus === 'GETTING' ? (
          <CircularProgress />
        ) : (
          <ButtonsOrAddress />
        )}
      </Toolbar>
    </AppBar>
  )
}

const useHeaderLogic = () => {
  const walletDispatch = useWalletDispatch()
  const { status: connectStatus, activeUser, Web3Injected } = useWalletState()

  const handleWalletConnect = () => connectMetamask(walletDispatch)

  return { handleWalletConnect, activeUser, Web3Injected, connectStatus }
}

export default Header

{
  /* <Grid item xs={4}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <SideMenu />
        <Typography variant='h6' className={classes.title}>
          LICENTIA
        </Typography>
      </Grid>
      <Grid item xs={8} container direction='row' justify='flex-end'>
        <GridListTile>
          <ConnectModal />
        </GridListTile>
        <GridListTile key='Learn'>
          <ListItem button key='Learn' className={classes.leftIconsBtns}>
            <ListItemIcon>
              <img src={HelpIcon} alt='Learn' className={classes.imageIcon} />;
            </ListItemIcon>
            <ListItemText primary='HELP' />
          </ListItem>
        </GridListTile>
      </Grid> */
}
