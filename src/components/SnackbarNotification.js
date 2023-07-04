import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import {Box} from '@mui/material'
import PropTypes from 'prop-types'
import MuiAlert from '@mui/material/Alert';

export default function SnackbarNotification(props) {
    const { message, onClose, severity } = props

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    // console.log("Severity", severity)
    return (
        <div>
          <Box sx={{ width: "400px"  }}>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={true}
                autoHideDuration={6000}
                onClose={onClose}
            >
                <Alert
                    onClose={onClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            </Box>
        </div>
    )
}

SnackbarNotification.propTypes = {
    message: PropTypes.string,
    severity: PropTypes.string,
    onClose: PropTypes.function  
        
    

}

