import { counter, gauge, histogram, register } from "./metrics"

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
// # HELP metric_name metric_help
// # TYPE metric_name counter
// metric_name{code="200"} 1

// # HELP hist_metric_name hist_metric_help
// # TYPE hist_metric_name histogram
// hist_metric_name_bucket{le="0.1"} 1
// hist_metric_name_bucket{le="5"} 1
// hist_metric_name_bucket{le="15"} 1
// hist_metric_name_bucket{le="50"} 1
// hist_metric_name_bucket{le="100"} 1
// hist_metric_name_bucket{le="500"} 1
// hist_metric_name_bucket{le="+Inf"} 1
// hist_metric_name_sum 0.00024175
// hist_metric_name_count 1

// # HELP gauge_metric_name metric_help
// # TYPE gauge_metric_name gauge
// gauge_metric_name 10
app.get('/metrics', async (req, res) => {
    try {
        const metrics = await register.metrics()

        console.log(metrics)
        res.set('Content-Type', register.contentType);
        res.end(metrics);
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})