import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EditThemesComponent from 'src/components/themes/EditThemes';

const EditThemeView = () => (
  <>
    <Helmet>
      <title>Edit Themes</title>
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
          <EditThemesComponent />
        </Box>
      </Container>
    </Box>
  </>
);

export default EditThemeView;
