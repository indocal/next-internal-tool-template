import { useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  AutocompleteProps,
  TextFieldProps,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, ControllerProps, Control } from 'react-hook-form';

import { User } from '@/models';

import { useUsersAutocomplete } from './hooks';

export interface ControlledUsersAutocompleteProps {
  name: string;
  label: string;
  control: Control;
  controllerProps?: Omit<ControllerProps, 'name' | 'render'>;
  autocompleteProps?: Omit<
    AutocompleteProps<User, boolean, boolean, boolean>,
    'loading' | 'renderInput' | 'options'
  >;
  textFieldProps?: TextFieldProps;
}

export const ControlledUsersAutocomplete: React.FC<
  ControlledUsersAutocompleteProps
> = ({
  name,
  label,
  control,
  controllerProps,
  autocompleteProps,
  textFieldProps,
}) => {
  const { loading, validating, users, error } = useUsersAutocomplete();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) enqueueSnackbar(error.message, { variant: 'error' });
  }, [error, enqueueSnackbar]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Autocomplete
          loading={loading || validating}
          options={users}
          value={value}
          onChange={(_, value) => onChange(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.username
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={Boolean(error)}
              helperText={error?.message}
              {...textFieldProps}
            />
          )}
          {...autocompleteProps}
        />
      )}
      {...controllerProps}
    />
  );
};

export default ControlledUsersAutocomplete;
