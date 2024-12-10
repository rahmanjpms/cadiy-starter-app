import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
//import { triggerFunction } from './lamda-function/triggerFuntion';

defineBackend({
  auth,
  data,
  //triggerFunction,
});
