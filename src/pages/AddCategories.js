import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddCategoriesComponent from 'src/components/categories/AddCategories';

const AddCategoriesView = () => (
  <>
    <Helmet>
      <title>Add Categories</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ pt: 3 }}>
          <AddCategoriesComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default AddCategoriesView;
