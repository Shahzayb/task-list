import { makeStyles } from '@material-ui/core';

const useGutterAllChild = makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: (props) => theme.spacing(props.spacing),
    },
  },
}));

export default useGutterAllChild;
