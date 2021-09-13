import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Select,
  InputLabel,
  NativeSelect
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useAlert } from 'react-alert'
import {
  useParams
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const AddIconComponent = (props) => {
  let { themeId } = useParams();

  const classes = useStyles();


  const alert = useAlert()
  const [image, setImage] = useState([])
  const [iconImage, setIconImage] = useState([])
  const [shortcutImage, setShortcutImage] = useState([])
  const [values, setValues] = useState({
    iconStyle: '',
    iconColor: '',
    shortcutName: '',
  });


  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleIconImageChange = (event) => {
    setIconImage(event.target.files[0]);
  };
  const handleshortcutImageChange = (event) => {
    setShortcutImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  function handleSubmit(e) {
    console.log('I am in this function....')
    e.preventDefault();
    const iconStyle = e.target.iconStyle.value
    const iconColor = e.target.iconColor.value
    const shortcutName = e.target.shortcutName.value



    let formData = new FormData();
    formData.append('imageURL', image);
    formData.append('iconImage', iconImage);
    formData.append('iconStyle', iconStyle);
    formData.append('iconColor', iconColor);
    formData.append('shortcutImage', shortcutImage);
    formData.append('name', shortcutName);
    formData.append('id', themeId);



    console.log('formData', formData)

    axios({
      method:'post',
      // url: 'http://localhost:3004/themes/icons/',
      url: 'http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/icons/',
      data: formData,
    }).then(res => {
      // console.log('response', res);
      if (res.status == 200){
        console.log('yes added successfull')

        alert.show('theme icon added successfuly.')
        return;
      }

    })
        .catch((err) => {
          console.log(err)
          alert.show('Something went wrong.')
        })
    // setSubmitted(true);

  }
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Add Icon"
          title="Icon"
        />
        <Divider />
        <CardContent>
        <InputLabel htmlFor="age-native-simple">Image</InputLabel>
        <TextField
              fullWidth
              name="image"
              type="file"
              onChange={handleImageChange}
          />
          <InputLabel htmlFor="age-native-simple">Icon Image</InputLabel>
          <TextField
              fullWidth
              name="iconImage"
              type="file"
              onChange={handleIconImageChange}
          />
          <TextField
            fullWidth
            label="Icon Color"
            margin="normal"
            name="iconColor"
            onChange={handleChange}
            type="text"
            value={values.iconColor}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Icon Style"
            margin="normal"
            name="iconStyle"
            onChange={handleChange}
            type="text"
            value={values.iconStyle}
            variant="outlined"
          />


          <TextField
            fullWidth
            label="Shotcut Name"
            margin="normal"
            name="shortcutName"
            onChange={handleChange}
            type="text"
            value={values.shortcutName}
            variant="outlined"
          />

        <InputLabel htmlFor="age-native-simple">Shortcut Image</InputLabel>
        <TextField
              fullWidth
              name="shortcutImage"
              type="file"
              onChange={handleshortcutImageChange}
          />


          <TextField
            fullWidth
            label="Shotcut Name"
            margin="normal"
            name="backgroundColor"
            onChange={handleChange}
            type="hidden"
            value={values.backgroundColor}
            variant="outlined"
          />

        </CardContent>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddIconComponent;
