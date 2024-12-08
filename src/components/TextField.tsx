import * as React from 'react';
import TextField from '@mui/material/TextField';

interface TextFieldCustomProps<T extends string | number> {
    label: string;
    value: T;
    type: string;
    shrink: boolean; 
    style: any;
    onChange: (value: T) => void;
}

export default function TextFieldCustom<T extends string | number>(props: TextFieldCustomProps<T>) {
    const hasValue = props.value !== '' && props.value !== null && props.value !== undefined;

    return (
        <TextField sx={{ width: '300px', marginTop: '25px', height: '45px' }}
            id="outlined-controlled"
            label={props.label}
            value={props.value}
            type={props.type}
            style={props.style}
            InputLabelProps={{
                shrink: hasValue, // Use hasValue to determine whether the label should shrink
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange(event.target.value as T);
            }}
        />
    );
}
