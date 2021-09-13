import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import axios from "axios";
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom';

const EditCategoriesComponent = (props) => {
  let { categoryId } = useParams();
  // const [categorIdByParams, setCategorIdByParams] = useState([]);
  // setCategorIdByParams(categoryId)
  const [categories, setcategories] = useState([]);
  const alert = useAlert()
  const [values, setValues] = useState({
    name: '',
    order: ''
  });
  useEffect(() => {
    axios({
      method: 'get',
      // url: `http://localhost:3004/categories/${categoryId}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/categories/${categoryId}`,
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          console.log('response', res.data.data);
          setcategories( res.data.data)
          setValues(res.data.data)
        })
        .catch(() => setErrors({hasErrors: true}))
  },[]
  );




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
    const orderValue = e.target.order.value

    console.log('nameValue', nameValue)
    console.log('orderValue', orderValue)

    axios({
      method:'put',
      // url: `http://localhost:3004/categories/${categoryId}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/categories/${categoryId}`,
      data: {name: nameValue, order: orderValue},
    }).then(res => {
      // console.log('response', res);
      if (res.status == 200){
        console.log('yes updated successfull')

        alert.show('Category updated successfuly.')
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
          subheader="Edit Category"
          title="Categories"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Category Name"
            margin="normal"
            name="name"
            onChange={handleChange}
            type="text"
            value={values.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Sort Order"
            margin="normal"
            name="order"
            onChange={handleChange}
            type="bumber"
            value={values.order}
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

export default EditCategoriesComponent;
