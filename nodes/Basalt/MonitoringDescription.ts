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
				name: 'Log Trace',
				value: 'logTrace',
				description: 'Create a trace to monitor a full execution',
				action: 'Log trace',
				routing: {
					request: {
						method: 'POST',
						url: '/monitor/trace',
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
	// Create Trace fields
	{
		displayName: 'Feature Slug',
		name: 'traceFeatureSlug',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['logTrace'],
			},
		},
		default: '',
		description: 'The slug of the feature in Basalt',
		routing: {
			send: {
				type: 'body',
				property: 'featureSlug',
			},
		},
	},
	{
		displayName: 'Trace Options',
		name: 'traceOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['logTrace'],
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
				displayName: 'Input',
				name: 'input',
				type: 'json',
				default: '',
				description: 'The input of the trace (can be string, object, array, or null)',
				routing: {
					send: {
						type: 'body',
						property: 'input',
					},
				},
			},
			{
				displayName: 'Output',
				name: 'output',
				type: 'json',
				default: '',
				description: 'The output of the trace (can be string, object, array, or null)',
				routing: {
					send: {
						type: 'body',
						property: 'output',
					},
				},
			},
			{
				displayName: 'Ideal Output',
				name: 'idealOutput',
				type: 'json',
				default: '',
				description: 'The ideal output of the trace. Used in some evaluators. (can be string, object, array, or null)',
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
				default: '',
				description: 'Additional metadata to be associated with the trace (e.g., sessionId, userType)',
				routing: {
					send: {
						type: 'body',
						property: 'metadata',
					},
				},
			},
			{
				displayName: 'Start Time',
				name: 'startTime',
				type: 'string',
				default: '',
				description: 'The start time of the trace (ISO 8601 string or Unix timestamp integer)',
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
				description: 'The end time of the trace (ISO 8601 string or Unix timestamp integer)',
				routing: {
					send: {
						type: 'body',
						property: 'endTime',
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'fixedCollection',
				default: {},
				description: 'The user related to the trace',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'userValues',
						displayName: 'User',
						values: [
							{
								displayName: 'User ID',
								name: 'id',
								type: 'string',
								required: true,
								default: '',
								description: 'A unique identifier for the user',
							},
							{
								displayName: 'User Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'The name of the user',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'user',
						value: '={{$value.userValues}}',
					},
				},
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'fixedCollection',
				default: {},
				description: 'The organization related to the trace',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'organizationValues',
						displayName: 'Organization',
						values: [
							{
								displayName: 'Organization ID',
								name: 'id',
								type: 'string',
								required: true,
								default: '',
								description: 'A unique identifier for the organization',
							},
							{
								displayName: 'Organization Name',
								name: 'name',
								type: 'string',
								required: true,
								default: '',
								description: 'The name of the organization',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'organization',
						value: '={{$value.organizationValues}}',
					},
				},
			},
			{
				displayName: 'Experiment',
				name: 'experiment',
				type: 'fixedCollection',
				default: {},
				description: 'The experiment to append the trace to',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'experimentValues',
						displayName: 'Experiment',
						values: [
							{
								displayName: 'Experiment ID',
								name: 'id',
								type: 'string',
								default: '',
								description: 'The ID of the experiment',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'experiment',
						value: '={{$value.experimentValues}}',
					},
				},
			},
			{
				displayName: 'Evaluators',
				name: 'evaluators',
				type: 'fixedCollection',
				default: {},
				description: 'The evaluators used to evaluate the trace',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'evaluatorValues',
						displayName: 'Evaluator',
						values: [
							{
								displayName: 'Evaluator Slug',
								name: 'slug',
								type: 'string',
								default: '',
								description: 'The slug of the evaluator in Basalt (e.g., hallucination)',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'evaluators',
						value: '={{$value.evaluatorValues}}',
					},
				},
			},
			{
				displayName: 'Evaluation Config',
				name: 'evaluationConfig',
				type: 'fixedCollection',
				default: {},
				description: 'The evaluation configuration of the trace',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'evaluationConfigValues',
						displayName: 'Evaluation Config',
						values: [
							{
								displayName: 'Sample Rate',
								name: 'sampleRate',
								type: 'number',
								default: 1,
								description: 'The sample rate of the trace (0-1)',
								typeOptions: {
									minValue: 0,
									maxValue: 1,
									numberPrecision: 2,
								},
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'evaluationConfig',
						value: '={{$value.evaluationConfigValues}}',
					},
				},
			},
		],
	},
	// Logs fields for Log Trace
	{
		displayName: 'Logs',
		name: 'logs',
		type: 'fixedCollection',
		default: {},
		description: 'The logs to append to the trace',
		displayOptions: {
			show: {
				resource: ['monitoring'],
				operation: ['logTrace'],
			},
		},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'logValues',
				displayName: 'Log',
				values: [
					{
						displayName: 'Log ID',
						name: 'id',
						type: 'string',
						required: true,
						default: '',
						description: 'A unique identifier for the log',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						required: true,
						default: 'span',
						description: 'The type of log',
						options: [
							{
								name: 'Event',
								value: 'event',
							},
							{
								name: 'Function',
								value: 'function',
							},
							{
								name: 'Generation',
								value: 'generation',
							},
							{
								name: 'Retrieval',
								value: 'retrieval',
							},
							{
								name: 'Span',
								value: 'span',
							},
							{
								name: 'Tool',
								value: 'tool',
							},
						],
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						description: 'The name of the log',
					},
					{
						displayName: 'Log Options',
						name: 'logOptions',
						type: 'collection',
						placeholder: 'Add Option',
						default: {},
						description: 'Optional log parameters',
						options: [
							{
								displayName: 'Cost',
								name: 'cost',
								type: 'number',
								default: 0,
								description: 'The cost of the log (only for generation type)',
							},
							{
								displayName: 'End Time',
								name: 'endTime',
								type: 'json',
								default: '',
								description: 'The end time of the log (ISO 8601 string or Unix timestamp integer)',
							},
							{
								displayName: 'Evaluators',
								name: 'evaluators',
								type: 'fixedCollection',
								default: {},
								description: 'The evaluators used to evaluate the log',
								typeOptions: {
									multipleValues: true,
								},
								options: [
									{
										name: 'evaluatorValues',
										displayName: 'Evaluator',
										values: [
											{
												displayName: 'Evaluator Slug',
												name: 'slug',
												type: 'string',
												required: true,
												default: '',
												description: 'The slug of the evaluator in Basalt (e.g., hallucination)',
											},
										],
									},
								],
							},
							{
								displayName: 'Ideal Output',
								name: 'idealOutput',
								type: 'json',
								default: '',
								description: 'The ideal output of the log. Used in some evaluators. (can be string, object, array, or null)',
							},
							{
								displayName: 'Input',
								name: 'input',
								type: 'json',
								default: '',
								description: 'The input of the log (can be string, object, array, or null)',
							},
							{
								displayName: 'Input Tokens',
								name: 'inputTokens',
								type: 'number',
								default: 0,
								description: 'The number of input tokens (only for generation type). If not provided, it will be computed based on the input.',
							},
							{
								displayName: 'Metadata',
								name: 'metadata',
								type: 'json',
								default: '',
								description: 'The metadata of the log (object or null)',
							},
							{
								displayName: 'Output',
								name: 'output',
								type: 'json',
								default: '',
								description: 'The output of the log (can be string, object, array, or null)',
							},
							{
								displayName: 'Output Tokens',
								name: 'outputTokens',
								type: 'number',
								default: 0,
								description: 'The number of output tokens (only for generation type). If not provided, it will be computed based on the output.',
							},
							{
								displayName: 'Parent ID',
								name: 'parentId',
								type: 'string',
								default: '',
								description: 'The parent ID of the log. Used to nest logs in a hierarchical structure.',
							},
							{
								displayName: 'Prompt',
								name: 'prompt',
								type: 'fixedCollection',
								default: {},
								description: 'The prompt related to the log (only for generation type)',
								typeOptions: {
									multipleValues: false,
								},
								options: [
									{
										name: 'promptValues',
										displayName: 'Prompt',
										values: [
											{
												displayName: 'Prompt Slug',
												name: 'slug',
												type: 'string',
												required: true,
												default: '',
												description: 'The slug of the prompt',
											},
											{
												displayName: 'Version',
												name: 'version',
												type: 'string',
												default: '',
												description: 'The version of the prompt',
											},
											{
												displayName: 'Tag',
												name: 'tag',
												type: 'string',
												default: '',
												description: 'The tag of the prompt',
											},
										],
									},
								],
							},
							{
								displayName: 'Start Time',
								name: 'startTime',
								type: 'json',
								default: '',
								description: 'The start time of the log (ISO 8601 string or Unix timestamp integer)',
							},
							{
								displayName: 'Variables',
								name: 'variables',
								type: 'fixedCollection',
								default: {},
								description: 'Variables used in the log (only for generation type)',
								typeOptions: {
									multipleValues: true,
								},
								options: [
									{
										name: 'variableValues',
										displayName: 'Variable',
										values: [
											{
												displayName: 'Label',
												name: 'label',
												type: 'string',
												required: true,
												default: '',
												description: 'The label of the variable',
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												description: 'The value of the variable',
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
		routing: {
			send: {
				type: 'body',
				property: 'logs',
				value: '={{$value.logValues.map(log => ({ ...log, ...log.logOptions, logOptions: undefined })).map(log => { const {logOptions, ...rest} = log; return rest; })}}',
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
		description: 'The output of the prompt (can be string, object, or array)',
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
				description: 'The input of the prompt (can be string, object, array, or null)',
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
				description: 'The ideal output of the prompt (can be string, object, array, or null)',
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
				description: 'The start time of the prompt (ISO 8601 string or Unix timestamp integer)',
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
				description: 'The end time of the prompt (ISO 8601 string or Unix timestamp integer)',
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
				description: 'The number of input tokens. If not provided, it will be computed based on the input.',
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
				description: 'The number of output tokens. If not provided, it will be computed based on the output.',
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
				description: 'The cost of the prompt. If not provided, it will be computed based on the input and output tokens.',
				routing: {
					send: {
						type: 'body',
						property: 'cost',
					},
				},
			},
			{
				displayName: 'Variables',
				name: 'variables',
				type: 'fixedCollection',
				default: {},
				description: 'Variables used in the prompt',
				typeOptions: {
					multipleValues: true,
				},
				options: [
					{
						name: 'variableValues',
						displayName: 'Variable',
						values: [
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								required: true,
								default: '',
								description: 'The label of the variable',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'The value of the variable',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'variables',
						value: '={{$value.variableValues}}',
					},
				},
			},
			{
				displayName: 'Organization',
				name: 'organization',
				type: 'fixedCollection',
				default: {},
				description: 'The organization related to the prompt. Used to identify the organization of the user that triggered the prompt.',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'organizationValues',
						displayName: 'Organization',
						values: [
							{
								displayName: 'Organization ID',
								name: 'id',
								type: 'string',
								required: true,
								default: '',
								description: 'A unique identifier for the organization',
							},
							{
								displayName: 'Organization Name',
								name: 'name',
								type: 'string',
								required: true,
								default: '',
								description: 'The name of the organization',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'organization',
						value: '={{$value.organizationValues}}',
					},
				},
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'fixedCollection',
				default: {},
				description: 'The user related to the prompt. Used to identify the user that triggered the prompt.',
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						name: 'userValues',
						displayName: 'User',
						values: [
							{
								displayName: 'User ID',
								name: 'id',
								type: 'string',
								required: true,
								default: '',
								description: 'A unique identifier for the user',
							},
							{
								displayName: 'User Name',
								name: 'name',
								type: 'string',
								required: true,
								default: '',
								description: 'The name of the user',
							},
						],
					},
				],
				routing: {
					send: {
						type: 'body',
						property: 'user',
						value: '={{$value.userValues}}',
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
