import * as React from 'react';
import PropTypes from 'prop-types';
import {GridOverlay, DataGrid} from '@material-ui/data-grid';
import LinearProgress from '@material-ui/core/LinearProgress';

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          width: '100%',
        }}
      >
        <LinearProgress color='secondary' />
      </div>
    </GridOverlay>
  );
}

export default function VirtualizedGrid(props) {
  const {isLoading, rows, columns} = props;
  const [data, setData] = React.useState({columns: [], rows: []});

  React.useEffect(() => {
    setData({
      rows,
      columns,
    });
  }, [rows, columns]);

  return (
    <div style={{height: 600, width: '100%'}}>
      <DataGrid
        components={{
          loadingOverlay: isLoading ? CustomLoadingOverlay : '',
        }}
        loading={isLoading}
        {...data}
      />
    </div>
  );
}

VirtualizedGrid.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  rows: PropTypes.func.isRequired,
  columns: PropTypes.func.isRequired,
};
