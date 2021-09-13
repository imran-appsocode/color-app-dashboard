import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import ThemeListToolbar from 'src/components/themes/ThemesToolbar';
import ThemeCard from 'src/components/themes/ThemesListingCard';
import products from 'src/__mocks__/products';
import axios from 'axios'

const ThemeList = () => {

  const [themesDuplicate, setThemesDuplicate] = useState([])
  // const classes = useStyles();
  const [hasError, setErrors] = useState(false);
  const [themes, setThemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      // url: 'http://localhost:3004/themes/',
      url: 'http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/',
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          console.log('response', res.data.data);
          setThemes( res.data.data)
          setThemesDuplicate( res.data.data)
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
      <title>Themes</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <ThemeListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {themes.map((theme) => (
              <Grid
                item
                key={theme.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ThemeCard theme={theme} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
  )
};

export default ThemeList;
