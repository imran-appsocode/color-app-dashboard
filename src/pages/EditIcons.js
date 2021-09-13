import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EditIconComponent from 'src/components/icons/EditIcons';

const EditIconsView = () => (
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
          <EditIconComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default EditIconsView;
