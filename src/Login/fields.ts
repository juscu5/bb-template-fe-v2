import { FormElement } from '@/_shared/components/types/FormElement';

export const getLoginFields = (isLoading: boolean): FormElement[] => {
  return [
    {
      type: 'text',
      name: 'usrcde',
      label: 'Username',
      placeholder: 'Username',
      disabled: isLoading,
      fullWidth: true,
      required: true,
      autoFocus: true,
      errorRequiredText: 'Username is required.',
    },
    {
      type: 'password',
      name: 'usrpwd',
      label: 'Password',
      placeholder: 'Password',
      disabled: isLoading,
      fullWidth: true,
      required: true,
      autoFocus: false,
      errorRequiredText: 'Password is required.',
    },
  ];
};
