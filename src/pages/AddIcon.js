import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddIconComponent from 'src/components/icons/AddIcon';

const AddIconsView = () => (
  <>
    <Helmet>
      <title>Add Icons</title>
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
          <AddIconComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default AddIconsView;
