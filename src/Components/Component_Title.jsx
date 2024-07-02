import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function Component_Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Component_Title.propTypes = {
  children: PropTypes.node,
};

export default Component_Title;
