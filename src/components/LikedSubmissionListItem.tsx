import React from 'react';
import Avatar from '@mui/material/Avatar';
import { IFormSubmission } from '../models/form-submission.model';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export interface IOwnProps {
    item: IFormSubmission;
}

export default function LikedSubmissionListItem( {item} : IOwnProps ) {
    const stringToColor = (string: string) => {
        let hash = 0;
        let i;
        
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        let color = '#';
        
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        
        return color;
    }

    const stringAvatar = (name: string) => {
        return {
            sx: {
            bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <Card
                sx={{ width: '100%'}}>
                <CardHeader
                    avatar={
                        <Avatar {...stringAvatar(`${item?.data?.firstName} ${item?.data?.lastName}`)} />
                }
                title={`${item?.data?.firstName} ${item?.data?.lastName}`}
                subheader={item?.data?.email}
            />
            </Card>
        </>
    );
}
