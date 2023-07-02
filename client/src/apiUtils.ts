import { TaskType } from './types';
import cdkOutputs from './../cdk/cdk-outputs.json';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
function getApiKeyFromCDKOutputs() {
    return cdkOutputs.TodoDemoApp.ApiKey;
}

function getEndpointFromCDKOutputs() {
    return cdkOutputs.TodoDemoApp.ApiEndpoint;
}

async function fetchTasks(): Promise<TaskType[]> {
    try {
        const httpLink = createHttpLink({
            uri: getEndpointFromCDKOutputs(),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': getApiKeyFromCDKOutputs(),
            },
        });

        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });

        const query = gql`
        query GetTasks {
          getTasks {
            id
            title
            status
          }
        }
      `;

        const response = await client.query({
            query,
        });

        if (response && response.data && response.data.getTasks) {
            return response.data.getTasks;
        } else {
            console.error('Failed to fetch tasks:', response.errors);
            return [];
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

async function addTask(title: string, status: boolean): Promise<TaskType> {
    try {
        const httpLink = createHttpLink({
            uri: getEndpointFromCDKOutputs(),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': getApiKeyFromCDKOutputs(),
            },
        });

        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });

        const mutation = gql`
    mutation AddTask($title: String!, $status: Boolean!) {
      addTask(title: $title, status: $status) {
        id
        title
        status
      }
    }
  `;

        const variables = {
            title,
            status,
        };

        const response = await client.mutate({
            mutation,
            variables,
        });

        if (response && response.data && response.data.addTask) {
            return response.data.addTask;
        } else {
            console.error('Failed to add task:', response.errors);
            throw new Error('Failed to add task');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        throw new Error('Error adding task');
    }
}

async function updateTaskStatus(id: string, status: boolean): Promise<TaskType> {
    try {
        const httpLink = createHttpLink({
            uri: getEndpointFromCDKOutputs(),
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': getApiKeyFromCDKOutputs(),
            },
        });

        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });

        const mutation = gql`
        mutation UpdateTaskStatus($id: ID!, $status: Boolean!) {
          updateTaskStatus(id: $id, status: $status) {
            id
            title
            status
          }
        }
      `;

        const variables = {
            id,
            status,
        };

        const response = await client.mutate({
            mutation,
            variables,
        });

        if (response && response.data && response.data.updateTaskStatus) {
            return response.data.updateTaskStatus;
        } else {
            console.error('Failed to update task status:', response.errors);
            throw new Error('Failed to update task status');
        }
    } catch (error) {
        console.error('Error updating task status:', error);
        throw new Error('Error updating task status');
    }
}

async function deleteTask(id: string): Promise<void> {
    try {
      const httpLink = createHttpLink({
        uri: getEndpointFromCDKOutputs(),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': getApiKeyFromCDKOutputs(),
        },
      });
  
      const client = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
      });
  
      const mutation = gql`
        mutation DeleteTask($id: ID!) {
          deleteTask(id: $id)
        }
      `;
  
      const variables = {
        id,
      };
  
      const response = await client.mutate({
        mutation,
        variables,
      });
  
      if (response && response.data && response.data.deleteTask) {
        // Task successfully deleted
      } else {
        console.error('Failed to delete task:', response.errors);
        throw new Error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Error deleting task');
    }
  }

export { fetchTasks, updateTaskStatus, addTask, deleteTask };
