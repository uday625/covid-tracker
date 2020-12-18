import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({title,cases,total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textPrimary">{title}</Typography>
                <h2 className="infoBoxx__cases">{cases}</h2>
                <Typography className="infoBox__total" color="textPrimary"> Total {total} </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
