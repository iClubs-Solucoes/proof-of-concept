const { exec } = require("child_process");
const parameters = require('./parameters')

for (let i = 0; i < 6; i++) {
    exec(`node ${parameters.filePathToRun}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log('[ RUN ', i+1, ']')
        console.log(`stdout: ${stdout}`);
    });
}