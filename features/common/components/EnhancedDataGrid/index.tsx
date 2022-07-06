import { DataGrid, DataGridProps } from '@mui/x-data-grid';

import {
  EnhancedDataGridLoadingOverlay,
  EnhancedDataGridToolbar,
  EnhancedDataGridNoRowsOverlay,
  EnhancedDataGridErrorOverlay,
} from './components';

export type EnhancedDataGridProps = Omit<
  DataGridProps,
  'components' | 'componentsProps'
>;

export const EnhancedDataGrid: React.FC<EnhancedDataGridProps> = (props) => (
  <DataGrid
    components={{
      LoadingOverlay: EnhancedDataGridLoadingOverlay,
      Toolbar: EnhancedDataGridToolbar,
      NoRowsOverlay: EnhancedDataGridNoRowsOverlay,
      NoResultsOverlay: EnhancedDataGridNoRowsOverlay,
      ErrorOverlay: EnhancedDataGridErrorOverlay,
    }}
    {...props}
  />
);

export default EnhancedDataGrid;
