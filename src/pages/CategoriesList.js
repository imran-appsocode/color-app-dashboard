import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, makeStyles } from '@material-ui/core';
import CategoriesListResults from 'src/components/categories/CategoriesListingResults';
import CategoriesToolbar from 'src/components/categories/CategoriesToolbar';
import customers from 'src/__mocks__/customers';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CategoriesList = () => {
  const [categoriesDuplicate, setCategoriesDuplicate] = useState([])
  const classes = useStyles();
  const [hasError, setErrors] = useState(false);
  const [categories, setcategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

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
          setCategoriesDuplicate( res.data.data)
        })
        .catch(() => setErrors({hasErrors: true}))
  },[]
);

// useEffect(() => {
// console.log('searchTerm', searchTerm)
// console.log('setKitchenDuplicate', kitchenDuplicate)
// setKitchens ( searchTerm ? kitchenDuplicate.filter(kitchen => kitchen.kitchenName.toLowerCase().includes(searchTerm)) : kitchenDuplicate)
// }, [searchTerm])


  return (
    <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CategoriesToolbar />
        <Box sx={{ pt: 3 }}>
          <CategoriesListResults customers={categories} />
        </Box>
      </Container>
    </Box>
  </>
  )
};

export default CategoriesList;
