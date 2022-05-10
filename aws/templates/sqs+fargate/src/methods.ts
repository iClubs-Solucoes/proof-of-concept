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
    const sleep_time = env.SQS_MESSAGE_VISIBILITY_TIMEOUT * 1.5;

    await receiver.continuosReceiveAndProcessing({ params, sleep_time })
}
