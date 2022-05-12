import Work from './business/work'
import Receiver from './services/receiver'
import env from './constants/env'
import { ISqs } from './interfaces/ISqs';


export const fn_fargate = async () => {
    const work = new Work()
    const receiver = new Receiver(env.SQS_URL, work.processor.bind(work))
    const params: ISqs.ReceiveMessage = {
        VisibilityTimeout: env.SCALE_UP_COOL_DOWN
    }
    const millisecondsInSeconds = 1000;
    const increaseTimeRate = 1.5;
    const sleep_time = env.SQS_MESSAGE_VISIBILITY_TIMEOUT * millisecondsInSeconds * increaseTimeRate;

    await receiver.continuosReceiveAndProcessing({ params, sleep_time })
}


export const scan = async () => { 
    try { 
        const work = new Work();
        await work.checkDuplicate();
    } catch (err) {
        console.log(err.message)
    }
}