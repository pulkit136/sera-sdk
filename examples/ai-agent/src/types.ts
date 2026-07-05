export type AgentIntent =
  | { type: 'pay'; params: { recipient: string; amount: string; asset: string } }
  | { type: 'get_balances'; params: { address?: string } }
  | { type: 'get_quote'; params: { from: string; to: string; amount: string } }
  | { type: 'unknown'; params: { query: string } };

export interface AgentResult {
  success: boolean;
  message: string;
  data?: any;
}
