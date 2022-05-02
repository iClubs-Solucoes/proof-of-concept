import * as AWS from 'aws-sdk';

export const fn_fargate = async () => {
    console.log(process.env["SQSUrl"])
    while(true){
        const sqs = await getSQS();
        const message = await sqs.receiveMessage({
            QueueUrl: process.env.SQSUrl,
            MaxNumberOfMessages: 1,
        }).promise()
        if (message.Messages){
            console.log("message::", JSON.stringify(message));
            await sqs.deleteMessage({
                QueueUrl: process.env.SQSUrl,
                ReceiptHandle: message.Messages[0].ReceiptHandle
            }).promise()
        }
        await sleep(7200);
    }
}

const sleep = async (time: number) => {
    return new Promise((resolve) => {
        setTimeout(
            () => { resolve(''); },
            time
        )
    })
}

const getSQS = async () => {
    AWS.config.update({ region: 'us-east-2' });
    const sqs = new AWS.SQS({ apiVersion: '2020-04-30' });
    return sqs;
}