import {
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from '@mui/x-data-grid';

export const EnhancedDataGridToolbar: React.FC = () => (
  <GridToolbarContainer
    sx={{
      display: 'flex',
      flexDirection: ['column', 'row'],
      justifyContent: ['center', 'space-between'],
      alignItems: 'center',
      gap: (theme) => theme.spacing(1),
      padding: (theme) => theme.spacing(1),
      borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
    }}
  >
    <GridToolbarExport />

    <GridToolbarQuickFilter
      size="small"
      variant="outlined"
      sx={{ margin: '0 !important', padding: 0 }}
    />
  </GridToolbarContainer>
);

export default EnhancedDataGridToolbar;
