import { useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  AutocompleteProps,
  TextFieldProps,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, ControllerProps, Control } from 'react-hook-form';

import { UserRole } from '@/models';

import { useUsersRolesAutocomplete } from './hooks';

export interface ControlledUsersRolesAutocompleteProps {
  name: string;
  label: string;
  control: Control;
  controllerProps?: Omit<ControllerProps, 'name' | 'render'>;
  autocompleteProps?: Omit<
    AutocompleteProps<UserRole, boolean, boolean, boolean>,
    'loading' | 'renderInput' | 'options'
  >;
  textFieldProps?: TextFieldProps;
}

export const ControlledUsersRolesAutocomplete: React.FC<
  ControlledUsersRolesAutocompleteProps
> = ({
  name,
  label,
  control,
  controllerProps,
  autocompleteProps,
  textFieldProps,
}) => {
  const { loading, validating, roles, error } = useUsersRolesAutocomplete();

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
          options={roles}
          value={value}
          onChange={(_, value) => onChange(value)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.name
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

export default ControlledUsersRolesAutocomplete;
