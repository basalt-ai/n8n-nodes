import type { INodeType, INodeTypeDescription } from 'n8n-workflow'

import { datasetFields, datasetOperations } from './DatasetDescription'
import { monitoringFields, monitoringOperations } from './MonitoringDescription'
import { promptFields, promptOperations } from './PromptDescription'

export class Basalt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Basalt',
		name: 'basalt',
		icon: 'file:basalt.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Basalt API to manage prompts, monitoring, and datasets',
		defaults: {
			name: 'Basalt',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'basaltApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.apiUrl}}',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prompt',
						value: 'prompt',
					},
					{
						name: 'Monitoring',
						value: 'monitoring',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
				],
				default: 'prompt',
			},
			...promptOperations,
			...promptFields,
			...monitoringOperations,
			...monitoringFields,
			...datasetOperations,
			...datasetFields,
		],
	}
}
