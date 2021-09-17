# Postman To Google Sheets API
App Script flow for POST requests made via Postman and sent to a Google Sheet

### Flow
- local javascript is pushed to Apps Script via `clasp push`
- run new Deployment of Apps Script, generating a new Web App link (Anyone).
- use the generated link to call POST request in Postman
- once POST request is made, create/store Postman environment variables and send to Google Sheet

![postman](https://teachingmachine.tv/_files/postman/postman-1.png)
![postman2](https://teachingmachine.tv/_files/postman/postman-2.png)

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

```
// Regions Table
  const regionsArray = bodyJSON.follower_region_percent.value.map(items => [
    new Date().toLocaleString().split(',')[0],
    items.key,
    (items.value * 100).toFixed(5) + '%'
    ]);
  const lastRowTopTerritoriesSheet = topTerritoriesSheet.getLastRow();
  topTerritoriesSheet.getRange(lastRowTopTerritoriesSheet + 1, 1, 5, 3).setValues(regionsArray);
```

Achieves the desired formatting and writes range to sheet:
```
+------------+-----------------+--------------+--+--+--+
| Date       | Top Territories | Distribution |  |  |  |
+============+=================+==============+==+==+==+
| 2021-09-17 | US              | 0.84         |  |  |  |
+------------+-----------------+--------------+--+--+--+
| 2021-09-17 | MX              | 0.023        |  |  |  |
+------------+-----------------+--------------+--+--+--+
| 2021-09-17 | RU              | 0.009        |  |  |  |
+------------+-----------------+--------------+--+--+--+
```
