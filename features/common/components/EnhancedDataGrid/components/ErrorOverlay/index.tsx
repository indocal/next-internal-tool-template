import { GridOverlay, useGridApiContext } from '@mui/x-data-grid';

import { ErrorInfo } from '@/components';
import { UnexpectedError } from '@/utils';

export const EnhancedDataGridErrorOverlay: React.FC = () => {
  const { current } = useGridApiContext();

  return (
    <GridOverlay sx={{ width: '100%', height: '100%' }}>
      <ErrorInfo
        error={
          current.state.error instanceof Error
            ? current.state.error
            : new UnexpectedError()
        }
      />
    </GridOverlay>
  );
};

export default EnhancedDataGridErrorOverlay;
