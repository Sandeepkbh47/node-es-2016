import { parentPort } from 'worker_threads'


parentPort.on('message', (message) => {
    let big = bigComputing(message.task)
    parentPort.postMessage(big)
})


function bigComputing(task) {
    let i = 0;
    for (i = 0; i < task; i++) { }
    return i
}