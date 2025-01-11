const express = require('express');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 4000; 

var time = [24,15,27,60];

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

setInterval(() => {
    if (time[3] > 0) {
        time[3] -= 1;
    } else {
        if (time[2] > 0) {
            time[2] -= 1;
            time[3] = 60;
            return;
        } else {
            if (time[1] > 0) {
                time[1] -= 1;
                time[2] = 60;
                return;
            } else {
                if (time[0] > 0) {
                    time[0] -= 1;
                    time[1] = 60;
                    return;
                }
            }
        }
    }
}, 1000);


app.get('/time', (req, res) => {
    res.send(time);
});


app.post('/time', (req, res) => {
    const { days, hours, minutes, seconds } = req.body;

    time[0] = parseInt(days) || time[0]; 
    time[1] = parseInt(hours) || time[1];
    time[2] = parseInt(minutes) || time[2];
    time[3] = parseInt(seconds) || time[3];

    res.send(`Updated time: ${time}`);
});

// بدء الخادم
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
