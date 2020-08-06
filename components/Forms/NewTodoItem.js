import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';
import {
  Button,
  CircularProgress,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useGutterAllChild from '../../hooks/useGutterAllChild';
import useMarginRightChild from '../../hooks/useMarginRightChild';
import MultilineTextField from './Fields/MultilineTextField';
import Link from '../Link';
import { useCreateTodoItemMutation } from '../../react-query/todo-item';

const initialValues = {
  description: '',
  due_date: '',
  reminder_time: '',
  shared_with: '',
};

const validationSchema = yup.object().shape({
  description: yup
    .string()
    .trim()
    .required('required')
    .max(300, 'todo item is too long'),
  due_date: yup
    .string()
    .test('due_date', '', function (value) {
      const { path, createError } = this;

      const timestamp = Date.parse(value);
      const nowTimestamp = Date.now();
      const isValid =
        isNaN(timestamp) === false && timestamp - nowTimestamp > 0;

      return (
        !value ||
        isValid ||
        createError({
          path,
          message: 'due date is invalid',
        })
      );
    })
    .default(''),
  reminder_time: yup
    .string()
    .test('reminder_time', '', function (value) {
      const { path, createError } = this;

      const timestamp = Date.parse(value);
      const nowTimestamp = Date.now();
      const isValid =
        isNaN(timestamp) === false && timestamp - nowTimestamp > 0;

      return (
        !value ||
        isValid ||
        createError({ path, message: 'reminder datetime is invalid' })
      );
    })
    .default(''),
  shared_with: yup.string().default(''),
});

function NewTodoItem({ users }) {
  const [mutate, { error }] = useCreateTodoItemMutation();

  const gutterClx = useGutterAllChild({ spacing: 3 });
  const marginClx = useMarginRightChild();
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formik) => {
      mutate(values)
        .then((data) => {
          router.push('/');
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    },
  });
  return (
    <div className={gutterClx.root}>
      {error && (
        <Alert
          action={
            <Button
              onClick={() => {
                formik.submitForm();
              }}
              color="inherit"
              size="small"
            >
              retry
            </Button>
          }
          severity="error"
        >
          Ooops! Something went wrong.
        </Alert>
      )}
      <form
        onSubmit={formik.handleSubmit}
        action=""
        noValidate
        autoComplete="off"
        className={gutterClx.root}
      >
        <MultilineTextField
          {...formik.getFieldProps('description')}
          placeholder="Enter todo item"
          variant="outlined"
          spellCheck="false"
          margin="none"
          size="small"
          fullWidth
          inputProps={{
            maxLength: 300,
          }}
          disableEnterKey
          error={formik.touched.description && !!formik.errors.description}
          helperText={`${formik.values.description.length}/300`}
        />
        <TextField
          {...formik.getFieldProps('due_date')}
          //   value={undefined}
          fullWidth
          label="Due date (optional)"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          error={formik.touched.due_date && !!formik.errors.due_date}
          helperText={formik.errors.due_date}
        />
        <TextField
          fullWidth
          {...formik.getFieldProps('reminder_time')}
          //   value={undefined}
          label="Reminder (optional)"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          error={formik.touched.reminder_time && !!formik.errors.reminder_time}
          helperText={formik.errors.reminder_time}
        />
        <FormControl fullWidth>
          <InputLabel id="shared_with_label">Share with (optional)</InputLabel>
          <Select
            {...formik.getFieldProps('shared_with')}
            labelId="shared_with_label"
          >
            <MenuItem value={''}>None</MenuItem>
            {/* generate users menu items here */}
            {users.map((user) => (
              <MenuItem key={user.id} value={`${user.id}`}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          display="flex"
          justifyContent="flex-end"
          className={marginClx.root}
        >
          <Link underline="none" href="/">
            <Button
              variant="outlined"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Post{' '}
            {formik.isSubmitting && (
              <CircularProgress size={16} style={{ marginLeft: '10px' }} />
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default NewTodoItem;
