import type { INodeProperties } from 'n8n-workflow'

export const datasetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a dataset by slug',
				action: 'Get a dataset',
				routing: {
					request: {
						method: 'GET',
						url: '=/datasets/{{$parameter.slug}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all datasets in the workspace',
				action: 'List datasets',
				routing: {
					request: {
						method: 'GET',
						url: '/datasets',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'datasets',
								},
							},
						],
					},
				},
			},
			{
				name: 'Create Item',
				value: 'createItem',
				description: 'Create a new item in a dataset',
				action: 'Create dataset item',
				routing: {
					request: {
						method: 'POST',
						url: '=/datasets/{{$parameter.slug}}/items',
					},
				},
			},
		],
		default: 'list',
	},
]

export const datasetFields: INodeProperties[] = [
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['get', 'createItem'],
			},
		},
		default: '',
		description: 'The slug of the dataset',
	},
	{
		displayName: 'Values',
		name: 'values',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createItem'],
			},
		},
		default: '{}',
		description: 'The values for each column in this dataset row (as JSON object)',
		routing: {
			send: {
				type: 'body',
				property: 'values',
			},
		},
	},
	{
		displayName: 'Item Options',
		name: 'itemOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createItem'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name of the dataset row',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},
			{
				displayName: 'Ideal Output',
				name: 'idealOutput',
				type: 'string',
				default: '',
				description: 'The ideal output for this dataset row',
				routing: {
					send: {
						type: 'body',
						property: 'idealOutput',
					},
				},
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata for this dataset row',
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
