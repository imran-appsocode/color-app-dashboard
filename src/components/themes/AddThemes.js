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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const AddThemeComponent = (props) => {

  const [categories, setcategories] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      // url: 'http://localhost:3004/categories/',
      url: 'http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/categories/',
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          console.log('response', res.data.data);
          setcategories( res.data.data)
        })
        .catch(() => setErrors({hasErrors: true}))
  },[]
  );

  const classes = useStyles();



  const alert = useAlert()
  const [themeImage, setThemeImage] = useState([])
  const [backgroundImage, setBackgroundImage] = useState([])
  const [categoryId, setCategoryId] = useState([])
  const [values, setValues] = useState({
    name: '',
    order: ''
  });

  const handleChangeSelect = (event) => {
    // categoryId = event.target.value;
    console.log('categoryId', event.target.value)
    setCategoryId(event.target.value)
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleThemeImageChange = (event) => {
    setThemeImage(event.target.files[0]);
  };

  const handleBackgroundImageChange = (event) => {
    setBackgroundImage(event.target.files[0]);
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
    const nameValue = e.target.name.value
    const bgValue = e.target.backgroundColor.value

    console.log('nameValue', nameValue)
    console.log('bgValue', bgValue)
    console.log('categoryId-----------', categoryId)

    let formData = new FormData();
    formData.append('themeImage', themeImage);
    formData.append('backgroundImage', backgroundImage);
    formData.append('name', nameValue);
    formData.append('backgroundColor', bgValue);
    formData.append('categoryId', categoryId);


    console.log('formData', formData)

    axios({
      method:'post',
      // url: 'http://localhost:3004/themes/',
      url: 'http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/',
      data: formData,
    }).then(res => {
      // console.log('response', res);
      if (res.status == 200){
        console.log('yes added successfull')

        alert.show('theme added successfuly.')
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
          subheader="Add Themes"
          title="Themes"
        />
        <Divider />
        <CardContent>
        <InputLabel htmlFor="age-native-simple">Theme Image</InputLabel>
        <TextField
              fullWidth

              name="themeImage"
              type="file"
              onChange={handleThemeImageChange}
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <InputLabel htmlFor="age-native-simple">Background Image</InputLabel>
          <TextField
              fullWidth
              name="backgroundImage"
              type="file"
              onChange={handleBackgroundImageChange}
          />
          <TextField
            fullWidth
            label="Background Color"
            margin="normal"
            name="backgroundColor"
            onChange={handleChange}
            type="text"
            value={values.backgroundColor}
            variant="outlined"
          />

        <InputLabel htmlFor="age-native-simple">Category</InputLabel>
        <Select
          fullWidth
          label="Category"
          // native
          value={categories.id}
          onChange={handleChangeSelect}
          options={categories}
          name="category"
        >

            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}

        </Select>

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

export default AddThemeComponent;
