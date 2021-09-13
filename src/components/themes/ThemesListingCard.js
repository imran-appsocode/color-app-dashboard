import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  Link
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const ThemeCard = ({ theme, ...rest }) => {
  const navigate = useNavigate();
console.log('---------------------------------------------')
console.log(theme)

function handleClick () {
  navigate(`/app/icons/${theme.id}`)
}
function handleEditClick () {
  navigate(`/app/edit-theme/${theme.id}`)
}
return (
    <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <Avatar
          alt="theme"
          src={theme.image}
          variant="square"
        />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {theme.name}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {theme.backgroundColor}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <a href="#" onClick= {handleEditClick}><EditIcon color="action" /></a>

          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Edit Theme
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <a href="#" onClick= {handleClick}>
          <VisibilityIcon color="action" />
          </a>

          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
            onClick={handleClick}
          >

            View Icons
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  )

};

ThemeCard.propTypes = {
  theme: PropTypes.object.isRequired
};

export default ThemeCard;
