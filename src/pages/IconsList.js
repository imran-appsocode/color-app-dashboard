import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, makeStyles } from '@material-ui/core';
import IconListResults from 'src/components/icons/IconListResults';
import IconListToolbar from 'src/components/icons/IconListToolbar';
import customers from 'src/__mocks__/customers';
import axios from 'axios'
import {
  useParams
} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const IconList = () => {
  let { themeId } = useParams();
  console.log('id', themeId)
  // const [categoriesDuplicate, setCategoriesDuplicate] = useState([])
  const classes = useStyles();
  const [hasError, setErrors] = useState(false);
  const [icons, setIcons] = useState([]);
  // const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      // url: `http://localhost:3004/themes/icons/${themeId}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/icons/${themeId}`,
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          console.log('response', res.data.data);
          setIcons( res.data.data)
        })
        .catch(() => setErrors({hasErrors: true}))
  },[]
);

  return (
<>
    <Helmet>
      <title>Icons</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <IconListToolbar />
        <Box sx={{ pt: 3 }}>
          <IconListResults customers={icons} />
        </Box>
      </Container>
    </Box>
  </>
  )


};

export default IconList;
