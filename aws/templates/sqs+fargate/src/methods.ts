import Work from './business/work'
import Receiver from './services/receiver'
import env from './constants/env'
import { ISqs } from './interfaces/ISqs';

export const fn_fargate = async () => {
    const work = new Work()
    const receiver = new Receiver(env.SQSUrl, work.processor.bind(work))
    const params: ISqs.ReceiveMessage = {
        VisibilityTimeout: 30
    }
    const sleep_time = 7200;

    await receiver.continuosReceiveAndProcessing({ params, sleep_time })
}
