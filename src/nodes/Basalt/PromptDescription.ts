import type { INodeProperties } from 'n8n-workflow'

export const promptOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['prompt'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a prompt by slug',
				action: 'Get a prompt',
				routing: {
					request: {
						method: 'GET',
						url: '=/prompts/{{$parameter.slug}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all prompts in the workspace',
				action: 'List prompts',
				routing: {
					request: {
						method: 'GET',
						url: '/prompts',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'prompts',
								},
							},
						],
					},
				},
			},
			{
				name: 'Describe',
				value: 'describe',
				description: 'Describe a prompt by slug',
				action: 'Describe a prompt',
				routing: {
					request: {
						method: 'GET',
						url: '=/prompts/{{$parameter.slug}}/describe',
					},
				},
			},
			{
				name: 'Publish',
				value: 'publish',
				description: 'Publish a prompt version with a tag',
				action: 'Publish a prompt',
				routing: {
					request: {
						method: 'POST',
						url: '=/prompts/{{$parameter.slug}}/publish',
					},
				},
			},
		],
		default: 'list',
	},
]

export const promptFields: INodeProperties[] = [
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['prompt'],
				operation: ['get', 'describe', 'publish'],
			},
		},
		default: '',
		description: 'The slug of the prompt',
	},
	{
		displayName: 'New Tag',
		name: 'newTag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['prompt'],
				operation: ['publish'],
			},
		},
		default: '',
		description: 'The new tag to assign to the prompt version',
		routing: {
			send: {
				type: 'body',
				property: 'newTag',
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['prompt'],
				operation: ['get', 'describe'],
			},
		},
		options: [
			{
				displayName: 'Version',
				name: 'version',
				type: 'string',
				default: '',
				description: 'The version to filter prompts by',
				routing: {
					send: {
						type: 'query',
						property: 'version',
					},
				},
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'The tag to filter prompts by',
				routing: {
					send: {
						type: 'query',
						property: 'tag',
					},
				},
			},
		],
	},
	{
		displayName: 'Publish Options',
		name: 'publishOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['prompt'],
				operation: ['publish'],
			},
		},
		options: [
			{
				displayName: 'Version',
				name: 'version',
				type: 'string',
				default: '',
				description: 'The version number of the prompt to publish',
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
				description: 'The tag of the prompt version to publish',
				routing: {
					send: {
						type: 'body',
						property: 'tag',
					},
				},
			},
		],
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['prompt'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Feature Slug',
				name: 'featureSlug',
				type: 'string',
				default: '',
				description: 'The feature slug to filter prompts by',
				routing: {
					send: {
						type: 'query',
						property: 'featureSlug',
					},
				},
			},
		],
	},
]
