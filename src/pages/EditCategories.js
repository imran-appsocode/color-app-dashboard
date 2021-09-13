import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EditCategoriesComponent from 'src/components/categories/EditCategories';

const EditCategoriesView = () => (
  <>
    <Helmet>
      <title>Edit Category</title>
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
          <EditCategoriesComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default EditCategoriesView;
