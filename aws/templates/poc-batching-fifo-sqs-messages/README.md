# Batching FIFO SQS messages Proof Of Concept

## Objective

POC was performed to demonstrate that, if more than 300 messages are sent in less than a second to an SQS FIFO queue it will throttle and not receive some of these messages. In addition, prove that, with the implementation of batching in FIFO queues, this error does not happen anymore, being possible to send up to 3000 messages per second without the throttle happening.

## To run the POC

To run this POC it will be necessary that you create a FIFO queue in AWS (default settings are sufficient). In addition, run the `npm install` in the this repository, config your credentials on "credentials.js" file and fill the necessary parameters in the "parameters.js" file. The next step will be to run the "runFile6Times.js", we will do that 2 times. When running the runFile6Times.js it will trigger 6 processes, where each one will start sending 500 messages to the queue in question. Soon, at the end of this script, we will have worked with a volume of 3000 messages sent to the queue (500 messages per run x 6 runs).

### For the first run

First, we will configure the "filePathToRun" property in the parameters.json to point to the "forceFIFOQueueThrottle.js" file path in this repository, in your machine. With that, run the runFile6Times.js. After running the file, you will notice in the console output that there will be one or more "Request is throttled" errors, which means that the throttle happens. You will also notice that not all the 3000 messages sent to the queue made it to the queue, precisely because of the throttle.

The "Request is throttled" error will look like this:

### For the second run

Second, run configure the "filePathToRun" property in the parameters.json to point to the "sendBatchMessagesToFIFOQueue.js" file path in this repository, in your machine. With that, run the runFile6Times.js. After running the file, you will notice that in the console output that there will be no errors and all the 3000 messages in question will be sent to the queue perfectly, without any throttle happening.

# Conclusion

In conclusion, given the same volume of 3000 messages per second, in the 1st run, we implemented a solution without batching and we were able to see the result, where several throttles happened, resulting in failures in the delivery of some messages to our queue, what, in a scenario of a real application would be quite a problem. But when we implement batching the problem is solved, and all the messages are sent to the queue perfectly, without any errors happening.

~You can adapt the number of iterations that the "runFile6Times.js" file does or change the number of messages that each of the "forceFIFOQueueThrottle.js" and "sendBatchMessagesToFIFOQueue.js" scripts sends to the queue for greater test versatility if you want.
