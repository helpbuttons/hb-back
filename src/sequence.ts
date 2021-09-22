import { MiddlewareSequence } from '@loopback/rest';

// import { config, inject } from "@loopback/core";
// import { InvokeMiddleware, InvokeMiddlewareOptions, RequestContext, SequenceActions, SequenceHandler } from "@loopback/rest";

// /**
//  * A sequence implementation using middleware chains
//  */
//  export class MiddlewareSequence implements SequenceHandler {
//   static defaultOptions: InvokeMiddlewareOptions = {
//     chain: 'middlewareChain.rest',
//     orderedGroups: [
//       // Please note that middleware is cascading. The `sendResponse` is
//       // added first to invoke downstream middleware to get the result or
//       // catch errors so that it can produce the http response.
//       'sendResponse',

//       // default
//       'cors',
//       'apiSpec',

//       // default
//       'middleware',

//       // rest
//       'findRoute',

//       // authentication
//       'authentication',

//       // rest
//       'parseParams',
//       'invokeMethod',
//     ],
//   };

//   /**
//    * Constructor: Injects `InvokeMiddleware` and `InvokeMiddlewareOptions`
//    *
//    * @param invokeMiddleware - invoker for registered middleware in a chain.
//    * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
//    */
//   constructor(
//     @inject(SequenceActions.INVOKE_MIDDLEWARE)
//     readonly invokeMiddleware: InvokeMiddleware,
//     @config()
//     readonly options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
//   ) {}

//   /**
//    * Runs the default sequence. Given a handler context (request and response),
//    * running the sequence will produce a response or an error.
//    *
//    * @param context - The request context: HTTP request and response objects,
//    * per-request IoC container and more.
//    */
//   async handle(context: RequestContext): Promise<void> {
//     return;
//     // console.log(context);
//     // debug(
//     //   'Invoking middleware chain %s with groups %s',
//     //   this.options.chain,
//     //   this.options.orderedGroups,
//     // );
//     // await this.invokeMiddleware(context, this.options);
//   }
// }


export class MySequence extends MiddlewareSequence { 
    
}

