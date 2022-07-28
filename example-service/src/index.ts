import { counter, gauge, histogram, writeMetrics } from "./metrics"

const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    const end = histogram.startTimer();
    counter.inc({ code: 200 })
    gauge.set(10)

    end()
    res.send('This is a test')
})

// Example response:
// # HELP counter_metric_name counter_metric_help
// # TYPE counter_metric_name counter
// counter_metric_name{code="200"} 2
//
// # HELP hist_metric_name hist_metric_help
// # TYPE hist_metric_name histogram
// hist_metric_name_bucket{le="0.1"} 2
// hist_metric_name_bucket{le="5"} 2
// hist_metric_name_bucket{le="15"} 2
// hist_metric_name_bucket{le="50"} 2
// hist_metric_name_bucket{le="100"} 2
// hist_metric_name_bucket{le="500"} 2
// hist_metric_name_bucket{le="+Inf"} 2
// hist_metric_name_sum 0.000293875
// hist_metric_name_count 2
//
// # HELP gauge_metric_name metric_help
// # TYPE gauge_metric_name gauge
// gauge_metric_name 10
app.get('/metrics', async (req, res) => {
    try {
        writeMetrics(res);
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})