const client = require('prom-client');
const register = client.register
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics({ register, prefix: "test_" })

export const counter = new client.Counter({
    name: 'counter_metric_name',
    help: 'counter_metric_help',
    labelNames: ['code'],
});

export const histogram = new client.Histogram({
    name: 'hist_metric_name',
    help: 'hist_metric_help',
    buckets: [0.1, 5, 15, 50, 100, 500],
});

export const gauge = new client.Gauge({
    name: 'gauge_metric_name',
    help: 'metric_help'
});

export const writeMetrics = async (res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
}
