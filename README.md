# Postman To Google Sheets API
App Script flow for POST requests made via Postman and sent to a Google Sheet

### Flow
- local javascript is pushed to Apps Script via `clasp push`
- run new Delopyment of App Script, generating Web App link
- use the generated link to make POST request within Postman
- once POST request is made, global variables stored in Postman get sent to Google Sheet

![postman](https://teachingmachine.tv/_files/postman/postman.png)
![postman2](https://teachingmachine.tv/_files/postman/postman-2.png)

### Areas to Improve
- script execution is successful, but only writes single rows at a time.
- needs a method to write nested properties to a range of rows in the table 

```
"follower_region_percent": {
        "status": 0,
        "value": [
            {
                "key": "US",
                "value": 0.8418827737582311
            },
            {
                "key": "MX",
                "value": 0.02349402487602634
            },
            {
                "key": "RU",
                "value": 0.009267539224453296
            },
            {
                "key": "GB",
                "value": 0.008535891390943826
            },
            {
                "key": "BR",
                "value": 0.0070725957239248845
            }
        ]
    }
```
Desired formatting for the example above would be something like
```
+-----------------+--------------+--+--+--+
| Top Territories | Distribution |  |  |  |
+=================+==============+==+==+==+
| US              | 0.84         |  |  |  |
+-----------------+--------------+--+--+--+
| MX              | 0.023        |  |  |  |
+-----------------+--------------+--+--+--+
| RU              | 0.009        |  |  |  |
+-----------------+--------------+--+--+--+
```
