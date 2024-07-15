import formidable from 'formidable';
import { Worker } from 'worker_threads';

export const getData = async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: [{
                id: 1, name: "UserA", description: "Amazing looks"
            }, {
                id: 2, name: "UserB", description: "Amazing ***"
            }]
        }
    })
}

export const fileData = async (req, res, next) => {
    const form = formidable({ multiples: true });
    form.uploadDir = './uploads';
    form.on('fileBegin', function (name, file) {
        //rename the incoming file to the file's name
        file.filepath = form.uploadDir + "/" + file.originalFilename;
    })
    form.on('end', function () {
        res.status(200).json({
            status: 'success',
        })
    });

    form.parse(req)

}

export const bigComputing = async (req, res, next) => {
    let task = req.body.task
    const worker = new Worker(`${req.app.get("__dirname")}heavy_workers/bigComputing.js`);

    worker.on('message', (message) => {
        res.status(200).json({
            status: "success",
            message
        })
    })
    worker.on('error', err => {
        console.log(err);
        res.status(400).json({
            status: "error",
            message: err.message
        })
    })

    worker.postMessage({ task })
}