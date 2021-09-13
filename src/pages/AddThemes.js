import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddThemesComponent from 'src/components/themes/AddThemes';

const AddCategoriesView = () => (
  <>
    <Helmet>
      <title>Add Themes</title>
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
          <AddThemesComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default AddCategoriesView;
