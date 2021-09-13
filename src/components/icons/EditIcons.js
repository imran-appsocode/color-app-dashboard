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
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const EditIconComponent = (props) => {
  let { themeId, iconId } = useParams();

  // const classes = useStyles();


  const alert = useAlert()
  const [hasError, setErrors] = useState(false);
  const [image, setImage] = useState([])
  const [iconImage, setIconImage] = useState([])
  const [shortcutImage, setShortcutImage] = useState([])
  const [shortcutName, setShortcutName] = useState({name:''})
  const [prevShortcutImage, setPrevShortcutImage] = useState({shortcutImage: ''})
  const [values, setValues] = useState({
    iconStyle: '',
    iconColor: '',
    imageURL:'',
    iconImage: '',
  });



  useEffect(() => {
    axios({
      method: 'get',
      // url: `http://localhost:3004/themes/icons/${themeId}/${iconId}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/icons/${themeId}/${iconId}`,
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          console.log('response', res.data.data);
          let iconData = res.data.data;
          if (iconData && iconData.shortcut){
            console.log('inside********************************************')
            console.log('iconData.shortcut', iconData.shortcut.name)
            setShortcutName(iconData.shortcut)
            setPrevShortcutImage(iconData.shortcut.shortcutImage)

          }

          console.log('shortcutName', shortcutName)
          console.log('prevShortcutImage', prevShortcutImage)
          setValues(res.data.data)

          console.log('setValues', values.iconColor)
        })
        .catch(() => setErrors({hasErrors: true}))
  },[]
  );



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
  const handleChangeShortcut = (event) => {
    // setValues({
    //   ...shortcutName,
    //   [event.target.name]: event.target.value
    // });
    setShortcutName(event.target.value)
  };
  function handleSubmit(e) {
    console.log('I am in this function....')
    e.preventDefault();
    const iconStyle = e.target.iconStyle.value
    const iconColor = e.target.iconColor.value
    const shortcutName = e.target.shortcutName.value
    const imageURLValue = e.target.prevImageURL.value
    const prevIconImageValue = e.target.prevIconImage.value
    const prevShortcutImageValue = e.target.prevShortcutImage.value



    let formData = new FormData();
    formData.append('imageURL', image);
    formData.append('iconImage', iconImage);
    formData.append('iconStyle', iconStyle);
    formData.append('iconColor', iconColor);
    formData.append('shortcutImage', shortcutImage);
    formData.append('name', shortcutName);
    formData.append('id', themeId);
    formData.append('prevImageURL', imageURLValue);
    formData.append('prevIconImage', prevIconImageValue);
    formData.append('prevShortcutImage', prevShortcutImageValue);



    console.log('formData', formData)

    axios({
      method:'patch',
      // url: `http://localhost:3004/themes/icons/${iconId}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/icons/${iconId}`,
      data: formData,
    }).then(res => {
      // console.log('response', res);
      if (res.status == 200){
        console.log('yes added successfull')

        alert.show('theme icon updated successfuly.')
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

name="prevImageURL"
onChange={handleChange}
type="hidden"
value={values.imageURL}
/>
<TextField

            name="prevIconImage"
            onChange={handleChange}
            type="hidden"
            value={values.iconImage}
          />
          <TextField

name="prevShortcutImage"
onChange={handleChange}
type="hidden"
value={prevShortcutImage}
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
            onChange={handleChangeShortcut}
            type="text"
            value={shortcutName.name}
            variant="outlined"
          />

        <InputLabel htmlFor="age-native-simple">Shortcut Image</InputLabel>
        <TextField
              fullWidth
              name="shortcutImage"
              type="file"
              onChange={handleshortcutImageChange}
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
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default EditIconComponent;
