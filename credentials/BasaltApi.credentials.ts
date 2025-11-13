import type { IAuthenticateGeneric, Icon, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow'

export class BasaltApi implements ICredentialType {
	name = 'basaltApi'

	displayName = 'Basalt API'

	documentationUrl = 'https://docs.getbasalt.ai'

	icon: Icon = 'file:basalt.svg'

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Basalt API key (Bearer token)',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.getbasalt.ai',
			required: true,
			description: 'The base URL for the Basalt API',
		},
	]

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	}

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://api.getbasalt.ai/prompts',
		},
	}
}
