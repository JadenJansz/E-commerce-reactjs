import { TextField } from '@material-ui/core'
import { Grid } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const CusTextField = ({ id, label }) => {
  
  const { register, handleSubmit, watch, formState: {errors}, control } = useForm();
  console.log(errors)
  return (
    <Grid item xs={12} sm={6}>
        <Controller 
                name='firstName'
                control={control}
                rules={{ required: '*field is required' }}
                render={({ field: { ref, ...field} }) => (
                  <TextField
                    { ...field }
                    id='firstName' 
                    label='First Name'
                    error={!!errors.firstName}
                    helperText={errors.firstName ? errors.firstName?.message : ''}  />
                )}
              />
    </Grid>
  )
}

export default CusTextField