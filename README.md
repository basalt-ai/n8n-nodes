# Basalt n8n nodes

n8n community node for the Basalt API - Manage prompts, monitoring, and datasets through n8n workflows.

## Features

This n8n node allows you to:

### Prompts
- **Get** - Retrieve a specific prompt by slug
- **Get Many** - List all prompts in your workspace
- **Describe** - Get detailed information about a prompt including its variables
- **Publish** - Publish a prompt version with a specific tag

### Monitoring
- **Create Experiment** - Create a new experiment for testing prompt variations
- **Log Output** - Monitor individual prompt outputs with detailed metrics

### Datasets
- **Get** - Retrieve a specific dataset by slug
- **Get Many** - List all datasets in your workspace
- **Create Item** - Add a new row to a dataset

## Installation

### Community Nodes (n8n Cloud & Desktop)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@basalt-ai/n8n-nodes-basalt` in the **Enter npm package name** field
4. Agree to the risks and click **Install**

### Manual Installation (Self-Hosted)

Navigate to your n8n root directory and run:

```bash
npm install @basalt-ai/n8n-nodes-basalt
```

Then restart your n8n instance.

## Credentials

To use this node, you'll need:

1. **API Key**: Your Basalt API key (available in your Basalt dashboard)
2. **API URL**: The base URL for the Basalt API (defaults to `https://api.getbasalt.ai`)

### Setting up Credentials

1. In n8n, go to **Credentials** and click **Add credential**
2. Search for **Basalt API**
3. Enter your API key and API URL
4. Save the credential

## Usage Examples

### Example 1: Get a Prompt and Use it in a Workflow

```
1. Basalt Node (Get Prompt)
   - Resource: Prompt
   - Operation: Get
   - Slug: my-prompt-slug
   - Version: 1.0.0

2. HTTP Request Node
   - Use the prompt text from previous step
   - Make API call with the prompt configuration
```

### Example 2: Log Prompt Outputs for Monitoring

```
1. Your LLM Node
   - Execute your AI workflow

2. Basalt Node (Log Output)
   - Resource: Monitoring
   - Operation: Log Output
   - Prompt Slug: {{ $json.promptSlug }}
   - Output: {{ $json.llmResponse }}
   - Input Tokens: {{ $json.usage.inputTokens }}
   - Output Tokens: {{ $json.usage.outputTokens }}
```

### Example 3: Create Experiment

```
1. Basalt Node (Create Experiment)
   - Resource: Monitoring
   - Operation: Create Experiment
   - Feature Slug: my-feature
   - Name: A/B Test - Version 1.0 vs 2.0
```

### Example 4: Add Items to a Dataset

```
1. Webhook Trigger
   - Receives new data

2. Basalt Node (Create Dataset Item)
   - Resource: Dataset
   - Operation: Create Item
   - Slug: training-data
   - Values: { "input": "...", "output": "..." }
   - Ideal Output: "Expected response"
```

## API Operations

All operations support the full Basalt API specification. For detailed API documentation, visit [https://docs.getbasalt.ai](https://docs.getbasalt.ai)

## Resources

- [Basalt Documentation](https://docs.getbasalt.ai)
- [Basalt API Reference](https://api.getbasalt.ai)
- [n8n Community](https://community.n8n.io)

## Development

### Building the Node

```bash
npm run build
```

### Testing Locally

1. Build the node:
   ```bash
   npm run build
   ```

2. Link the package:
   ```bash
   npm link
   ```

3. Link to your n8n installation:
   ```bash
   cd ~/.n8n/nodes
   npm link @basalt-ai/n8n-nodes-basalt
   ```

4. Restart n8n

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [basalt-ai/basalt](https://github.com/basalt-ai/basalt/issues)
- Email: support@getbasalt.ai