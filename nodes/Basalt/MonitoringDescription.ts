/* eslint-disable n8n-nodes-base/node-param-collection-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow'

export const monitoringOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
			},
		},
		options: [
			{
				name: 'Create Experiment',
				value: 'createExperiment',
				description: 'Create a new experiment',
				action: 'Create an experiment',
				routing: {
					request: {
						method: 'POST',
						url: '/monitor/experiments',
					},
				},
			},
			{
				name: 'Log Output',
				value: 'log',
				description: 'Monitor a prompt output',
				action: 'Log prompt output',
				routing: {
					request: {
						method: 'POST',
						url: '/monitor/log',
					},
				},
			},
		],
		default: 'log',
	},
]

export const monitoringFields: INodeProperties[] = [
	// Create Experiment fields
	{
		displayName: 'Feature Slug',
		name: 'featureSlug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['createExperiment'],
			},
		},
		default: '',
		description: 'The slug of the feature to create an experiment on',
		routing: {
			send: {
				type: 'body',
				property: 'featureSlug',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'experimentName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['createExperiment'],
			},
		},
		default: '',
		description: 'The name of the experiment',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	// Log Output fields
	{
		displayName: 'Prompt Slug',
		name: 'slug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['log'],
			},
		},
		default: '',
		description: 'The slug of the prompt',
		routing: {
			send: {
				type: 'body',
				property: 'slug',
			},
		},
	},
	{
		displayName: 'Output',
		name: 'output',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['log'],
			},
		},
		default: '',
		description: 'The output of the prompt',
		routing: {
			send: {
				type: 'body',
				property: 'output',
			},
		},
	},
	{
		displayName: 'Log Options',
		name: 'logOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['log'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the trace',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Version',
				name: 'version',
				type: 'string',
				default: '',
				description: 'The version of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'version',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'The tag of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'tag',
					},
				},
			},
			{
				displayName: 'Input',
				name: 'input',
				type: 'json',
				default: '',
				description: 'The input of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'input',
					},
				},
			},
			{
				displayName: 'Ideal Output',
				name: 'idealOutput',
				type: 'json',
				default: '',
				description: 'The ideal output of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'idealOutput',
					},
				},
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'string',
				default: '',
				description: 'The start time of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'startTime',
					},
				},
			},
			{
				displayName: 'End Time',
				name: 'endTime',
				type: 'string',
				default: '',
				description: 'The end time of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'endTime',
					},
				},
			},
			{
				displayName: 'Input Tokens',
				name: 'inputTokens',
				type: 'number',
				default: 0,
				description: 'The number of input tokens',
				routing: {
					send: {
						type: 'body',
						property: 'inputTokens',
					},
				},
			},
			{
				displayName: 'Output Tokens',
				name: 'outputTokens',
				type: 'number',
				default: 0,
				description: 'The number of output tokens',
				routing: {
					send: {
						type: 'body',
						property: 'outputTokens',
					},
				},
			},
			{
				displayName: 'Cost',
				name: 'cost',
				type: 'number',
				default: 0,
				description: 'The cost of the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'cost',
					},
				},
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '',
				description: 'Additional metadata to be associated with the prompt',
				routing: {
					send: {
						type: 'body',
						property: 'metadata',
					},
				},
			},
		],
	},
]
