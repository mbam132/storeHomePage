import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_REQUEST_URL } from '../utils/constants';

const client = new GraphQLClient(GRAPHQL_REQUEST_URL);

export default client;
