import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import { useAlert } from 'react-alert'



const IconListResults = ({ customers, ...rest }) => {
  let { themeId } = useParams();
  const navigate = useNavigate();
  const alert = useAlert()


  const handleEditClick  = (event, id) => {
    navigate(`/app/edit-icon/${themeId}/${id}`);
  }
  const handleDeleteClick  = (event, id) => {
    axios({
      method: 'delete',
      // url: `http://localhost:3004/themes/icons/${themeId}/${id}`,
      url: `http://ec2-18-219-188-167.us-east-2.compute.amazonaws.com:3004/themes/icons/${themeId}/${id}`,
      // headers: {'Authorization': 'Berear '+ localStorage.getItem('token')}
    })
        // .then(res => {
        //   console.log('response', res.data.data.users);
        //   // res.json()
        // })
        .then(res => {
          // console.log('response', res.data.data);
          alert.show('icon delted successfuly.')

          navigate(`/app/icons/${themeId}`);
        return;
        })
        .catch(() => setErrors({hasErrors: true}))
  }

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>


                <TableCell>
                  Icon Style
                </TableCell>
                <TableCell>
                  Icon Color
                </TableCell>
                <TableCell>
                  Icon Image
                </TableCell>
                <TableCell>
                  Shortcut Name
                </TableCell>
                <TableCell>
                  Shortcut Image
                </TableCell>

                <TableCell>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >

                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.imageURL}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.iconStyle)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.iconStyle}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.iconColor}
                  </TableCell>
                  <TableCell>
                  <Avatar
                        src={customer.iconImage}
                        sx={{ mr: 2 }}
                      >
                      </Avatar>
                  </TableCell>
                  <TableCell>
                    {customer.shortcut ? customer.shortcut.name : ''}
                  </TableCell>
                  <TableCell>
                  <Avatar
                        src={customer.shortcut ? customer.shortcut.shortcutImage : ''}
                        sx={{ mr: 2 }}
                      >
                      </Avatar>
                  </TableCell>


                  <TableCell>

                    <a href="#" onClick= {(event) => handleEditClick(event, customer.id)}>
                      <EditIcon color="action" />
                    </a>
                    <a href="#" onClick= {(event) => handleDeleteClick(event, customer.id)}>
                      <DeleteIcon color="action" />
                    </a>
                </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

IconListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default IconListResults;
